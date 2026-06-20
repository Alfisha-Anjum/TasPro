"use client";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

type Props = {
  setActiveView: (view: string) => void;
};

export default function MyWallet({ setActiveView }: Props) {
  const transactions = Array(8).fill({
    name: "Jane Cooper",
    phone: "091000093331",
    amount: "₹280",
    date: "Nov,25,2022",
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-2 md:gap-20 px-2 lg:px-8 w-full">
      {/* Transactions */}
      <div className="flex-1 w-full max-w-[392px]">
        <h2 className="text-[18px] font-semibold text-black dark:text-white mb-4">
          Transactions
        </h2>

        <div className="space-y-4">
          {transactions.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF512F] to-[#F09819] rounded-full flex items-center justify-center">
                  <img src="/credit-card 1.png" alt="" />
                </div>

                <div>
                  <p className="text-[16px] text-[#1B1B1B] dark:text-gray-200 font-medium">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-[#666666] dark:text-gray-400">
                    {item.phone}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[16px] text-[#1B1B1B] dark:text-gray-200  font-medium">
                  {item.amount}
                </p>
                <p className="text-[10px] text-[#666666] dark:text-gray-400">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Card */}
      <div className="w-full max-w-[390px] h-[200px] mx-auto mb-4">
        <div className="relative h-[200px] bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white rounded-2xl p-4">
          {/* 🔹 Content (Left) */}
          <div className="z-10 relative">
            <p className="text-[16px] md:text-[20px]">My Wallet</p>
            <p className="text-[16px] md:text-[20px] md:mt-3">Balance</p>

            <h2 className="text-[28px] md:text-[32px] font-semibold">
              ₹ 12,500.35
            </h2>

            <button
              onClick={() => setActiveView("settings")}
              className="mt-3 text-xs bg-white text-orange-600 px-3 py-1 rounded-full"
            >
              Instant Withdrawal
            </button>
          </div>

          {/* 🔹 Right Image */}
          <div className="absolute right-0 md:right-2 bottom-8 md:bottom-10">
            <img
              src="/walletimg.png" // apna image path
              alt="wallet"
              className="w-[150px] h-[100px] md:w-[205px] md:h-[123px] object-contain"
            />
          </div>

          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full border-[3px] border-white bg-gradient-to-r from-[#FF512F] to-[#F09819] flex items-center justify-center shadow-lg">
            <img src="/Bankicon.png" alt="icon" className="w-6 h-4" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center mb-6 md:hidden">
        {/* Back */}
        <button
          onClick={() => setActiveView("default")}
          className="text-black dark:text-white font-medium flex items-center gap-2 hover:text-orange-500 transition"
        >
          <ArrowLeft size={20} />
          My Wallet
        </button>
      </div>
    </div>
  );
}
