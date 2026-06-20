"use client";

import { ArrowLeft, Bell, CheckCircle, MessageSquare, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationsPage() {
  const router = useRouter();
  // const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const [notifications, setNotifications] = useState<any[]>([]);
const [page, setPage] = useState(1);
const [lastPage, setLastPage] = useState(1);
// const [loading, setLoading] = useState(false);

  const getDateLabel = (dateString?: string | null) => {
    if (!dateString) return "Today";

    const datePart = dateString.split(" ").slice(0, 1)[0]; // 16-05-2026
    const [day, month, year] = datePart.split("-");

    const date = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday)
      return `Today, ${date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}`;

    if (isYesterday) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const groupedNotifications = notifications.reduce((acc: any, item: any) => {
    const label = getDateLabel(item.sent_at || item.created_at);

    if (!acc[label]) acc[label] = [];
    acc[label].push(item);

    return acc;
  }, {});

 const fetchNotifications = async (pageNumber = 1) => {
   try {
     setLoading(true);

     const token = localStorage.getItem("token");

     const res = await axios.get(
       `https://app.tasprocompany.in/api/customers/notifications?page=${pageNumber}`,
       {
         headers: {
           Accept: "application/json",
           Authorization: `Bearer ${token}`,
         },
       },
     );

     console.log("NOTIFICATIONS:", res.data);

     if (res.data?.status) {
       setNotifications(res.data.data || []);

       setPage(res.data.pagination?.current_page || 1);
       setLastPage(res.data.pagination?.last_page || 1);
     }
   } catch (error: any) {
     console.log("NOTIFICATION ERROR:", error?.response?.data || error);

     if (error?.response?.status === 401) {
       console.log("Token expired or user not logged in");
     }
   } finally {
     setLoading(false);
   }
 };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
    if (type === "SMS") return MessageSquare;
    if (type === "Push") return CheckCircle;
    return Bell;
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <div className="relative flex items-center justify-center mb-10 dark:text-gray-300">
        <button onClick={() => router.back()} className="absolute left-0">
          <ArrowLeft className="w-7 h-7" />
        </button>

        <h1 className="text-2xl font-bold">Notification</h1>
      </div>

      <div className="space-y-8">
        {notifications.map((section: any, index: number) => (
          <div key={index}>
            <h2 className="text-lg font-bold text-gray-500 mb-4">
              {section.title}
            </h2>

            <div className="space-y-4">
              {section.data?.map((item: any) => (
                <div
                  key={item.id}
                  className="relative bg-white rounded-2xl shadow-md p-5 flex gap-5 items-center"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <Bell className="w-9 h-9" style={{ color: item.color }} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{item.title}</h3>

                    <p className="text-gray-500">{item.description}</p>

                    <p className="text-xs text-gray-400 mt-2">
                      {item.created_at}
                    </p>
                  </div>

                  {item.status !== "Read" && (
                    <span className="absolute right-5 top-8 w-3 h-3 bg-blue-600 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => fetchNotifications(page - 1)}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {page} of {lastPage}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() => fetchNotifications(page + 1)}
            className="px-4 py-2 rounded bg-orange-500 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
