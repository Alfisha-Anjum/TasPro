"use client";

import Image from "next/image";

type SidebarCardProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  variant?: "orange" | "gray";
  image?: string;
  buttonClassName?: string;
  imageClassName?: string;
};

export default function SidebarCard({
  title,
  description,
  buttonText,
  onClick,
  variant = "gray",
  image,
  buttonClassName,
  imageClassName,
}: SidebarCardProps) {
  const baseStyles =
    "relative w-full max-w-[381px] h-[360px] md:h-[400px] mx-auto p-5 overflow-hidden flex flex-col justify-between";

  const variants = {
    orange: "bg-orange-200",
    gray: "bg-gray-200",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]}`}>
      {/* Logo */}
      <div className="absolute top-0 left-4 z-20">
        <Image src="/tas.logo.png" alt="logo" width={122} height={50} />
      </div>

      {/* Content */}
      <div className="z-20 mt-10 py-20">
        <h4 className="font-semibold text-[25px] max-w-[180px]">{title}</h4>

        {buttonText && (
          <button
            onClick={onClick}
            className={`mt-3 px-4 py-2 text-sm rounded ${
              buttonClassName || "bg-orange-500 text-white"
            }`}
          >
            {buttonText}
          </button>
        )}
      </div>

      {/* 🔥 Image FIX (important) */}
      {image && (
        <div
          className={`absolute bottom-0 right-0 w-[65%] h-[80%] ${
            imageClassName || ""
          }`}
        >
          <Image
            src={image}
            alt="card-img"
            fill
            className="object-cover object-bottom"
          />
        </div>
      )}
    </div>
  );
}
