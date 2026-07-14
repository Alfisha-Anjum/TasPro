"use client";

import { X, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postal: string;
}

interface AddressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (address: Address) => void;
  onAddNewAddress: () => void;
}

const AddressSelectionModal = ({
  isOpen,
  onClose,
  onContinue,
  onAddNewAddress
}: AddressSelectionModalProps) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  // Sample addresses
  const addresses: Address[] = [
    {
      id: "1",
      name: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      postal: "10001"
    },
    {
      id: "2",
      name: "Office",
      address: "456 Park Avenue, Suite 200",
      city: "New York, NY 10022",
      postal: "10022"
    },
    {
      id: "3",
      name: "Others",
      address: "789 Broadway, Floor 5",
      city: "New York, NY 10003",
      postal: "10003"
    }
  ];

 const handleContinue = async () => {
   if (!selectedAddressId) {
     await Swal.fire({
       icon: "warning",
       title: "No Address Selected",
       text: "Please select an address to continue.",
       confirmButtonColor: "#f97316",
     });
     return;
   }

   const selected = addresses.find((addr) => addr.id === selectedAddressId);

   if (selected) {
     await Swal.fire({
       icon: "success",
       title: "Address Selected",
       text: `${selected.name} address selected successfully.`,
       timer: 1500,
       showConfirmButton: false,
     });

     onContinue(selected);
   }
 }; 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-[16px] w-full max-w-[420px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden animate-scaleIn"
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-[#EEE]">
          <h2 className="text-lg font-semibold text-[#222]">Select Address</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#FFE9E2] flex items-center justify-center text-[#FF6B2C] hover:bg-[#FFD4C0] transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
          {/* Address List */}
          <div className="space-y-3">
            {addresses.map((address) => (
              <label
                key={address.id}
                className="flex items-start gap-3 p-4 border border-[#EEE] rounded-[12px] cursor-pointer hover:border-[#FF6B2C] hover:bg-[#FFF9F5] transition-all"
              >
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  checked={selectedAddressId === address.id}
                  onChange={(e) => setSelectedAddressId(e.target.value)}
                  className="w-5 h-5 mt-0.5 accent-[#FF6B2C] cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-[#FF6B2C]" />
                    <span className="text-sm font-semibold text-[#222]">{address.name}</span>
                  </div>
                  <p className="text-xs text-[#777]">{address.address}</p>
                  <p className="text-xs text-[#777]">{address.city}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 border-t border-[#EEE]"></div>
            <span className="text-xs text-[#999]">or</span>
            <div className="flex-1 border-t border-[#EEE]"></div>
          </div>

          {/* Add New Address Button */}
          <button
            onClick={onAddNewAddress}
            className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[#FF6B2C] rounded-[12px] text-[#FF6B2C] font-medium hover:bg-[#FFF9F5] transition-all"
          >
            <Plus className="w-5 h-5" />
            Add a New Address
          </button>
        </div>

        {/* Footer with Buttons */}
        <div className="px-6 py-4 bg-[#F7F7F7] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-[10px] border border-[#DDD] text-[#333] font-medium text-sm hover:bg-[#F0F0F0] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 h-11 rounded-[10px] bg-gradient-to-r from-[#FF6B2C] to-[#FFA62B] text-white font-medium text-sm hover:shadow-lg transition-shadow"
          >
            Continue
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default AddressSelectionModal;
