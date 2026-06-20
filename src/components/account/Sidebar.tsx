import React from "react";
import { ChevronRight } from "lucide-react";

type Props = {
  step: string;
  setStep: (s: string) => void;
};

const items = [
  { id: "edit", label: "Edit Profile" },
  { id: "address", label: "Saved Address" },
  { id: "wallet", label: "My Wallet" },
  { id: "language", label: "Change Language" },
  { id: "notification", label: "Notification Setting (Toggle)" },
  { id: "dark", label: "Dark Mode (Toggle)" },
  { id: "activity", label: "My Activity" },
  { id: "rating", label: "My Rating & Reviews" },
  { id: "coupon", label: "My Coupon" },
  { id: "refer", label: "Refer & Earn" },
  { id: "bank", label: "Bank Account" },
  { id: "logout", label: "Logout" },
];

export const Sidebar: React.FC<Props> = ({ step, setStep }) => {
  return (
    <aside className="sticky top-6">
      <div className="bg-white rounded-[12px] shadow-sm p-4 w-64">
        <nav className="space-y-1">
          {items.map((it) => {
            const active = step === it.id;
            return (
              <button
                key={it.id}
                onClick={() => setStep(it.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-left text-sm ${
                  active
                    ? "bg-gradient-to-r from-[#FF6A00] to-[#FF8E53] text-white"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className="truncate">{it.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
