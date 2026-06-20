"use client";

import { useState } from "react";
import { CreditCard, Eye, EyeOff, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CardDetails {
  id: string;
  type: string;
  provider: string;
  lastFour: string;
  expiry: string;
  cardHolderName: string;
  isDefault: boolean;
}

const CardDetailsPage = () => {
  const [cards, setCards] = useState<CardDetails[]>([
    {
      id: "1",
      type: "credit",
      provider: "Visa",
      lastFour: "1234",
      expiry: "12/25",
      cardHolderName: "John Doe",
      isDefault: true
    },
    {
      id: "2",
      type: "debit",
      provider: "Mastercard",
      lastFour: "5678",
      expiry: "08/26",
      cardHolderName: "John Doe",
      isDefault: false
    }
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    isDefault: false
  });

  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newCard.cardNumber || newCard.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!newCard.expiryDate || !/^\d{2}\/\d{2}$/.test(newCard.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    
    if (!newCard.cvv || ![3, 4].includes(newCard.cvv.length)) {
      newErrors.cvv = 'Please enter a valid CVV (3-4 digits)';
    }
    
    if (!newCard.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setNewCard({ ...newCard, [name]: formattedValue.substring(0, 19) });
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
      setNewCard({ ...newCard, [name]: formattedValue });
    } else if (name === 'cvv') {
      // Limit CVV to 4 digits
      setNewCard({ ...newCard, [name]: value.replace(/\D/g, '').substring(0, 4) });
    } else {
      setNewCard({ ...newCard, [name]: value });
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const lastFour = newCard.cardNumber.replace(/\s/g, '').slice(-4);
    const newCardObj: CardDetails = {
      id: Date.now().toString(),
      type: 'credit', // Could be determined by first digit of card number
      provider: getCardProvider(newCard.cardNumber), // Simplified
      lastFour,
      expiry: newCard.expiryDate,
      cardHolderName: newCard.cardHolderName,
      isDefault: newCard.isDefault || cards.length === 0
    };
    
    setCards([...cards, newCardObj]);
    
    // Reset form
    setNewCard({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolderName: '',
      isDefault: false
    });
    
    // Clear errors
    setErrors({});
  };

  const getCardProvider = (cardNumber: string): string => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5')) return 'Mastercard';
    if (num.startsWith('3')) return 'American Express';
    return 'Card';
  };

  const handleSetDefault = (id: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
  };

  const handleRemoveCard = (id: string) => {
    if (cards.length <= 1) return; // Prevent removing the last card
    
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <div className="">
      {/* <Header /> */}

      <main className="  ">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <h1 className="text-3xl font-bold mb-2">Add Card Details</h1>
              <p className="text-gray-500 mb-6">
                Enter your card details securely to complete the payment
              </p>
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
                <form onSubmit={handleAddCard} className="space-y-4">
                  {/* Card Name */}
                  <div>
                    <label className="text-sm text-gray-600">Card Name</label>
                    <input
                      type="text"
                      name="cardHolderName"
                      value={newCard.cardHolderName}
                      onChange={handleInputChange}
                      placeholder="Andrew Ainsley"
                      className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="text-sm text-gray-600">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={newCard.cardNumber}
                      onChange={handleInputChange}
                      placeholder="2672 4738 7837 7285"
                      className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
                      maxLength={19}
                    />
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={newCard.expiryDate}
                        onChange={handleInputChange}
                        placeholder="09/07/26"
                        className="w-full mt-1 text-xs p-3 border rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">CVV</label>
                      <input
                        type={showCvv ? "text" : "password"}
                        name="cvv"
                        value={newCard.cvv}
                        onChange={handleInputChange}
                        placeholder="699"
                        className="w-full mt-1 p-3 text-xs border rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-span-1 w-full">
              
                <div className="bg-white p-6 rounded-2xl shadow h-fit max-w-md ">
                  <h2 className="text-lg font-semibold mb-4">Amount Summary</h2>

                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Total Item (3)</span>
                      <span>₹1600</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total Discount</span>
                      <span className="text-gray-400">₹300</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>₹50</span>
                    </div>

                    <hr />

                    <div className="flex justify-between font-semibold text-black">
                      <span>Total Amount</span>
                      <span>₹1200</span>
                    </div>
                  </div>

                  <button className="w-full mt-5 py-3 rounded-full text-white font-semibold bg-orange-500">
                    Pay ₹1200
                  </button>

                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-500 text-center mt-3">
                      🔒 Safe & secure checkout
                    </p>
                    <img
                      src="/grp.png"
                      alt="Payment Methods"
                      className="w-40 mt-4"
                    />
                  </div>
                </div>
                <div className="flex px-9 py-3 mx-auto gap-3 w-full ">
                  <img
                    src="/tick.png"
                    alt="Payment Methods"
                    className="w-8 h-6"
                  />
                  <p className="text-sm font-bold text-[#666666] w-1/2">
                    Easy Cancellation/Returns, Background Verified Service
                    Provide.
                  </p>
                </div>
              
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default CardDetailsPage;
