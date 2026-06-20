import { Check } from "lucide-react";

export default function SuccessCard() {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center sm:items-center mt-5 gap-4 sm:gap-6">
      <div className="block relative w-28 h-28 sm:w-32 sm:h-32 md:w-[186px] md:h-[180px] overflow-hidden shrink-0">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-[140px] md:h-[140px] bg-gradient-to-r from-[#FEC12D] to-[#FF552C] rounded-full flex items-center justify-center">
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
      <div className="w-full md:w-[310px] text-center sm:text-left">
        <h2 className="text-[18px] sm:text-lg md:text-xl font-semibold text-orange-500">
          Order Confirmed
        </h2>
        <p className="text-[16px] md:text-base text-gray-500 mt-1">
          Your request has been sent successfully. You will receive a
          notification.
        </p>
      </div>
    </div>
  );
}
