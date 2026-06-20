"use client";

import { Calendar, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const amcCards = [
  {
    id: 1,
    title: "AC Repair",
    subtitle: "AMC & Packages",
    type: "Corporate",
    plan: "1 Month Plan",
    currentPrice: "₹200",
    originalPrice: "₹320",
    status: "Running",
    date: "Tue, 12-March-2024",
    avatar:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=80&h=80&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Fridge Service",
    subtitle: "AMC & Packages",
    type: "Corporate",
    plan: "3 Month Plan",
    currentPrice: "₹450",
    originalPrice: "₹600",
    status: "Running",
    date: "Fri, 22-March-2024",
    avatar:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=80&h=80&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Washing Machine",
    subtitle: "AMC & Packages",
    type: "Corporate",
    plan: "6 Month Plan",
    currentPrice: "₹750",
    originalPrice: "₹990",
    status: "Running",
    date: "Mon, 01-April-2024",
    avatar:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=80&h=80&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Geyser Maintenance",
    subtitle: "AMC & Packages",
    type: "Corporate",
    plan: "1 Year Plan",
    currentPrice: "₹1,200",
    originalPrice: "₹1,600",
    status: "Running",
    date: "Wed, 10-April-2024",
    avatar:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=80&h=80&fit=crop&q=80",
  },
];

const billingItems = [
  { label: "Split AC", amount: "₹200" },
  { label: "Window AC", amount: "₹200" },
  { label: "Cassette AC", amount: "₹490" },
];

const billingSummary = [
  { label: "Total Amount", amount: "₹890" },
  { label: "Paid", amount: "₹600" },
  { label: "Balance Amount", amount: "₹290" },
];

const scheduleItems = [
  {
    id: 1,
    status: "Completed",
    date: "Mon, 05-Feb-2024",
    details: "Quarterly AC maintenance completed",
  },
  {
    id: 2,
    status: "Upcoming",
    date: "Tue, 12-March-2024",
    details: "Next scheduled AC service",
  },
  {
    id: 3,
    status: "Pending",
    date: "Fri, 05-April-2024",
    details: "Fridge service visit pending",
  },
];

const statusClasses: Record<(typeof scheduleItems)[number]["status"], string> =
  {
    Completed: "bg-green-50 text-green-600",
    Upcoming: "bg-red-50 text-red-600",
    Pending: "bg-gray-100 text-gray-600",
  };

const AmcServicesPage = () => {
  return (
    <div className="min-h-screen ">
      {/* <Header /> */}

      <main className="py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0">
          {/* Top tabs + filters */}
          <section className="mb-8">
            <div className="flex flex-col gap-4">
              {/* Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex rounded-full bg-gray-100 p-1">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:text-orange-600"
                  >
                    Home Services
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm"
                  >
                    AMC &amp; Package
                  </button>
                </div>
              </div>

              {/* Status filters */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="px-4 py-1.5 h-9 text-xs font-semibold rounded-full bg-orange-500 text-white shadow-sm"
                >
                  Pending
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 h-9 text-xs font-medium rounded-full border border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-500"
                >
                  Rejected
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 h-9 text-xs font-medium rounded-full border border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600"
                >
                  Completed
                </button>
              </div>
            </div>
          </section>

          {/* Main layout */}
          <section className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-start">
            {/* Left: AMC cards grid */}
            <div className="w-full lg:basis-[70%] lg:max-w-[70%]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {amcCards.map((card) => (
                  <article
                    key={card.id}
                    className="bg-white rounded-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-gray-50 p-5 flex flex-col gap-3"
                  >
                    {/* Row 1: avatar, titles, status */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={card.avatar}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {card.title}
                          </h3>
                          <p className="text-[11px] text-gray-500">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-[11px] font-semibold text-green-600 border border-green-100">
                        {card.status}
                      </span>
                    </div>

                    {/* Row 2: type + plan */}
                    <div className="flex items-center justify-between text-[11px] mt-1">
                      <div className="flex items-center gap-1 text-gray-500">
                        <span className="font-semibold text-gray-700">
                          Type:
                        </span>
                        <span>{card.type}</span>
                      </div>
                      <span className="font-semibold text-green-600">
                        {card.plan}
                      </span>
                    </div>

                    {/* Row 3: prices */}
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-lg font-semibold text-gray-900">
                        {card.currentPrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {card.originalPrice}
                      </span>
                    </div>

                    {/* Row 4: date */}
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>{card.date}</span>
                    </div>

                    {/* Row 5: actions */}
                    <div className="mt-3 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="h-10 px-4 rounded-[10px] border border-orange-500 text-orange-500 text-xs font-semibold bg-white hover:bg-orange-50 transition-colors"
                      >
                        Re-Schedule
                      </button>
                      <button
                        type="button"
                        className="h-10 px-4 rounded-[10px] text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-sm hover:from-orange-600 hover:to-orange-700 transition-colors"
                      >
                        Raise Complaint
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right: Billing + Schedule */}
            <aside className="w-full lg:basis-[30%] lg:max-w-[30%] space-y-4">
              {/* Billing details */}
              <div className=" rounded-[12px] p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  AMC Billing Details
                </h2>

                <div className="space-y-2 mb-4">
                  {billingItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300"
                    >
                      <span>{item.label}</span>
                      <span className="font-semibold dark:text-white">
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
                  {billingSummary.map((item, idx) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                    >
                      <span
                        className={`${
                          idx === billingSummary.length - 1
                            ? "font-semibold text-gray-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`font-semibold ${
                          idx === billingSummary.length - 1
                            ? "text-orange-600"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule table */}
              <div className="bg-[#f7f7f7] dark:bg-gray-400 rounded-[12px] p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  AMC Schedule
                </h2>

                <div className="grid grid-cols-[auto,1fr,auto] text-[11px] font-semibold text-gray-500 border-b border-gray-200 pb-2 mb-2">
                  <span>Status</span>
                  <span>Upcoming Date</span>
                  <span className="text-right">Details</span>
                </div>

                <div className="space-y-1">
                  {scheduleItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[auto,1fr,auto] items-center gap-2 py-2"
                    >
                      <span
                        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          statusClasses[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-xs text-gray-800 dark:text-gray-300 truncate">
                        {item.date}
                      </span>
                      <button
                        type="button"
                        className="ml-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-500 hover:text-orange-500 hover:shadow-sm transition-colors"
                        aria-label="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default AmcServicesPage;
