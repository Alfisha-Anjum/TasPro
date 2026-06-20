"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Home, Building2, Plus, Edit3, Trash2, Check, X, ArrowLeft } from "lucide-react";
// import { AccountSidebar } from "@/components/account/AccountSidebar";
import AccountSidebar from "@/components/account/AccountSidebar";

interface Address {
  id: string;
  type: 'home' | 'office';
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const AddressPage = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123 Main Street",
      city: "Raipur",
      state: "Chhattisgarh",
      pincode: "492001",
      isDefault: true
    },
    {
      id: "2",
      type: "office",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "456 Business Park",
      city: "Raipur",
      state: "Chhattisgarh",
      pincode: "492001",
      isDefault: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [formData, setFormData] = useState({
    type: 'home' as 'home' | 'office',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isDefault' ? !prev.isDefault : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...formData, id: editingAddress.id, isDefault: formData.isDefault || addr.isDefault } 
          : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
        isDefault: addresses.length === 0 // Set as default if it's the first address
      };
      setAddresses([...addresses, newAddress]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      type: address.type,
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      isDefault: address.isDefault
    });
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Saved Addresses</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <AccountSidebar />
          </div>

          <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Addresses</h2>
            <button
              onClick={() => {
                // Show popup instead of inline form
                document.getElementById('add-address-popup')?.classList.remove('hidden');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add New Address
            </button>
                          
            {/* Add New Address Popup Modal */}
            <div 
              id="add-address-popup"
              className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
              <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
                    <button 
                      onClick={() => document.getElementById('add-address-popup')?.classList.add('hidden')}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                                
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // Handle form submission
                    document.getElementById('add-address-popup')?.classList.add('hidden');
                  }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                                    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                        <input
                          type="tel"
                          placeholder="Enter mobile number"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                                    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">House / Flat No</label>
                        <input
                          type="text"
                          placeholder="Enter house/flat number"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                                    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area / Landmark</label>
                        <input
                          type="text"
                          placeholder="Enter area/landmark"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                                    
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            placeholder="City"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                        </div>
                                      
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                          <input
                            type="text"
                            placeholder="Pincode"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                        </div>
                      </div>
                                    
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => document.getElementById('add-address-popup')?.classList.add('hidden')}
                          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, type: 'home'})}
                        className={`flex-1 p-4 border rounded-lg flex items-center gap-3 ${
                          formData.type === 'home' 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Home className="w-5 h-5 text-orange-500" />
                        <div className="text-left">
                          <div className="font-medium">Home</div>
                          <div className="text-sm text-gray-500">For home delivery</div>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, type: 'office'})}
                        className={`flex-1 p-4 border rounded-lg flex items-center gap-3 ${
                          formData.type === 'office' 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Building2 className="w-5 h-5 text-orange-500" />
                        <div className="text-left">
                          <div className="font-medium">Office</div>
                          <div className="text-sm text-gray-500">For office delivery</div>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter PIN code"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Set as default address
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                  >
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid gap-6">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
                  address.isDefault ? 'border-orange-500' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        {address.type === 'home' ? (
                          <Home className="w-4 h-4 text-orange-600" />
                        ) : (
                          <Building2 className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <span className="font-semibold text-gray-900 capitalize">{address.type}</span>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    
                    <div className="mb-1">
                      <span className="font-medium text-gray-900">{address.name}</span>
                    </div>
                    
                    <div className="text-gray-600 mb-1">
                      {address.address}, {address.city}, {address.state} {address.pincode}
                    </div>
                    
                    <div className="text-gray-600">
                      {address.phone}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        <Check className="w-4 h-4" />
                        Set as Default
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleEdit(address)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {addresses.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses found</h3>
              <p className="text-gray-600 mb-6">Add a new address to get started</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              >
                Add New Address
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;