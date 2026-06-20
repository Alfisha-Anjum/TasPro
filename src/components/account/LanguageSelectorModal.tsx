// "use client";

// import React, { useState } from "react";
// import Modal from "./Modal";
// import { Check } from "lucide-react";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const LanguageSelectorModal: React.FC<Props> = ({ isOpen, onClose }) => {
//   const [selectedLang, setSelectedLang] = useState("English");
//   const languages = ["English", "Hindi", "Marathi", "Gujarati", "Bengali"];

//   return (
//     <Modal open={isOpen} onClose={onClose} title="Select Language">
//       <div className="space-y-2">
//         {languages.map((lang) => (
//           <button
//             key={lang}
//             onClick={() => setSelectedLang(lang)}
//             className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
//               selectedLang === lang
//                 ? "border-orange-500 bg-orange-50 text-orange-700"
//                 : "border-gray-200 hover:border-orange-200 hover:bg-gray-50"
//             }`}
//           >
//             <span className="font-medium">{lang}</span>
//             {selectedLang === lang && <Check className="w-5 h-5 text-orange-600" />}
//           </button>
//         ))}

//         <button
//           onClick={onClose}
//           className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
//         >
//           Save Changes
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default LanguageSelectorModal;
"use client";

import React, { useState } from "react";
import { Check, ChevronDown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import GradientButton2 from "../ui/GradientButton2";

type Props = {
  setActiveView: (view: string) => void;
};

const languages = [
  { name: "English", flag: "/flags/English.png" },
  { name: "Hindi", flag: "/flags/india.png" },
  // { name: "Chinese", flag: "/flags/Chinese.png" },
  // { name: "Spanish", flag: "/flags/Spanish.png" },
  // { name: "Italian", flag: "/flags/Italian.png" },
  // { name: "Urdu", flag: "/flags/Urdu.png" },
  // { name: "Arabic", flag: "/flags/Arabic.png" },
  // { name: "German", flag: "/flags/German.png" },
  // { name: "Russian", flag: "/flags/Russian.png" },
];

const LanguageSelectorPage: React.FC<Props> = ({ setActiveView }) => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="w-full flex justify-between items-center mb-6 md:hidden">
        {/* Back */}
        <button
          onClick={() => setActiveView("default")}
          className="text-black dark:text-white font-medium flex items-center gap-2 hover:text-orange-500 transition"
        >
          <ArrowLeft size={20} />
          Change Language
        </button>
      </div>

      <h2 className="hidden md:block md:text-[18px] md:text-[#1B1B1B] dark:text-white md:font-semibold md:mb-6">
        Change Language
      </h2>

      {/* Dropdown */}
      <div className="relative md:w-[390px] max-w-md">
        {/* Gradient Border Wrapper */}
        <div className="p-[1px] rounded-xl bg-gradient-to-r from-[#FF512F] to-[#F09819]">
          {/* Actual Content */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between p-4 rounded-xl bg-white cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Image
                src={selectedLang.flag}
                alt={selectedLang.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-black text-[16px]">
                {selectedLang.name}
              </span>
            </div>

            <ChevronDown className="w-5 h-5 text-black" />
          </div>
        </div>
        {/* Options */}
        {open && (
          <div className="absolute w-full mt-2 bg-white border rounded-xl shadow-md z-10">
            {languages.map((lang) => (
              <div
                key={lang.name}
                onClick={() => {
                  setSelectedLang(lang);
                  setOpen(false);
                }}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-[#666666] text-[16px]">
                    {lang.name}
                  </span>
                </div>

                {selectedLang.name === lang.name && (
                  <Check className="w-5 h-5 text-orange-500" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save */}
      {/* <button
        onClick={() => setActiveView("settings")}
        className="w-full max-w-md mt-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl"
      >
        Save Changes
      </button> */}

      <GradientButton2
        text="Save Changes"
        width="md:w-[390px] max-w-md"
        onClick={() => setActiveView("settings")}
        className="mt-6 py-3 text-white font-semibold"
      />
    </div>
  );
};

export default LanguageSelectorPage;
