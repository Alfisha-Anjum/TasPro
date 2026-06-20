"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet, ArrowUpRight, ArrowDownLeft, History } from "lucide-react";
// import { AccountSidebar } from "@/components/account/AccountSidebar";
import AccountSidebar from "@/components/account/AccountSidebar";

const WalletPage = () => {
  const router = useRouter();
  const transactions = [
    { id: 1, type: "debit", title: "AC Repair Service", date: "12 Mar 2024", amount: 450 },
    { id: 2, type: "credit", title: "Refund: Booking #123", date: "10 Mar 2024", amount: 1200 },
    { id: 3, type: "debit", title: "Plumbing Service", date: "05 Mar 2024", amount: 350 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Wallet</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <AccountSidebar />
          </div>
          <div className="flex-1">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-orange-100 text-sm font-medium">Total Balance</p>
                  <h2 className="text-3xl font-bold">₹2,450.00</h2>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-white text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
                  Add Money
                </button>
                <button className="flex-1 bg-orange-700/50 text-white py-3 rounded-xl font-semibold hover:bg-orange-700/70 transition-colors">
                  Withdraw
                </button>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-gray-500" />
                  Recent Transactions
                </h3>
                <button className="text-orange-600 text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.title}</p>
                        <p className="text-sm text-gray-500">{tx.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;