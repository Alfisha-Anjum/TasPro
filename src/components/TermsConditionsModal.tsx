// "use client";

// import { X } from "lucide-react";
// import { useState } from "react";

// interface TermsConditionsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// export const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
// }) => {
//   const [accepted, setAccepted] = useState(false);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative max-h-96 flex flex-col">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
//         >
//           <X className="w-5 h-5 text-gray-600" />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 mb-4">
//           Terms & Conditions
//         </h2>

//         <div className="flex-grow overflow-y-auto mb-6 pr-4">
//           <div className="space-y-4 text-sm text-gray-700">
//             <h3 className="font-bold text-gray-900">1. Service Terms</h3>
//             <p>
//               By booking a service through our platform, you agree to these
//               terms and conditions. Our services are provided on an "as-is"
//               basis.
//             </p>

//             <h3 className="font-bold text-gray-900">2. Cancellation Policy</h3>
//             <p>
//               Services can be cancelled up to 4 hours before the scheduled time
//               for a full refund. Cancellations made within 4 hours will be
//               charged 50% of the service amount.
//             </p>

//             <h3 className="font-bold text-gray-900">
//               3. Warranty & Guarantees
//             </h3>
//             <p>
//               We provide a 30-day money-back guarantee if you are not satisfied
//               with our services. Additional warranty terms apply as per the
//               selected plan.
//             </p>

//             <h3 className="font-bold text-gray-900">4. User Responsibility</h3>
//             <p>
//               Users are responsible for providing accurate information during
//               booking. We are not liable for issues caused by incorrect address
//               or contact information.
//             </p>

//             <h3 className="font-bold text-gray-900">5. Payment Terms</h3>
//             <p>
//               All prices are inclusive of GST. We accept multiple payment
//               methods. Payment must be completed before service commencement.
//             </p>

//             <h3 className="font-bold text-gray-900">6. Limitation of Liability</h3>
//             <p>
//               TASPro Company shall not be liable for any indirect, incidental,
//               or consequential damages arising out of or in connection with your
//               use of our services.
//             </p>

//             <h3 className="font-bold text-gray-900">7. Governing Law</h3>
//             <p>
//               These terms and conditions are governed by the laws of India and
//               the jurisdiction of competent courts in Chhattisgarh.
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 mb-6 pb-4 border-t border-gray-200">
//           <input
//             type="checkbox"
//             id="accept"
//             checked={accepted}
//             onChange={(e) => setAccepted(e.target.checked)}
//             className="w-5 h-5 rounded cursor-pointer"
//           />
//           <label htmlFor="accept" className="font-semibold text-gray-900">
//             I Accept Terms & Conditions
//           </label>
//         </div>

//         <button
//           onClick={onConfirm}
//           disabled={!accepted}
//           style={{
//             backgroundColor: accepted ? "#FF6B00" : "#D1D5DB",
//           }}
//           className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [accepted, setAccepted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <div
          className="max-h-[75vh] overflow-y-auto "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h2>

          <div className="flex-grow overflow-y-auto mb-6 ">
            <div className="space-y-2 text-sm text-gray-700">
              <h3 className="font-bold text-gray-900">1. Service Terms</h3>
              <p>
                By booking a service through our platform, you agree to these
                terms and conditions. Our services are provided on an "as-is"
                basis.
              </p>

              <h3 className="font-bold text-gray-900">
                2. Cancellation Policy
              </h3>
              <p>
                Services can be cancelled up to 4 hours before the scheduled
                time for a full refund. Cancellations made within 4 hours will
                be charged 50% of the service amount.
              </p>

              <h3 className="font-bold text-gray-900">
                3. Warranty & Guarantees
              </h3>
              <p>
                We provide a 30-day money-back guarantee if you are not
                satisfied with our services. Additional warranty terms apply as
                per the selected plan.
              </p>

              <h3 className="font-bold text-gray-900">
                4. User Responsibility
              </h3>
              <p>
                Users are responsible for providing accurate information during
                booking. We are not liable for issues caused by incorrect
                address or contact information.
              </p>

              <h3 className="font-bold text-gray-900">5. Payment Terms</h3>
              <p>
                All prices are inclusive of GST. We accept multiple payment
                methods. Payment must be completed before service commencement.
              </p>

              <h3 className="font-bold text-gray-900">
                6. Limitation of Liability
              </h3>
              <p>
                TASPro Company shall not be liable for any indirect, incidental,
                or consequential damages arising out of or in connection with
                your use of our services.
              </p>

              <h3 className="font-bold text-gray-900">7. Governing Law</h3>
              <p>
                These terms and conditions are governed by the laws of India and
                the jurisdiction of competent courts in Chhattisgarh.
              </p>
            </div>
          </div>

          <div className="flex  gap-3 mb-6 pb-4">
            <label className="flex gap-3 cursor-pointer">
              {/* Hidden Native Checkbox */}
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="hidden"
              />

              {/* Custom Checkbox */}
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-md transition-all mt-1
        ${
          accepted
            ? "bg-gradient-to-r from-orange-500 to-orange-400"
            : "border border-gray-300 bg-white"
        }`}
              >
                {accepted && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Text */}
              <span className="text-sm ">
                I accept Company{" "}
                <span className="text-orange-500 font-medium">
                  Terms and Condition
                </span>{" "}
                to proceed further.
              </span>
            </label>
          </div>

          <button
            onClick={onConfirm}
            disabled={!accepted}
            style={{
              backgroundColor: accepted ? "#FF6B00" : "#D1D5DB",
            }}
            className="w-full text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
