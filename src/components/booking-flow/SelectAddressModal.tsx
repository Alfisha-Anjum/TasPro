// "use client";

// import { X, MapPin, Plus } from "lucide-react";
// import { useState } from "react";

// interface Address {
//   id: string;
//   name: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface SelectAddressModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onContinue: (address: Address) => void;
//   onAddNew: () => void;
// }

// const savedAddresses: Address[] = [
//   {
//     id: "1",
//     name: "Home",
//     phone: "9876543210",
//     address: "123 Main Street, Apt 4B",
//     city: "Raipur",
//     state: "Chhattisgarh",
//     pincode: "492001",
//   },
//   {
//     id: "2",
//     name: "Office",
//     phone: "9876543210",
//     address: "456 Business Complex, Floor 5",
//     city: "Raipur",
//     state: "Chhattisgarh",
//     pincode: "492002",
//   },
// ];

// export const SelectAddressModal: React.FC<SelectAddressModalProps> = ({
//   isOpen,
//   onClose,
//   onContinue,
//   onAddNew,
// }) => {
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   if (!isOpen) return null;

//   const handleContinue = () => {
//     if (selectedId) {
//       const selected = savedAddresses.find((a) => a.id === selectedId);
//       if (selected) onContinue(selected);
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
//           Select Delivery Address
//         </h2>

//         <div className="space-y-3 mb-6">
//           {savedAddresses.map((address) => (
//             <div
//               key={address.id}
//               className="p-4 border-2 rounded-xl cursor-pointer transition-all"
//               style={{
//                 borderColor:
//                   selectedId === String(address.id) ? "#FF6B00" : "#E5E7EB",
//                 backgroundColor:
//                   selectedId === String(address.id) ? "#FFF4E6" : "transparent",
//               }}
//               onClick={() => setSelectedId(address.id)}
//             >
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
//                 <div className="flex-grow">
//                   <h3 className="font-bold text-gray-900">{address.name}</h3>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {address.address}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {address.city}, {address.state} {address.pincode}
//                   </p>
//                   <p className="text-sm text-gray-600">{address.phone}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={onAddNew}
//           className="w-full flex items-center justify-center gap-2 p-3 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors mb-4"
//         >
//           <Plus className="w-5 h-5 text-gray-600" />
//           <span className="font-semibold text-gray-900">Add New Address</span>
//         </button>

//         <button
//           onClick={handleContinue}
//           disabled={!selectedId}
//           style={{
//             backgroundColor: selectedId ? "#FF6B00" : "#D1D5DB",
//           }}
//           className="w-full text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

"use client";

import { X, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import AddNewAddressModal from "../AddNewAddressModal";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface SelectAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (address: Address) => void;
  onAddNew: () => void;
  addresses: any[];
}

const savedAddresses: Address[] = [
  {
    id: "1",
    name: "Home",
    phone: "9876543210",
    address: "123 Main Street, Apt 4B",
    city: "Raipur",
    state: "Chhattisgarh",
    pincode: "492001",
  },
  {
    id: "2",
    name: "Office",
    phone: "9876543210",
    address: "456 Business Complex, Floor 5",
    city: "Raipur",
    state: "Chhattisgarh",
    pincode: "492002",
  },
];

export const SelectAddressModal: React.FC<SelectAddressModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  onAddNew,
  addresses,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleContinue = () => {
    const selected = addresses.find((a) => String(a.id) === selectedId);
    if (selected) onContinue(selected);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[28px] w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Address List */}
        <div className="space-y-5 mb-5">
          {addresses?.map((address) => (
            <div
              key={address.id}
              onClick={() => setSelectedId(String(address.id))}
              className="flex items-start gap-3 cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                  selectedId === String(address.id)
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
              >
                {selectedId === String(address.id) && (
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                )}
              </div>

              {/* Address Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">
                    {address.full_name}
                  </p>

                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    {address.type}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1 leading-snug">
                  {address.house_number}, {address.street}, {address.city?.name}
                  , {address.state?.name}, {address.postal_code}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {address.contact_number}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add New */}
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 text-orange-500 font-medium mb-6"
        >
          <Plus className="w-4 h-4" />
          Add a new address
        </button>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedId}
          className="w-full py-3 rounded-full text-white font-semibold"
          style={{
            background: selectedId
              ? "linear-gradient(90deg, #FF6B00, #FFA500)"
              : "#D1D5DB",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
