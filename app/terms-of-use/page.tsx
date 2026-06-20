// "use client";

// import { useEffect } from "react";

// const TermsPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="min-h-screen py-8 md:py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="max-w-4xl mb-10">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
//             Terms of Use
//           </h1>

//           <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7">
//             Welcome to TASPRO Company! These Terms of Use govern your access to
//             and use of our mobile application and related services
//             (collectively, the "App"). By accessing or using the App, you agree
//             to be bound by these Terms of Use.
//           </p>
//         </div>

//         {/* Content */}
//         <div className="max-w-4xl space-y-8">
//           {/* Acceptance */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Acceptance of Terms
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               By accessing or using the App, you represent and warrant that you
//               have read, understood, and agree to be bound by these Terms of
//               Use. If you do not agree to these terms, you must not use the App.
//             </p>
//           </section>

//           {/* User Accounts */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               User Accounts and Security
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               To access certain features of the App, you may be required to
//               create an account. You are responsible for maintaining the
//               confidentiality of your account information, including your
//               username and password. You are solely responsible for all
//               activities that occur under your account.
//             </p>
//           </section>

//           {/* User Conduct */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               User Conduct
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7 mb-4">
//               You agree to use the App in compliance with applicable laws and
//               regulations. You must not engage in activities that may:
//             </p>

//             <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               <li>Violate the rights of others</li>

//               <li>Be unlawful, fraudulent, or deceptive</li>

//               <li>
//                 Interfere with or disrupt the App's functionality or
//                 infrastructure
//               </li>

//               <li>Introduce viruses or malicious code</li>

//               <li>
//                 Collect or store personal data of other users without their
//                 consent
//               </li>

//               <li>
//                 Engage in any activity deemed inappropriate or objectionable
//               </li>
//             </ul>
//           </section>

//           {/* Third Party */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Third-Party Services and Links
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               The App may contain links or references to third-party websites or
//               services. These links are provided for your convenience, and we do
//               not endorse or assume any responsibility for the content or
//               practices of these third parties.
//             </p>
//           </section>

//           {/* Disclaimer */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Disclaimer of Warranties
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               The App is provided on an "as is" and "as available" basis,
//               without warranties of any kind, whether express, implied, or
//               statutory.
//             </p>
//           </section>

//           {/* Liability */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Limitation of Liability
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               To the maximum extent permitted by law, TASPRO Company and its
//               affiliates, officers, employees, and agents shall not be liable
//               for any indirect, incidental, special, consequential, or punitive
//               damages arising out of or in connection with your use of the App.
//             </p>
//           </section>

//           {/* Privacy */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Privacy Policy
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               Your privacy is important to us. Please refer to our Privacy
//               Policy, which explains how we collect, use, and disclose your
//               personal information when you use the App.
//             </p>
//           </section>

//           {/* Modifications */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Modifications and Termination
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               We reserve the right to modify, suspend, or terminate the App or
//               these Terms of Use at any time without prior notice.
//             </p>
//           </section>

//           {/* Governing Law */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Governing Law and Jurisdiction
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               These Terms of Use shall be governed by and construed in
//               accordance with the laws of the United States of America.
//             </p>
//           </section>

//           {/* Entire Agreement */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Entire Agreement
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               These Terms of Use constitute the entire agreement between TASPRO
//               Company and users regarding the use of the App.
//             </p>
//           </section>

//           {/* Contact */}
//           <section>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Contact Information
//             </h2>

//             <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-7">
//               If you have any questions or concerns about these Terms of Use,
//               please contact us at [Contact Information].
//             </p>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsPage;

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://app.tasprocompany.in/api";

const TermsPage = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
     const res = await axios.get(`${BASE_URL}/customer-policies`, {
       headers: {
         Accept: "application/json",
       },
     });

      if (res.data?.status) {
        console.log("POLICIES API:", res.data);
        setTerms(res.data.data?.terms_of_use || "");
      }
    } catch (error) {
      console.error("Policies Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Terms of Use
          </h1>
        </div>

        <div className="max-w-4xl">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div
              className="
        prose
        prose-lg
        max-w-none
        prose-headings:text-gray-900
        prose-p:text-gray-700
        prose-p:leading-8
        prose-li:text-gray-700
        prose-strong:text-gray-900
      "
              dangerouslySetInnerHTML={{
                __html: terms,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;