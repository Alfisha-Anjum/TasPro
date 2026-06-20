"use client";

import { User, ShoppingBag, Tag, CreditCard } from "lucide-react";

interface CartSummaryProps {
  customerDetails?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  orderItems: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  total: number;
}

const CartSummary = ({ 
  customerDetails, 
  orderItems, 
  subtotal, 
  discount, 
  total 
}: CartSummaryProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side - Customer Details & Order Summary */}
      <div className="space-y-6">
        {/* Customer Details */}
        <div 
          className="bg-white rounded-xl border border-gray-200"
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #eee'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Customer Details</h3>
          </div>
          
          {customerDetails ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{customerDetails.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{customerDetails.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{customerDetails.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">{customerDetails.address}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No customer details provided</p>
          )}
        </div>

        {/* Order Summary */}
        <div 
          className="bg-white rounded-xl border border-gray-200"
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #eee'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Order Summary</h3>
          </div>
          
          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Coupon Card & Price Summary */}
      <div className="space-y-6">
        {/* Coupon Card */}
        <div 
          className="bg-white rounded-xl border border-gray-200"
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #eee'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Apply Coupon</h3>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ borderRadius: '8px' }}
            />
            <button 
              className="px-4 py-2 text-white font-medium rounded-lg"
              style={{
                background: '#ff6a00',
                borderRadius: '8px'
              }}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Price Summary */}
        <div 
          className="bg-white rounded-xl border border-gray-200"
          style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #eee'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Price Summary</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">₹{subtotal}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">-₹{discount}</span>
              </div>
            )}
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-orange-600">₹{total}</span>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full mt-4 py-3 text-white font-medium rounded-lg"
            style={{
              background: 'linear-gradient(90deg,#ff7a18,#ff3d00)',
              borderRadius: '10px',
              height: '48px'
            }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
