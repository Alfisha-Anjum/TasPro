'use client'

import { ShoppingCart } from 'lucide-react'

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
}

interface CartPanelProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartPanel({ cartItems, onRemoveItem, onCheckout }: CartPanelProps) {
  const totalPrice = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
  const itemCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

  return (
    <div className="sticky top-4 w-full lg:w-96 space-y-4">
      {/* Cart Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Cart
            {itemCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full">
                {itemCount}
              </span>
            )}
          </h2>
        </div>

        {/* Cart Content */}
        <div className="p-6">
          {cartItems.length === 0 ? (
            // Empty State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Add services to your cart to get started with your booking process.
              </p>
            </div>
          ) : (
            // Cart Items
            <div className="space-y-4">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Total */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-orange-600">₹{totalPrice}</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={onCheckout}
                  className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
