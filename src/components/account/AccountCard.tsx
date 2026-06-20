"use client";

import { User, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AccountCardProps {
  onEditClick?: () => void;
  onBookingsClick?: () => void;
  onHelpCenterClick?: () => void;
}

export const AccountCard = ({
  onEditClick,
  onBookingsClick,
  onHelpCenterClick,
}: AccountCardProps) => {
  const { user } = useAuth();

  const getFullName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.firstName || "User Name";
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-6">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/30">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          {onEditClick && (
            <button
              onClick={onEditClick}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full text-orange-600 shadow-lg hover:bg-orange-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{getFullName()}</h1>
          <p className="text-orange-100 text-lg mb-6">
            {user?.email || "user@example.com"}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onBookingsClick}
              className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-200 shadow-md"
            >
              My Bookings
            </button>
            <button
              onClick={onHelpCenterClick}
              className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30"
            >
              Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};