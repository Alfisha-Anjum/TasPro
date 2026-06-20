"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const appliances = [
  { id: 1, image: "/10.svg", label: "AC Repair", slug: "ac-repair" },
  { id: 2, image: "/7.svg", label: "Geyser Repair", slug: "geyser-repair" },
  {
    id: 3,
    image: "/9.svg",
    label: "Gas Stove Repair",
    slug: "gas-stove-repair",
  },
  {
    id: 4,
    image: "/11.svg",
    label: "Water Cooler Repair",
    slug: "water-cooler-repair",
  },
  {
    id: 5,
    image: "/2.svg",
    label: "Washing Machine Repair",
    slug: "washing-machine-repair",
  },
  {
    id: 6,
    image: "/6.svg",
    label: "Kitchen Chimney Repair",
    slug: "chimney-repair",
  },
  {
    id: 7,
    image: "/8.svg",
    label: "Refrigerator Repair",
    slug: "refrigerator-repair",
  },
  {
    id: 8,
    image: "/5.svg",
    label: "Microwave Repair",
    slug: "microwave-repair",
  },
  {
    id: 9,
    image: "/3.svg",
    label: "Water Purifier Repair",
    slug: "water-purifier-repair",
  },
  { id: 10, image: "/4.svg", label: "TV Repair", slug: "tv-repair" },
  {
    id: 11,
    image: "/12.svg",
    label: "Computer Repair",
    slug: "computer-repair",
  },
  { id: 12, image: "/see-all.png", label: "See All" },
];
interface ApplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any[];
}

const ApplianceModal = ({
  isOpen,
  onClose,
  data = [],
}: ApplianceModalProps) => {
const getApplianceImage = (name: string) => {
  const lower = name.toLowerCase();

  if (lower.includes("ac")) return "/10.svg";
  if (lower.includes("washing")) return "/2.svg";
  if (lower.includes("gas")) return "/9.svg";
  if (lower.includes("water cooler")) return "/11.svg";
  if (lower.includes("chimney")) return "/6.svg";
  if (lower.includes("refrigerator")) return "/8.svg";
  if (lower.includes("microwave")) return "/5.svg";
  if (lower.includes("water purifier")) return "/3.svg";
  if (lower.includes("tv")) return "/4.svg";
  if (lower.includes("computer")) return "/12.svg";
  if (lower.includes("geyser")) return "/7.svg";
  if (lower.includes("deep")) return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop&q=80";
  if (lower.includes("bathroom")) return "/bathroom.png";
  if (lower.includes("electric")) return "/electrician.png";
  if (lower.includes("plumber")) return "/plumber.png";
  if (lower.includes("cleaning")) return "/cleaningpackage.png";

  return "/10.svg";
};

const finalAppliances =
  data.length > 0
    ? data.map((item) => ({
        id: item.id,
        image: getApplianceImage(item.name), // hardcoded image
        label: item.name,
        slug: item.slug || "ac-repair",
      }))
    : appliances.filter((item) => item.label !== "See All");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-sm p-5 relative shadow-xl">
        {/* Close Button (inside like image) */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-sm font-semibold text-orange-600">
          Appliance Repair & Service
        </h2>

        <p className="text-center text-[11px] text-gray-500 mt-1 mb-4 px-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </p>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-3">
          {finalAppliances.map((item, i) => (
       <div
  key={i}
  onClick={() => {
    router.push(`/service/${item.slug}?service_id=${item.id}`);
    onClose();
  }}
  className="flex flex-col items-center gap-1 cursor-pointer"
>
              {/* Circle Icon */}
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-7 object-contain"
                />
              </div>

              {/* Label */}
              <span className="text-[10px] text-center text-gray-600 leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplianceModal;
