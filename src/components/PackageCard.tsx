"use client";

import { ArrowRight } from "lucide-react";
import SafeImage from "@/components/SafeImage";

interface PackageCardProps {
  title: string;
  subtitle: string;
  image: string | null;
  onBook: () => void;
}


const PackageCard = ({ title, subtitle, image, onBook }: PackageCardProps) => {

  return (
    <div 
      className="relative rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
      style={{ 
        width: '382px', 
        height: '228px',
        borderRadius: '12px',
        position: 'relative'
      }}
    >
      <SafeImage
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ 
          objectFit: 'cover',
          height: '100%',
          width: '100%'
        }}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
      
      <div className="absolute inset-0 flex flex-col items-start justify-end text-left p-6 text-white z-10">
        <h3 className="text-lg font-bold mb-1 drop-shadow-md">{title}</h3>
        <p className="text-gray-100 mb-3 font-medium drop-shadow-sm text-sm">{subtitle}</p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
          className="px-4 py-2 border-2 border-orange-500 text-orange-500 bg-white/10 backdrop-blur-sm font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-1.5 text-sm"
        >
          Book Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PackageCard;