import AlternateNumberModal from "./AlternateNumberModal";
import { useState } from "react";

type CustomerDetailsProps = {
  address?: any;
  onChangeAddress?: () => void;
};

export default function CustomerDetails({
  address,
  onChangeAddress,
}: CustomerDetailsProps) {
  const [isAlternateModalOpen, setIsAlternateModalOpen] = useState(false);
  return (
    <div className="w-full my-6 bg-white border border-[#E1E1E1] rounded-xl p-3 md:p-5 mb-4">
      <div className="flex items-start sm:flex-row flex-col justify-between gap-4">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-[#1B1B1B]">
            Customer Details
          </h3>

          {address ? (
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <img src="/map.png" alt="Map" className="w-6 h-6 rounded-lg" />
                <p className="font-medium text-gray-800">
                  {address.full_name || "Customer Name"}
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {address.type || "Home"}
                  </span>
                </p>
              </div>

              <p className="text-sm text-gray-500 mt-1 px-6">
                {address.house_number}, {address.street},{" "}
                {address.city?.name || "Raipur"} {address.postal_code}
              </p>

              <p className="text-sm text-gray-500 mt-1 px-6">
                {address.contact_number}
              </p>
              <button
                onClick={() => setIsAlternateModalOpen(true)}
                className="text-md text-blue-600 mt-2 px-6 font-medium"
              >
                Add Alternate Number
              </button>
              {isAlternateModalOpen && (
                <AlternateNumberModal
                  isOpen={isAlternateModalOpen}
                  onClose={() => setIsAlternateModalOpen(false)}
                />
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-3">No address selected</p>
          )}
        </div>

        <button
          onClick={onChangeAddress}
          className="border border-orange-500 text-orange-500 px-4 py-1.5 rounded-lg text-sm whitespace-nowrap"
        >
          Change Address
        </button>
      </div>
    </div>
  );
}
