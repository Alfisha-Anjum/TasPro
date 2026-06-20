"use client";

import { useState } from "react";
import { Modal } from "@/components/account/Modals/Modal";
import { Check } from "lucide-react";

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguageSelectorModal = ({ isOpen, onClose }: LanguageSelectorModalProps) => {
  const [selectedLang, setSelectedLang] = useState("English");
  const languages = ["English", "Hindi", "Marathi", "Gujarati", "Bengali"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Language">
      <div className="space-y-2">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
              selectedLang === lang
                ? "border-orange-500 bg-orange-50 text-orange-700"
                : "border-gray-200 hover:border-orange-200 hover:bg-gray-50"
            }`}
          >
            <span className="font-medium">{lang}</span>
            {selectedLang === lang && <Check className="w-5 h-5 text-orange-600" />}
          </button>
        ))}
        
        <button 
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

const LanguagePage = () => {
  return <div className="p-8 text-center">Please open this as a modal from Account page.</div>;
};
export default LanguagePage;