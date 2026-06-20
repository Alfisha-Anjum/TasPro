"use client";

import { useState } from "react";
import { Copy, Share2, Check, Gift, Users } from "lucide-react";
import { Modal } from "../Modals/Modal";
import { useToast } from "../../../hooks/use-toast";

interface ReferAndEarnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferAndEarnModal = ({ isOpen, onClose }: ReferAndEarnModalProps) => {
  const { toast } = useToast();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showRedeemPopup, setShowRedeemPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [totalCoins, setTotalCoins] = useState(1250);
  const referralLink = "https://yourapp.com/referral/abc123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard"
    });
  };

  const handleShare = (platform: string) => {
    // Implement sharing logic for different platforms
    toast({
      title: `Sharing on ${platform}`,
      description: "Share functionality would open here"
    });
    setShowSharePopup(false);
  };

  const handleRedeem = () => {
    setShowRedeemPopup(false);
    setShowSuccessPopup(true);
    // Add coins to wallet logic here
    setTimeout(() => {
      setShowSuccessPopup(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* Main Refer & Earn Modal */}
      <Modal isOpen={isOpen} onClose={onClose} title="Refer & Earn" size="md">
        <div className="space-y-6">
          {/* Coins Card */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center">
            <Gift className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{totalCoins} Coins</h3>
            <p className="text-orange-100">Total Earned</p>
          </div>

          {/* Refer Button */}
          <button
            onClick={() => setShowSharePopup(true)}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            Refer Friends
          </button>

          {/* Redeem Button */}
          <button
            onClick={() => setShowRedeemPopup(true)}
            className="w-full h-11 bg-white text-orange-600 font-semibold rounded-xl border-2 border-orange-500 hover:bg-orange-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Gift className="w-5 h-5" />
            Redeem Coins
          </button>
        </div>
      </Modal>

      {/* Share Popup */}
      <Modal isOpen={showSharePopup} onClose={() => setShowSharePopup(false)} title="Share Referral Link" size="sm">
        <div className="space-y-6">
          {/* Referral Link */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2">Your referral link:</p>
            <div className="flex items-center gap-2">
              <p className="flex-1 text-sm font-mono bg-white p-2 rounded-lg border">
                {referralLink}
              </p>
              <button
                onClick={handleCopyLink}
                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Social Sharing Options */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Share via:</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "WhatsApp", color: "bg-green-500" },
                { name: "Facebook", color: "bg-blue-600" },
                { name: "Twitter", color: "bg-sky-500" },
                { name: "Instagram", color: "bg-pink-500" },
                { name: "Email", color: "bg-gray-600" },
                { name: "SMS", color: "bg-orange-500" }
              ].map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShare(platform.name)}
                  className={`${platform.color} text-white p-3 rounded-xl font-medium hover:opacity-90 transition-opacity`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Redeem Popup */}
      <Modal isOpen={showRedeemPopup} onClose={() => setShowRedeemPopup(false)} title="Redeem Coins" size="sm">
        <div className="space-y-6">
          {/* Redeem Summary */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Coins</span>
              <span className="font-semibold">{totalCoins} coins</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-semibold">₹50</span>
            </div>
            <div className="border-t pt-4 flex justify-between">
              <span className="font-semibold">Final Amount</span>
              <span className="font-bold text-orange-600">₹{totalCoins - 50}</span>
            </div>
          </div>

          {/* Redeem Button */}
          <button
            onClick={handleRedeem}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
          >
            Redeem Now
          </button>
        </div>
      </Modal>

      {/* Success Popup */}
      <Modal isOpen={showSuccessPopup} onClose={() => {}} size="sm">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600">Coins redeemed successfully</p>
        </div>
      </Modal>
    </>
  );
};