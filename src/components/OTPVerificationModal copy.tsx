"use client";

import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (otp: string) => void;
}

export const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length === 4) {
      onConfirm(otpString);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Verify OTP
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the 4-digit OTP sent to your phone
        </p>

        <div className="flex gap-3 mb-6 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.join("").length !== 4}
          style={{
            backgroundColor:
              otp.join("").length === 4 ? "#FF6B00" : "#D1D5DB",
          }}
          className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
        >
          Verify OTP
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Didn't receive OTP?{" "}
          <button className="text-orange-600 font-semibold hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};
