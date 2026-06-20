import { useState } from "react";
import { Calendar, Clock, MapPin, ShoppingCart, Plus, Minus } from "lucide-react";

interface BookingSectionProps {
  serviceName: string;
  price: number;
  originalPrice?: string;
  estimatedTime: string;
  onAddToCart: (quantity: number, date: string, time: string) => void;
  onBookNow: (quantity: number, date: string, time: string) => void;
}

const BookingSection = ({ 
  serviceName, 
  price, 
  originalPrice, 
  estimatedTime, 
  onAddToCart, 
  onBookNow 
}: BookingSectionProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleAddToCart = () => {
    onAddToCart(quantity, selectedDate, selectedTime);
  };

  const handleBookNow = () => {
    onBookNow(quantity, selectedDate, selectedTime);
  };

  const tax = price * 0.05; // 5% tax
  const totalPrice = (price * quantity) + tax;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-orange-600">₹{price.toLocaleString()}</div>
          {originalPrice && (
            <div className="text-gray-400 line-through text-sm">₹{originalPrice}</div>
          )}
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Save ₹{originalPrice ? (parseInt(originalPrice.replace(/,/g, '')) - price).toLocaleString() : '0'}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <div className="flex items-center border rounded-lg">
            <button 
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-4 py-2 text-center">{quantity}</span>
            <button 
              className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select time slot</option>
            <option value="morning">Morning (9 AM - 1 PM)</option>
            <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
            <option value="evening">Evening (5 PM - 9 PM)</option>
          </select>
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between mb-1">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{(price * quantity).toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-600">Tax</span>
          <span>₹{tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
          <span>Total</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        
        <button
          onClick={handleBookNow}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingSection;