"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartCardProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartCard = ({ items, onUpdateQuantity, onRemoveItem }: CartCardProps) => {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div 
      className="sticky top-24 bg-white rounded-xl border border-gray-200"
      style={{
        position: 'sticky',
        top: '100px',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid #eee',
        background: 'white'
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-5 h-5 text-orange-600" />
        <h3 className="font-semibold text-gray-900">Cart</h3>
        <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
          {items.length} items
        </span>
      </div>

      {/* Cart Items or Empty State */}
      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="font-semibold text-gray-900 mb-2">Your Cart is Empty</h4>
          <p className="text-sm text-gray-500 mb-4">
            Add services to your cart to get started with your booking process.
          </p>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex-grow">
                <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </button>
                
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total Price and Checkout Button - Only show when cart has items */}
      {items.length > 0 && (
        <>
          {/* Total Price */}
          <div className="border-t pt-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-orange-600">₹{totalPrice}</span>
            </div>
          </div>

          {/* View Cart Button */}
          <button 
            className="w-full py-3 text-white font-medium rounded-lg transition-colors"
            style={{
              background: '#ff6a00',
              borderRadius: '8px',
              height: '44px'
            }}
          >
            View Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartCard;
