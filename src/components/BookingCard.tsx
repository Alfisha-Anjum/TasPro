import { Star } from "lucide-react";

interface BookingCardProps {
  service: string;
  subtitle: string;
  rating?: number;
  reviews?: number;
  date: string;
  time: string;
  status: string;
  serviceImage?: string;
  warrantyText?: string;
  onViewDetails?: () => void;
  onChat?: () => void;
  isCompleted?: boolean;
}
const BookingCard: React.FC<BookingCardProps> = ({
  service,
  subtitle,
  rating,
  reviews,
  date,
  time,
  status,
  serviceImage = "/ac.png",
  warrantyText,
  onViewDetails,
  onChat,
  isCompleted = false,

}) => {
  return (
    <div
      onClick={onViewDetails}
      className="bg-white rounded-xl border border-gray-100 shadow-lg p-4 sm:p-5 flex flex-col gap-4 hover:shadow-md transition cursor-pointer"
    >
      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* LEFT */}
        <div className="flex gap-3 w-full">
          {/* IMAGE */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={serviceImage}
              alt={service}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col flex-1">
            {/* SERVICE TITLE */}
            <h3 className="font-semibold text-gray-900 text-[clamp(14px,1.5vw,18px)] leading-tight">
              {service}
            </h3>

            {/* SUBTITLE */}
            <p className="text-gray-500 text-[clamp(12px,1.2vw,14px)]">
              {subtitle}
            </p>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-1 text-[clamp(11px,1vw,13px)] text-gray-600">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-400 text-orange-400" />
              <span>{rating}</span>
              <span className="text-gray-400 whitespace-nowrap">
                | {reviews} reviews
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex sm:flex-col justify-between sm:items-end items-center gap-3 w-full sm:w-auto">
          {/* STATUS */}
          <span className="bg-orange-100 text-orange-600 text-[clamp(11px,1vw,13px)] px-2 sm:px-3 py-1 rounded-md font-medium">
            {status}
          </span>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <img
              src="/chat.png"
              alt="chat"
              className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onChat?.();
              }}
            />
            <img
              src="/call.png"
              alt="call"
              className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-100"></div>

      {/* DATE & TIME */}
      <div className="flex justify-between text-[clamp(11px,1vw,13px)] text-gray-600">
        <span className="text-gray-400 whitespace-nowrap">Date & Time</span>
        <span className="font-medium text-gray-800 text-right whitespace-nowrap">
          {date} | {time}
        </span>
      </div>

      {/* COMPLETED */}
      {isCompleted && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[clamp(12px,1.2vw,14px)]">
            <span className="text-gray-400">Warranty</span>
            <span className="bg-orange-100 text-orange-600 px-3 py-2 rounded-md text-[clamp(11px,1vw,13px)] font-medium">
              30 Days Remaining
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-full py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-[clamp(13px,1.2vw,15px)] shadow-md hover:opacity-90 transition"
          >
            Create Rework
          </button>
        </>
      )}
    </div>
  );
};

export default BookingCard;
