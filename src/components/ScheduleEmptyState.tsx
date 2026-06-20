"use client";

import { ShoppingCart } from "lucide-react";

interface ScheduleEmptyStateProps {
  onServiceClick?: (serviceId: string) => void;
}

const ScheduleEmptyState = ({ onServiceClick }: ScheduleEmptyStateProps) => {
  const suggestedServices = [
    {
      id: "service-1",
      title: "Home Appliance Repair",
      image: "/service-appliance.jpg",
      rating: 4.8,
      reviews: 1247
    },
    {
      id: "service-2",
      title: "Furniture Dealers",
      image: "/service-furniture.jpg",
      rating: 4.6,
      reviews: 892
    },
    {
      id: "service-3",
      title: "Packers & Movers",
      image: "/service-moving.jpg",
      rating: 4.7,
      reviews: 1543
    },
    {
      id: "service-4",
      title: "AC Repair",
      image: "/service-ac.jpg",
      rating: 4.9,
      reviews: 2156
    }
  ];

  return (
    <div className="space-y-8">
      {/* Empty State Card */}
      <div className="bg-white rounded-[14px] p-12 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
        <div className="text-center">
          {/* Cart Empty Illustration */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#F7F7F7] flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-[#CCC]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-semibold text-[#333] mb-3">Your Cart is empty</h2>

          {/* Description */}
          <p className="text-base text-[#888] leading-relaxed max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis mauris pharetra, tincidunt odio non, sodales libero. Aliquam a risus vel lectus lobortis ultricies at a enim.
          </p>
        </div>
      </div>

      {/* Suggested Services Horizontal Scroll */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#333]">Suggested Services</h3>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-5 min-w-min">
            {suggestedServices.map((service) => (
              <div
                key={service.id}
                onClick={() => onServiceClick?.(service.id)}
                className="flex-shrink-0 w-64 bg-white rounded-[14px] shadow-[0_6px_18px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer hover:shadow-[0_8px_22px_rgba(0,0,0,0.09)] transition-shadow group"
              >
                {/* Service Image */}
                <div className="w-full h-40 overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-service.jpg";
                    }}
                  />
                </div>

                {/* Service Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-[#333] mb-2 line-clamp-2">{service.title}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-[#FFA500]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-[#333] ml-1">{service.rating}</span>
                    </div>
                    <span className="text-sm text-[#888]">({service.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEmptyState;
