"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "@/components/BlogCards";

type BlogSliderProps = {
  title?: string;
  subtitle?: string;
};

export default function BlogSlider({
  title = "Related Blogs",
  subtitle = "There are many variations of passages of Lorem Ipsum",
}: BlogSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  const blogData = [
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Education",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
    {
      category: "Edu",
      title: "What is Salary Range?",
      description:
        "There are many variations of passages of Lorem Ipsum available...",
      date: "27, Oct, 2024",
      image: "/img/officeview.png",
    },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 mb-10 mx-4">
      {/* SLIDER */}
      <h1 className="text-[28px] dark:text-white font-semibold text-black py-6">
        {title}
      </h1>
      <p className="text-[16px] text-gray-600 pb-4">{subtitle}</p>
      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-6 scroll-smooth px-1 [&::-webkit-scrollbar]:hidden"
      >
        {blogData.map((blog, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[90%] sm:w-[70%] md:w-[48%]"
          >
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={scrollLeft}
        className="hidden md:block absolute left-0 md:-left-5 top-[60%] -translate-y-1/2 bg-white border border-orange-500 rounded-full text-orange-500 w-10 h-10 flex items-center justify-center z-10"
      >
        <ChevronLeft />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollRight}
        className="hidden md:block absolute right-0 md:-right-5 top-[60%] -translate-y-1/2 bg-white border border-orange-500 rounded-full text-orange-500 w-10 h-10 flex items-center justify-center z-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
