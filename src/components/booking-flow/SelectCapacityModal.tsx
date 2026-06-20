// "use client";

// import { X } from "lucide-react";
// import { useState } from "react";

// interface SelectCapacityModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onContinue: (capacity: string) => void;
// }

// const capacities = [
//   { capacity: "1 Ton", price: 3500 },
//   { capacity: "1.5 Ton", price: 4200 },
//   { capacity: "2 Ton", price: 5000 },
//   { capacity: "2.5 Ton", price: 5800 },
// ];

// export const SelectCapacityModal: React.FC<SelectCapacityModalProps> = ({
//   isOpen,
//   onClose,
//   onContinue,
// }) => {
//   const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
//   const [customCapacity, setCustomCapacity] = useState("");

//   if (!isOpen) return null;

//   const handleContinue = () => {
//     if (selectedCapacity || customCapacity) {
//       onContinue(customCapacity || selectedCapacity!);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-96 overflow-y-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
//         >
//           <X className="w-5 h-5 text-gray-600" />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Select AC Capacity
//         </h2>

//         <div className="space-y-3 mb-6">
//           {capacities.map((item) => (
//             <div
//               key={item.capacity}
//               className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all"
//               style={{
//                 borderColor:
//                   selectedCapacity === item.capacity ? "#FF6B00" : "#E5E7EB",
//                 backgroundColor:
//                   selectedCapacity === item.capacity
//                     ? "#FFF4E6"
//                     : "transparent",
//               }}
//               onClick={() => {
//                 setSelectedCapacity(item.capacity);
//                 setCustomCapacity("");
//               }}
//             >
//               <span className="font-semibold text-gray-900">
//                 {item.capacity}
//               </span>
//               <div className="flex items-center gap-3">
//                 <span className="text-green-600 font-bold">₹{item.price}</span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedCapacity(item.capacity);
//                     setCustomCapacity("");
//                   }}
//                   style={{ backgroundColor: "#FF6B00" }}
//                   className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Manual Capacity Input
//           </label>
//           <input
//             type="text"
//             placeholder="Enter custom capacity"
//             value={customCapacity}
//             onChange={(e) => {
//               setCustomCapacity(e.target.value);
//               if (e.target.value) setSelectedCapacity(null);
//             }}
//             className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
//           />
//         </div>

//         <button
//           onClick={handleContinue}
//           disabled={!selectedCapacity && !customCapacity}
//           style={{
//             backgroundColor:
//               selectedCapacity || customCapacity ? "#FF6B00" : "#D1D5DB",
//           }}
//           className="w-full text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
//         >
//           Done
//         </button>
//       </div>
//     </div>
//   );
// };

"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface SelectCapacityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (capacity: string) => void;
}

const capacities = [
  { capacity: "1.0 TON (Split AC)", price: 1050, oldPrice: 1250 },
  { capacity: "1.5 TON (Split AC)", price: 1050, oldPrice: 1250 },
  { capacity: "2.0 TON (Split AC)", price: 1050, oldPrice: 1250 },
  { capacity: "2.5 TON (Split AC)", price: 1050, oldPrice: 1250 },
];

export const SelectCapacityModal: React.FC<SelectCapacityModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [manual, setManual] = useState("");
  const [qty, setQty] = useState(1);

  if (!isOpen) return null;

  const handleDone = () => {
    if (selected || manual) {
      onContinue(manual || selected!);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[28px] w-full max-w-sm p-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[75vh] overflow-y-auto pr-1">
          {/* Title */}
          <h2 className="text-lg font-semibold text-center text-gray-900 mb-5">
            Select Split AC Capacity
          </h2>

          {/* Capacity List */}
          <div className="space-y-4">
            {capacities.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/ac.png" // replace with your image
                    alt="AC"
                    width={55}
                    height={55}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.capacity}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-semibold text-gray-900">
                        ₹{item.price}
                      </span>
                      <span className=" text-gray-400">
                        ₹{item.oldPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelected(item.capacity);
                    setManual("");
                  }}
                  className={`px-6 py-1 rounded-lg text-sm font-medium border transition-all
                    ${
                      selected === item.capacity
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-orange-500 text-orange-500 bg-white"
                    }`}
                >
                  Add
                </button>
              </div>
            ))}
          </div>

          {/* Manual Input */}
          <div className="mt-6 border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="radio"
                checked={!!manual}
                onChange={() => setSelected(null)}
                className="accent-orange-500"
              />
              <p className="text-sm text-gray-700">
                Enter Capacity manually (in TR)
              </p>
            </div>

            <div className="flex items-center justify-between">
              <input
                type="text"
                value={manual}
                onChange={(e) => {
                  setManual(e.target.value);
                  if (e.target.value) setSelected(null);
                }}
                className="w-20 text-center border border-orange-500 rounded-md py-1 text-sm outline-none"
              />

              <div className="text-right">
                <p className="font-semibold text-gray-900">₹299</p>
                <p className="text-xs text-gray-400 ">₹350</p>
              </div>

              <div className="flex items-center border border-orange-500 rounded-md overflow-hidden px-3">
                <button
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="  text-orange-500"
                >
                  −
                </button>
                <span className="px-3 text-sm">{qty}</span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="  text-orange-500"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Done Button */}
          <button
            onClick={handleDone}
            className="w-full mt-6 py-3 rounded-full text-white font-semibold"
            style={{
              background: "linear-gradient(90deg, #FF6B00, #FFA500)",
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};