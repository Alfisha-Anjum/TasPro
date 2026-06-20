"use client";

import { Modal } from "@/components/account/Modals/Modal";
import { Gift, Share2, Copy } from "lucide-react";

interface ReferEarnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferEarnModal = ({ isOpen, onClose }: ReferEarnModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Refer & Earn">
      <div className="text-center">
        <div className="bg-orange-50 rounded-2xl p-6 mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-10 h-10 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Earn ₹500</h3>
          <p className="text-gray-600 text-sm">
            Refer your friends and earn coins when they complete their first service.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center justify-between border border-gray-200">
          <div className="text-left">
            <p className="text-xs text-gray-500 uppercase font-medium">Your Referral Code</p>
            <p className="text-lg font-bold text-gray-900 tracking-wider">TASPRO2024</p>
          </div>
          <button className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors">
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-2xl font-bold text-orange-600">1,250</p>
            <p className="text-xs text-gray-500">Total Coins</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-2xl font-bold text-green-600">₹250</p>
            <p className="text-xs text-gray-500">Value</p>
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 shadow-md">
          <Share2 className="w-5 h-5" />
          Share with Friends
        </button>
        
        <button className="w-full mt-3 py-3 border border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all">
          Redeem Coins
        </button>
      </div>
    </Modal>
  );
};

// Default export for page routing if needed, though mostly used as modal
const ReferEarnPage = () => {
  return <div className="p-8 text-center">Please open this as a modal from Account page.</div>;
};

export default ReferEarnPage;