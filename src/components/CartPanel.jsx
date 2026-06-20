import React, { useState } from 'react';
import { ChevronDown, BadgePercent, CheckCircle2, ShoppingCart } from 'lucide-react';

const CartPanel = ({ cartItems, onRemoveItem, onCheckout }) => {
  const [expandedCoupon, setExpandedCoupon] = useState(false);
  
  const coupons = [
    {
      id: 1,
      code: 'WELCOME20',
      description: '20% off on first booking'
    },
    {
      id: 2,
      code: 'SAVE15',
      description: '₹15 off on orders above ₹500'
    }
  ];

  const whyTasproFeatures = [
    'Verified & Professional Technicians',
    'Same Day Booking Available',
    'Transparent Pricing',
    'Best Price Guaranteed',
    'Hassle Free Work'
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);

  const toggleCoupons = () => {
    setExpandedCoupon(!expandedCoupon);
  };

  return (
    <div className="space-y-6 sticky top-8 h-fit">
      {/* Cart Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
        {cartItems.length === 0 ? (
          <>
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-400">Your Cart is Empty</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Add services to your cart to get started with your booking process.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-4 text-gray-900">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in Cart
            </h3>
            <div className="space-y-3 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-600">₹{item.price}</span>
                    <button 
                      onClick={() => onRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="w-full h-px bg-gray-200 rounded-full mt-4"></div>
              <div className="flex justify-between items-center pt-4">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="text-xl font-black text-green-600">₹{totalPrice}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-[#FF6B00] hover:bg-[#e66000] text-white font-bold py-3 rounded-xl transition-all duration-200 active:scale-95"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      {/* Coupons & Offer Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={toggleCoupons}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h3 className="font-bold text-lg text-gray-900">Coupons & Offer</h3>
          <ChevronDown 
            size={20} 
            className={`text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${
              expandedCoupon ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        {expandedCoupon && (
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="p-4 border border-orange-100 bg-orange-50/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-orange-100">
                    <BadgePercent className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{coupon.code}</p>
                    <p className="text-xs text-gray-500">{coupon.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Why TASPro Company Card */}
      <div className="bg-[#EBF5FF] p-8 rounded-2xl border border-blue-100">
        <h3 className="text-lg font-bold mb-6 text-gray-900">Why TASPro Company?</h3>
        <ul className="space-y-3">
          {whyTasproFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
              <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartPanel;
