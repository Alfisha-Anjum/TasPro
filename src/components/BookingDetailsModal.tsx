"use client";

import { useState } from "react";
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle,
  User,
  Phone,
  MapPin,
  Star,
  Plus,
  Minus,
  Tag
} from "lucide-react";

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onServiceInOrder?: () => void;
}

const BookingDetailsModal = ({ isOpen, onClose, booking, onServiceInOrder }: BookingDetailsModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const itemTotal = booking.amount * quantity;
  const discount = 0;
  const serviceCharge = Math.round(itemTotal * 0.05);
  const total = itemTotal + serviceCharge - discount;

  const handleServiceInOrder = async () => {
    setIsProcessing(true);
    // Simulate processing for 1-2 seconds
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Call the callback to trigger success modal
    if (onServiceInOrder) {
      onServiceInOrder();
    }
    
    // Close this modal
    onClose();
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[20px] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0] sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-[#222]">Booking Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-orange-50 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Left Section - Service Card & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Card */}
            <div className="bg-white border border-[#F0F0F0] rounded-[16px] p-6 shadow-sm">
              <div className="flex gap-5">
                {/* Technician Image */}
                <div className="w-24 h-24 rounded-[12px] overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src={booking.serviceImage || "/placeholder.jpg"} 
                    alt={booking.service}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
                  />
                </div>
                
                {/* Service Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#222] mb-1">{booking.service}</h3>
                  <p className="text-sm text-[#666] mb-2">Booking ID: {booking.id}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-[#FF6B00]">₹{booking.amount}</span>
                  </div>
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#666]">Quantity:</span>
                    <div className="flex items-center gap-3 border border-[#DDD] rounded-[8px] px-3 py-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#666]" />
                      </button>
                      <span className="font-medium text-[#222] min-w-[20px] text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#666]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupons & Offers */}
              <div className="mt-5 pt-5 border-t border-[#F0F0F0]">
                <button className="flex items-center gap-2 text-[#FF6B00] font-medium hover:underline">
                  <Tag className="w-4 h-4" />
                  Coupons & Offers
                </button>
              </div>
            </div>

            {/* Customer Details Section */}
            <div className="bg-white border border-[#F0F0F0] rounded-[16px] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#222] mb-5">Customer Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-2">Name</label>
                  <input 
                    type="text" 
                    value={booking.customerName || "John Doe"} 
                    readOnly
                    className="w-full px-4 py-2 border border-[#DDD] rounded-[10px] bg-[#F9F9F9] text-[#333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={booking.customerPhone || "+91 98765 43210"} 
                    readOnly
                    className="w-full px-4 py-2 border border-[#DDD] rounded-[10px] bg-[#F9F9F9] text-[#333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-2">Address</label>
                  <textarea 
                    value={booking.address || "123 Main Street, City"}
                    readOnly
                    rows={2}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-[10px] bg-[#F9F9F9] text-[#333] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Service Provider Card */}
            <div className="bg-white border border-[#F0F0F0] rounded-[16px] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#222] mb-5">Service Provider</h3>
              {booking.technician ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-[#FF6B00]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#222] mb-1">{booking.technician}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(booking.technicianRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-[#666]">{booking.technicianRating}</span>
                      </div>
                      <p className="text-sm text-[#666]">2,450+ completed services</p>
                    </div>
                  </div>

                  {/* Map Preview Placeholder */}
                  <div className="mt-4 w-full h-32 bg-gradient-to-br from-[#F8F8F8] to-[#F0F0F0] rounded-[10px] flex items-center justify-center text-[#999]">
                    <MapPin className="w-8 h-8 mr-2" />
                    Map Preview
                  </div>

                  <button className="w-full flex items-center gap-2 px-4 py-2 border border-[#FF6B00] text-[#FF6B00] font-medium rounded-[10px] hover:bg-orange-50 transition-colors justify-center">
                    <Phone className="w-4 h-4" />
                    Contact Technician
                  </button>
                </div>
              ) : (
                <p className="text-[#666]">Technician will be assigned soon</p>
              )}
            </div>
          </div>

          {/* Right Section - Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#FF8C42] to-[#FF6B00] rounded-[16px] p-6 text-white sticky top-32 shadow-lg">
              <h3 className="text-lg font-bold mb-6">Payment Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Item Total</span>
                  <span className="font-semibold">₹{itemTotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="opacity-90">Service Charge</span>
                  <span className="font-semibold">₹{serviceCharge}</span>
                </div>
                
                <div className="border-t border-white border-opacity-30 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={handleServiceInOrder}
                disabled={isProcessing}
                className="w-full bg-white text-[#FF6B00] font-bold py-3 rounded-[10px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Service in Order"
                )}
              </button>

              <button 
                onClick={onClose}
                className="w-full mt-3 text-white font-medium py-2 hover:bg-white hover:bg-opacity-10 rounded-[10px] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;