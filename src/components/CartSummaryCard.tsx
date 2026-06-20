"use client";

import { ShoppingCart, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/context/BookingContext";

export const CartSummaryCard: React.FC = () => {
  const { cartItems } = useBooking();
  const [couponOpen, setCouponOpen] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold">Your Cart is Empty</p>
          <p className="text-sm text-gray-500 mt-1">
            Add services to your cart to get started
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Cart Summary ({cartItems.length} items)
          </h3>

          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.subService}</span>
                <span className="font-semibold text-gray-900">
                  ₹{item.price}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 py-3 mb-4">
            <div className="flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </>
      )}

      <div className="mb-4">
        <button
          onClick={() => setCouponOpen(!couponOpen)}
          className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-900">
            Coupons & Offers
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform ${couponOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {couponOpen && (
          <div className="mt-3 p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">Available Offers:</p>
            <div className="space-y-2">
              <div className="text-sm bg-white p-2 rounded border border-orange-200">
                <p className="font-semibold text-orange-600">WELCOME20</p>
                <p className="text-gray-600">20% off on first booking</p>
              </div>
              <div className="text-sm bg-white p-2 rounded border border-orange-200">
                <p className="font-semibold text-orange-600">SAVE15</p>
                <p className="text-gray-600">₹15 off on orders above ₹500</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <h4 className="font-bold text-gray-900 mb-2">Why TASPro Company?</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✓ Verified & Professional Technicians</li>
          <li>✓ Same Day Booking Available</li>
          <li>✓ Transparent Pricing</li>
          <li>✓ 30-Day Money Back Guarantee</li>
        </ul>
      </div>
    </div>
  );
};
