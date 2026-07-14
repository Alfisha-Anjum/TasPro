"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import Swal from "sweetalert2";
interface AddNewAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: any) => void;
  initialData?: any;
}

export const AddNewAddressModal: React.FC<AddNewAddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    altPhone: "",
    houseNo: "",
    street: "",
    landmark: "",
    city: "Raipur",
    state: "Chhattisgarh",
    pincode: "",
  });

  const { getCurrentLocation, loadingLocation } = useCurrentLocation();
  
  if (!isOpen) return null;

  
const handleSave = async () => {
  console.log("FORM DATA BEFORE SAVE:", formData);

  if (
    formData.name &&
    formData.phone &&
    formData.houseNo &&
    formData.city &&
    formData.pincode
  ) {
    onSave(formData);

    await Swal.fire({
      icon: "success",
      title: "Address Saved!",
      text: "Your address has been added successfully.",
      timer: 1800,
      showConfirmButton: false,
    });
  } else {
    await Swal.fire({
      icon: "warning",
      title: "Required Fields Missing",
      text: "Please fill all required fields.",
    });
  }
};
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-96 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Address</h2>

        <div className="space-y-3 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              placeholder="10 digit number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Alternate Phone
            </label>
            <input
              type="tel"
              value={formData.altPhone}
              onChange={(e) =>
                setFormData({ ...formData, altPhone: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              placeholder="Optional"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                House No
              </label>
              <input
                type="text"
                value={formData.houseNo}
                onChange={(e) =>
                  setFormData({ ...formData, houseNo: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Street
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Landmark
            </label>
            <input
              type="text"
              value={formData.landmark}
              onChange={(e) =>
                setFormData({ ...formData, landmark: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              placeholder="Nearby landmark"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{ backgroundColor: "#FF6B00" }}
          className="w-full text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default AddNewAddressModal;