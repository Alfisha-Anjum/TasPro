// "use client";

import { Star } from "lucide-react";

interface ScheduleCardProps {
  id: string;
  serviceTitle: string;
  serviceSubtitle: string;
  serviceImage: string;
  rating: number;
  reviews: number;
  status: "Pending" | "Completed" | "Running";
  date: string;
  time: string;
  onClick?: (id: string) => void;
  isSelected?: boolean;
}

const ScheduleCard = ({
  id,
  serviceTitle,
  serviceSubtitle,
  serviceImage,
  rating,
  reviews,
  status,
  date,
  time,
  onClick,
  isSelected = false,
}: ScheduleCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-[#E8F5E9] text-[#28C76F]";
      case "Running":
        return "bg-[#FFF3E0] text-[#FF9800]";
      case "Pending":
        return "bg-[#FFF1EA] text-[#FF6B2C]";
      default:
        return "bg-[#F5F5F5] text-[#777]";
    }
  };

  return (
    <div
      onClick={() => onClick?.(id)}
      className={`bg-white rounded-[16px] p-order-transparent"
      }`}
    >
      {/* Row 1: Service image, title, subtitle, and status badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Service Image */}
          <div className="w-14 h-14 rounded-[10px] overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={serviceImage}
              alt={serviceTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-service.jpg";
              }}
            />
          </div>

          {/* Title and Subtitle */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#333]">
              {serviceTitle}
            </h3>
            <p className="text-xs text-[#888]">{serviceSubtitle}</p>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold flex-shrink-0 ${getStatusColor()}`}
        >
          {status}
        </span>
      </div>

      {/* Row 2: Rating */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-[#FFA500] fill-current" />
          <span className="text-sm font-semibold text-[#333]">{rating}</span>
        </div>
        <span className="text-xs text-[#888]">({reviews} reviews)</span>
      </div>

      {/* Row 3: Date & Time */}
      <div className="border-t border-[#EEE] pt-4">
        <div className="text-xs text-[#888] mb-1">Date & Time</div>
        <div className="text-sm font-semibold text-[#333]">
          {date} | {time}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
