"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { BankAccountModal } from "@/components/account/Modals/BankAccountModal";
import axios from "axios";
import { useEffect } from "react";

type Props = {
  setActiveView: (view: string) => void;
};

export default function SavedPayments({ setActiveView }: Props) {
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]);

  const fetchBankDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://app.tasprocompany.in/api/customers/customer-bank-details",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.status) {
        const formattedCards = res.data.data.map((item: any) => ({
          id: item.id,
          bank: item.bank_name,
          number: String(item.account_number).slice(-4),
          type: "BANK",
        }));

        setCards(formattedCards);
      }
    } catch (error) {
      console.log("Failed to fetch bank details", error);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  return (
    <div className="md:min-h-screen flex flex-col">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 shadow-sm">
        <div className="w-full flex justify-between items-center mb-6 md:hidden">
          {/* Back */}
          <button
            onClick={() => setActiveView("default")}
            className="text-black dark:text-white font-medium flex items-center gap-2 hover:text-orange-500 transition"
          >
            <ArrowLeft size={20} />
            Saved Payment Methods
          </button>
        </div>
        <h2 className="hidden md:block text-base dark:text-white sm:text-lg font-semibold">
          Saved Payment Methods
        </h2>
      </div>

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-6xl mx-auto">
        {/* SAVED CARDS */}
        <div className="lg:px-8 py-4">
          <h2 className="text-gray-700 dark:text-gray-200 font-medium mb-3 text-sm sm:text-base">
            Saved Cards
          </h2>

          {/* MOBILE → scroll | DESKTOP → grid */}
          <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {cards.map((card, index) => (
              <div
                key={card.id || index}
                className="min-w-[260px] lg:min-w-0 rounded-2xl p-5 text-white 
    bg-gradient-to-r from-teal-400 to-teal-700 shadow 
    flex flex-col justify-between"
              >
                <p className="text-sm opacity-90">{card.bank}</p>

                <p className="text-lg tracking-widest mt-6">
                  XXXX XXXX XXXX {card.number}
                </p>

                <div className="flex justify-end mt-6">
                  <span className="bg-white text-blue-700 text-xs px-3 py-1 rounded-md font-semibold">
                    {card.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPI */}
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-gray-700 dark:text-gray-200 font-medium mb-3 text-sm sm:text-base">
            UPI
          </h2>

          {/* MOBILE → scroll | DESKTOP → grid */}
          <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
            {/* ITEM */}
            <div className="min-w-[260px] sm:min-w-0 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>

              <div>
                <p className="font-medium text-sm sm:text-base">PhonePe UPI</p>
                <p className="text-sm text-gray-500">tikeshdwgn1@ybl</p>
              </div>
            </div>

            {/* ITEM */}
            <div className="min-w-[260px] sm:min-w-0 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>

              <div>
                <p className="font-medium text-sm sm:text-base">PhonePe</p>
                <p className="text-sm text-gray-500">964xxxxxxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="shadow-inner">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-3">
          <button className="w-full sm:w-1/2 border border-orange-500 text-orange-500 py-3 rounded-full font-medium">
            Remove Bank Account
          </button>

          <button
            onClick={() => setIsBankModalOpen(true)}
            className="w-full sm:w-1/2 bg-orange-500 text-white py-3 rounded-full font-semibold"
          >
            Add New Bank Account
          </button>
        </div>
      </div>
      <BankAccountModal
        isOpen={isBankModalOpen}
        onClose={() => {
          setIsBankModalOpen(false);
          fetchBankDetails();
        }}
      />
    </div>
  );
}
