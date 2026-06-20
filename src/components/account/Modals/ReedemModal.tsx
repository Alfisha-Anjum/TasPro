"use client";

import GradientButton2 from "@/components/ui/GradientButton2";

type RedeemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const RedeemModal = ({ isOpen, onClose, onSuccess }: RedeemModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-[52px] p-6 shadow-lg">
        {/* Close Button */}
        <div className="absolute -top-1 -right-1 flex justify-end items-center w-full">
          <button
            onClick={onClose}
            className="relative w-[40px] h-[40px] overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[25px] h-[25px] bg-white"></div>
            </div>
            <img
              src="/cancel.png"
              alt="cancel"
              className="absolute inset-0 w-full h-full"
            />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-lg p-6">
          <h2 className="text-lg font-semibold text-black">Redeem Coins</h2>

          <div className="flex justify-between text-gray-500 text-lg">
            <span>Total Coins</span>
            <span className="text-black font-medium text-lg">453</span>
          </div>

          <div className="flex justify-between text-gray-500 text-lg">
            <span>14 Coins</span>
            <span className="text-black font-medium text-lg ">₹1</span>
          </div>

          <div className="flex justify-between text-gray-500 text-lg">
            <span>Service Fee</span>
            <span className="text-black font-medium text-lg">₹0</span>
          </div>

          <hr />

          <div className="flex justify-between font-semibold">
            <span className="bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent text-lg">
              Total
            </span>
            <span className="bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent text-lg">
              ₹20
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 items-center flex justify-center">
          <GradientButton2
            text="Redeem Coins"
            width="w-[200px]"
            onClick={onSuccess}
            className="disabled={totalCoins === 0}"
          />
        </div>
      </div>
    </div>
  );
};

export default RedeemModal;
