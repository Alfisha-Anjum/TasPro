"use client";

import { X, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

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

interface PremiumAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Address) => void;
}

const PremiumAddressModal = ({
  isOpen,
  onClose,
  onSave
}: PremiumAddressModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    alternateNumber: "",
    postalCode: "",
    state: "",
    city: "",
    houseNo: "",
    location: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.contactNumber || !formData.postalCode || 
        !formData.state || !formData.city || !formData.houseNo || !formData.location) {
      alert("Please fill all required fields");
      return;
    }
    onSave({
      id: Date.now().toString(),
      name: formData.fullName,
      phone: formData.contactNumber,
      address: `${formData.houseNo}, ${formData.location}`,
      city: formData.city,
      state: formData.state,
      pincode: formData.postalCode,
      label: "Home",
      isDefault: false
    });
    // Reset form
    setFormData({
      fullName: "",
      contactNumber: "",
      alternateNumber: "",
      postalCode: "",
      state: "",
      city: "",
      houseNo: "",
      location: ""
    });
  };

  if (!isOpen) return null;

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

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
          <h2 className="text-[28px] font-semibold text-[#222] mb-3">Add New Address</h2>
          <p className="text-sm text-[#777]">Enter your complete address details</p>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name *"
              className="w-full h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>

          {/* Contact Number */}
          <div>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number *"
              className="w-full h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>

          {/* Alternate Number */}
          <div>
            <input
              type="tel"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleChange}
              placeholder="Alternate Contact Number *"
              className="w-full h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>

          {/* Row: Postal Code + Use my Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code *"
                className="w-full h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#777]">
                <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-200" />
                <span>Use my Location</span>
              </label>
            </div>
          </div>

          {/* Row: State + City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all appearance-none pr-8"
              >
                <option value="">State *</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#777] pointer-events-none" />
            </div>
            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City *"
                className="w-full h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>
          </div>

          {/* House No */}
          <div>
            <input
              type="text"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
              placeholder="House No *"
              className="w-full h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>

          {/* Road Name / Area Name */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Road Name / Area Name *"
                className="w-full h-[48px] bg-[#F5F5F5] border-none rounded-[12px] px-4 py-0 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all pr-10"
              />
              <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSave}
          className="w-full h-[52px] bg-gradient-to-r from-[#FF6A00] to-[#FFA500] text-white font-semibold rounded-[30px] mt-8 shadow-[0_4px_14px_rgba(255,106,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,106,0,0.4)] transition-all hover:-translate-y-0.5"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PremiumAddressModal;
