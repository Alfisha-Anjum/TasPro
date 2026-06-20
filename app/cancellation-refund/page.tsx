// "use client";

// import { useEffect } from "react";

// const CancellationPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <main className="py-8 md:py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Heading */}
//           <div className="max-w-4xl mb-10">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
//               Cancellation & Refund
//             </h1>

//             <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7">
//               Our cancellation and refund policy outlines the terms under which
//               you can cancel services and receive refunds.
//             </p>
//           </div>

//           {/* Content */}
//           <div className="max-w-4xl space-y-8">
//             {/* Cancellation Policy */}
//             <section>
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//                 Cancellation Policy
//               </h2>

//               <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//                 <li>
//                   Free cancellation up to 2 hours before scheduled service
//                 </li>

//                 <li>50% refund for cancellations within 2 hours of service</li>

//                 <li>
//                   No refund for cancellations less than 1 hour before service
//                 </li>

//                 <li>Cancellations must be made through our app or website</li>
//               </ul>
//             </section>

//             {/* Refund Process */}
//             <section>
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//                 Refund Process
//               </h2>

//               <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//                 Refunds are processed within 5–7 business days to the original
//                 payment method. You will receive a confirmation email once the
//                 refund is initiated.
//               </p>
//             </section>

//             {/* Service Quality */}
//             <section>
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//                 Service Quality Issues
//               </h2>

//               <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//                 If you're not satisfied with the service quality, please contact
//                 our customer support within 24 hours for resolution or refund
//                 consideration.
//               </p>
//             </section>

//             {/* Special Circumstances */}
//             <section>
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//                 Special Circumstances
//               </h2>

//               <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//                 <li>Emergency cancellations due to unforeseen circumstances</li>

//                 <li>Service provider no-show situations</li>

//                 <li>Weather-related service disruptions</li>

//                 <li>Technical issues preventing service delivery</li>
//               </ul>
//             </section>

//             {/* Non Refundable */}
//             <section>
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//                 Non-Refundable Items
//               </h2>

//               <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//                 Certain services and materials may have different cancellation
//                 terms. These will be clearly communicated at the time of
//                 booking.
//               </p>
//             </section>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CancellationPage;

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const CancellationPage = () => {
  const [refundPolicy, setRefundPolicy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
 const res = await axios.get(
   "https://app.tasprocompany.in/api/customer-policies",
   {
     headers: {
       Accept: "application/json",
     },
   },
 );

      if (res.data?.status) {
        setRefundPolicy(res.data?.data?.refund_policy || "");
      }
    } catch (error) {
      console.error("Refund Policy Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-8">
            Cancellation & Refund Policy
          </h1>

          {loading ? (
            <div className="text-center py-10">Loading refund policy...</div>
          ) : (
            <div
              className="
                prose
                prose-lg
                max-w-none
                text-gray-700
                dark:text-gray-300
                leading-8
                [&_h1]:text-4xl
                [&_h1]:font-bold
                [&_h1]:mb-6
                [&_h2]:text-3xl
                [&_h2]:font-semibold
                [&_h2]:mt-8
                [&_h2]:mb-4
                [&_h3]:text-2xl
                [&_h3]:font-medium
                [&_h3]:mt-6
                [&_h3]:mb-3
                [&_p]:mb-4
                [&_ul]:list-disc
                [&_ul]:pl-6
                [&_ol]:list-decimal
                [&_ol]:pl-6
                [&_li]:mb-2
              "
              dangerouslySetInnerHTML={{
                __html: refundPolicy,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CancellationPage;