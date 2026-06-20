"use client";

import { useState } from "react";
import { Plus, MapPin, Edit, Trash2, Navigation } from "lucide-react";
import { Modal } from "../Modals/Modal";
import { FormInput } from "../Forms/FormInput";
import { useToast } from "../../../hooks/use-toast";

interface Address {
  id: string;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  postalCode: string;
  state: string;
  city: string;
  houseNo: string;
  landmark?: string;
  isDefault: boolean;
}

interface AddressManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddressManagementModal = ({ isOpen, onClose }: AddressManagementModalProps) => {
  const { toast } = useToast();
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      fullName: "John Doe",
      phone: "9876543210",
      alternatePhone: "9876543211",
      postalCode: "110001",
      state: "Delhi",
      city: "New Delhi",
      houseNo: "123, Main Street",
      landmark: "Near Metro Station",
      isDefault: true
    },
    {
      id: "2",
      fullName: "John Doe",
      phone: "9876543210",
      postalCode: "400001",
      state: "Maharashtra",
      city: "Mumbai",
      houseNo: "456, Park Avenue",
      landmark: "Opposite Shopping Mall",
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    postalCode: "",
    useMyLocation: false,
    state: "",
    city: "",
    houseNo: "",
    landmark: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const states = [
    "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh",
    "Gujarat", "West Bengal", "Rajasthan", "Madhya Pradesh", "Andhra Pradesh"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newAddress.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!newAddress.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(newAddress.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!newAddress.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    
    if (!newAddress.state) {
      newErrors.state = "State is required";
    }
    
    if (!newAddress.city) {
      newErrors.city = "City is required";
    }
    
    if (!newAddress.houseNo.trim()) {
      newErrors.houseNo = "House number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const addressToAdd: Address = {
        id: Date.now().toString(),
        fullName: newAddress.fullName.trim(),
        phone: newAddress.phone.trim(),
        alternatePhone: newAddress.alternatePhone.trim() || undefined,
        postalCode: newAddress.postalCode.trim(),
        state: newAddress.state,
        city: newAddress.city,
        houseNo: newAddress.houseNo.trim(),
        landmark: newAddress.landmark.trim() || undefined,
        isDefault: addresses.length === 0
      };
      
      setAddresses(prev => [...prev, addressToAdd]);
      
      toast({
        title: "Address added successfully!",
        description: "Your new address has been saved."
      });
      
      // Reset form
      setNewAddress({
        fullName: "",
        phone: "",
        alternatePhone: "",
        postalCode: "",
        useMyLocation: false,
        state: "",
        city: "",
        houseNo: "",
        landmark: ""
      });
      
      setShowAddAddress(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add address. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast({
      title: "Address deleted",
      description: "The address has been removed."
    });
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    
    toast({
      title: "Default address updated",
      description: "This address is now your default."
    });
  };

  return (
    <>
      {/* Main Address Management Modal */}
      <Modal isOpen={isOpen} onClose={onClose} title="Saved Addresses" size="lg">
        <div className="space-y-6">
          {/* Add New Address Button */}
          <button
            onClick={() => setShowAddAddress(true)}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Address
          </button>

          {/* Address List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {addresses.map((address) => (
              <div key={address.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-gray-900">{address.fullName}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{address.houseNo}</p>
                  <p>{address.landmark && `${address.landmark}, `}{address.city}, {address.state} - {address.postalCode}</p>
                  <p>Phone: {address.phone}</p>
                  {address.alternatePhone && <p>Alt: {address.alternatePhone}</p>}
                </div>
              </div>
            ))}
            
            {addresses.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No addresses saved yet</p>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Add New Address Modal */}
      <Modal isOpen={showAddAddress} onClose={() => setShowAddAddress(false)} title="Add New Address" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              value={newAddress.fullName}
              onChange={(value) => setNewAddress(prev => ({ ...prev, fullName: value }))}
              placeholder="Enter full name"
              required
              error={errors.fullName}
            />
            
            <FormInput
              label="Contact Number"
              type="tel"
              value={newAddress.phone}
              onChange={(value) => setNewAddress(prev => ({ ...prev, phone: value }))}
              placeholder="Enter phone number"
              required
              error={errors.phone}
            />
          </div>

          <FormInput
            label="Alternate Number (Optional)"
            type="tel"
            value={newAddress.alternatePhone}
            onChange={(value) => setNewAddress(prev => ({ ...prev, alternatePhone: value }))}
            placeholder="Enter alternate number"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Postal Code"
              value={newAddress.postalCode}
              onChange={(value) => setNewAddress(prev => ({ ...prev, postalCode: value }))}
              placeholder="Enter postal code"
              required
              error={errors.postalCode}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Use My Location
              </label>
              <button
                type="button"
                className="w-full p-3 border border-gray-300 rounded-xl hover:border-orange-500 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5 text-orange-500" />
                Detect Location
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={newAddress.state}
                onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
            </div>
            
            <FormInput
              label="City"
              value={newAddress.city}
              onChange={(value) => setNewAddress(prev => ({ ...prev, city: value }))}
              placeholder="Enter city"
              required
              error={errors.city}
            />
          </div>

          <FormInput
            label="House No./Building Name"
            value={newAddress.houseNo}
            onChange={(value) => setNewAddress(prev => ({ ...prev, houseNo: value }))}
            placeholder="Enter house number or building name"
            required
            error={errors.houseNo}
          />

          <FormInput
            label="Landmark (Optional)"
            value={newAddress.landmark}
            onChange={(value) => setNewAddress(prev => ({ ...prev, landmark: value }))}
            placeholder="Enter landmark"
          />

          <button
            onClick={handleAddAddress}
            disabled={isLoading}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding..." : "Confirm Address"}
          </button>
        </div>
      </Modal>
    </>
  );
};