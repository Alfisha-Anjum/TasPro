"use client";

import { Check } from "lucide-react";

interface RedeemSuccessModalProps {
  isSuccessOpen: boolean;
  onClose: () => void;
}

const RedeemSuccessModal = ({
  isSuccessOpen,
  onClose,
}: RedeemSuccessModalProps) => {
  if (!isSuccessOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-6"
    >
      <div className="bg-white rounded-[52px] w-[400px] h-[450px] flex flex-col justify-center items-center relative">
        {/* CONTENT */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="block relative w-32 h-32 md:w-[186px] md:h-[180px] overflow-hidden">
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-[140px] md:h-[140px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full flex items-center justify-center">
              <div className="w-12 h-12 md:w-[72px] md:h-[72px] flex items-center justify-center">
                <div className="w-10 h-10 md:w-[60px] md:h-[60px] bg-white rounded-xl flex items-center justify-center">
                  <Check className="text-[#FF552C] w-4 h-4 md:w-8 md:h-8 stroke-[4]" />
                </div>
              </div>
            </div>

            {/* Dots */}
            <span className="absolute w-[20px] h-[20px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full left-[10px] top-[0px]"></span>
            <span className="absolute w-[5px] h-[5px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full top-[2px] left-[104px]"></span>
            <span className="absolute w-[15px] h-[15px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full top-[20px] left-[171px]"></span>
            <span className="absolute w-[5px] h-[5px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full top-[108px] left-[168px]"></span>
            <span className="absolute w-[5px] h-[5px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full top-[158px] left-[163px]"></span>
            <span className="absolute w-[7px] h-[7px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full top-[173px] left-[59px]"></span>
            <span className="absolute w-[2px] h-[2px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full top-[170px] left-[121px]"></span>
            <span className="absolute w-[10px] h-[10px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full top-[128px] left-[5px]"></span>
          </div>
          {/* Title */}
          <h2 className="text-[26px] font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
            Successfully Redeem Coins
          </h2>

          {/* Subtitle */}
          <p className="text-[#898989] text-[16px] max-w-[400px]">
            You have redeem your coins successfully, Invite more friends to earn
            more coins.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RedeemSuccessModal;
