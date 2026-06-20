"use client";

import { X, MapPin, Plus, CheckCircle } from "lucide-react";

type Address = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  label: string;
  isDefault: boolean;
};

interface PremiumAddressListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (address: Address) => void;
  onAddNewAddress: () => void;
  currentAddresses: Address[];
}

const PremiumAddressListModal = ({
  isOpen,
  onClose,
  onAddressSelect,
  onAddNewAddress,
  currentAddresses
}: PremiumAddressListModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[6px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[30px] w-full max-w-[480px] shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-10 transform transition-all duration-300 scale-100 animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-full flex items-center justify-center text-white shadow-[0_4px_14px_rgba(255,106,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,106,0,0.5)] transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[28px] font-semibold text-[#222] mb-3">Saved Addresses</h2>
          <p className="text-sm text-[#777]">Select an address or add a new one</p>
        </div>

        {/* Content */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {currentAddresses.map((address) => (
            <div
              key={address.id}
              className={`p-5 rounded-[16px] border cursor-pointer transition-all duration-200 hover:shadow-md ${
                address.isDefault 
                  ? 'border-[#FF6A00] bg-orange-50' 
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
              }`}
              onClick={() => onAddressSelect(address)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${
                  address.isDefault ? 'bg-[#FF6A00]' : 'bg-gray-200'
                }`}>
                  {address.isDefault ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <MapPin className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-[#222]">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-[#FF6A00] text-white px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {address.label}
                    </span>
                  </div>
                  <p className="text-sm text-[#777] mb-1">{address.address}</p>
                  <p className="text-sm text-[#777] mb-1">{address.city}, {address.state} - {address.pincode}</p>
                  <p className="text-sm text-[#777]">{address.phone}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Address Button */}
          <button
            onClick={onAddNewAddress}
            className="w-full p-5 rounded-[16px] border-2 border-dashed border-[#FF6A00] bg-orange-50 cursor-pointer transition-all duration-200 hover:bg-orange-100 hover:border-solid"
          >
            <div className="flex items-center justify-center gap-3">
              <Plus className="w-5 h-5 text-[#FF6A00]" />
              <span className="font-medium text-[#FF6A00]">Add New Address</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumAddressListModal;
