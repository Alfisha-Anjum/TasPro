"use client";

import { useState } from "react";
import { X, MapPin, Plus, CheckCircle } from "lucide-react";

interface AddressListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (address: any) => void;
  currentAddresses: any[];
}

const AddressListModal = ({ isOpen, onClose, onAddressSelect, currentAddresses }: AddressListModalProps) => {
  const [addresses] = useState([
    ...currentAddresses,
    { id: "new", label: "Add New Address", isPlaceholder: true }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Select Address</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  address.isPlaceholder 
                    ? 'border-dashed border-orange-300 bg-orange-50 hover:bg-orange-100' 
                    : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
                }`}
                onClick={() => {
                  if (!address.isPlaceholder) {
                    onAddressSelect(address);
                  } else {
                    // This would trigger the add new address form
                  }
                }}
              >
                {address.isPlaceholder ? (
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-600">Add New Address</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{address.label}</h3>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{address.fullAddress}</p>
                      <p className="text-sm text-gray-500 mt-1">{address.name} • {address.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button 
            onClick={onClose}
            className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressListModal;