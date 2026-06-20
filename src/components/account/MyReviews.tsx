"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { MoreVertical, Star, ArrowLeft, Edit, Trash2 } from "lucide-react";

type Props = {
  setActiveView: (view: string) => void;
};

export default function MyReviews({ setActiveView }: Props) {
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const reviews = [
    {
      name: "Darron Kulikowski",
      img: "/img/user1.png",
      rating: 1,
      time: "4 months ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Emly William",
      img: "/img/user2.png",
      rating: 2,
      time: "2 months ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Darron Kulikowski",
      img: "/img/user3.png",
      rating: 3,
      time: "4 months ago",
      text: "Amazing service, highly recommended!",
    },
    {
      name: "Emly William",
      img: "/img/user4.png",
      rating: 4,
      time: "2 months ago",
      text: "Good experience overall.",
    },
  ];

  return (
    <div className="md:px-6 w-full">
      <div className="w-full flex justify-between items-center mb-6 md:hidden">
        {/* Back */}
        <button
          onClick={() => setActiveView("default")}
          className="text-black dark:text-white font-medium flex items-center gap-2 hover:text-orange-500 transition"
        >
          <ArrowLeft size={20} />
          My Rating and Reviews
        </button>
      </div>

      <h2 className="hidden md:block md:text-[18px] md:text-[#1B1B1B] dark:text-white md:font-semibold md:mb-6">
        My Rating and Reviews
      </h2>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-xl shadow-sm animate-pulse"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-1/3" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                  <div className="h-3 bg-gray-300 rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Grid */}
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-left gap-4">
          {reviews.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No reviews yet 😕
            </div>
          )}
          {reviews.map((item, i) => (
            <div
              key={i}
              className="relative flex gap-3 bg-white dark:bg-gray-200 rounded-xl w-full w-full p-4"
            >
              <div>
                <div className=" flex gap-3 justify-content items-center">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <p className="text-sm font-semibold text-[#1B1B1B]">
                    {item.name}
                  </p>
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filled = i < item.rating;

                      return (
                        <Star
                          key={i}
                          size={16}
                          className={
                            filled
                              ? "text-[#FFE605] fill-[#FFE605]"
                              : "text-[#FFE605] fill-transparent"
                          }
                        />
                      );
                    })}
                  </div>

                  <span className="text-gray-400 text-[12px] ml-2">
                    {item.time}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {item.text}
                </p>
              </div>

              {/* Top Right Icon */}
              <div className="" ref={menuRef}>
                {/* Icon */}
                <MoreVertical
                  className="w-4 h-4 text-black cursor-pointer absolute top-4 right-1"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                />

                {/* Dropdown */}
                {openIndex === i && (
                  <div className="absolute top-10 right-0 w-36 bg-white shadow-lg rounded-xl border border-gray-200 py-2 z-50">
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      {/* <button
        onClick={() => setActiveView("settings")}
        className="hidden md:block md:mt-6 md:text-sm md:text-orange-500"
      >
        ← Back
      </button> */}
    </div>
  );
}
