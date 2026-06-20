import { useState, useRef, useEffect } from "react";
import { CheckCircle, Clock, Shield } from "lucide-react";

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onBack: () => void;
}

const OTPVerification = ({
  phoneNumber,
  onVerify,
  onResend,
  onBack,
}: OTPVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([
    null,
    null,
    null,
    null,
  ]);
  const [countdown, setCountdown] = useState<number>(30);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled]);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if current is filled
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      // Submit if all fields are filled
      if (newOtp.every((digit) => digit !== "") && newOtp.length === 4) {
        onVerify(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(30);
    setResendDisabled(true);
    setOtp(["", "", "", ""]);
    onResend();
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl md:shadow-lg">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Number
        </h2>
        <p className="text-gray-600">
          Enter the 4-digit code sent to{" "}
          <span className="font-medium">{phoneNumber}</span>
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={setInputRef(index)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="bg-white w-14 h-14 text-2xl text-center font-bold border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all shadow-sm"
            />
          ))}
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">OTP expires soon</p>
            <p className="text-sm text-blue-600">
              Please enter the code before it expires
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onBack}
          className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>

        <button
          onClick={handleResend}
          disabled={resendDisabled}
          className={`w-full py-3 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
            resendDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          Resend OTP {resendDisabled && countdown > 0 && `(${countdown}s)`}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
