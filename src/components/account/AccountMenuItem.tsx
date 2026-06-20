"use client";

import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface AccountMenuItemProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  hasArrow?: boolean;
  className?: string;
}

export const AccountMenuItem = ({
  icon,
  title,
  subtitle,
  onClick,
  hasArrow = true,
  className = "",
}: AccountMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group ${className}`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Arrow */}
      {hasArrow && (
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
      )}
    </button>
  );
};