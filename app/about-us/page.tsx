// // "use client";

// // import { useEffect } from "react";
// // import { Check, Target, Users, Shield, Star, ArrowRight } from "lucide-react";
// // import Header from "@/components/Header";
// // import Footer from "@/components/Footer";

// // const AboutPage = () => {
// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   const coreValues = [
// //     {
// //       icon: <Shield className="w-8 h-8 text-orange-500" />,
// //       title: "Transparency",
// //       description: "Clear communication and honest dealings"
// //     },
// //     {
// //       icon: <Target className="w-8 h-8 text-orange-500" />,
// //       title: "Accountability",
// //       description: "Taking responsibility for our actions"
// //     },
// //     {
// //       icon: <Users className="w-8 h-8 text-orange-500" />,
// //       title: "Professionalism",
// //       description: "Maintaining highest professional standards"
// //     },
// //     {
// //       icon: <Star className="w-8 h-8 text-orange-500" />,
// //       title: "Quality Service",
// //       description: "Delivering exceptional service quality"
// //     },
// //     {
// //       icon: <Check className="w-8 h-8 text-orange-500" />,
// //       title: "One Stop Solution",
// //       description: "Complete solutions for all your needs"
// //     }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-white">
// //       <Header />

// //       <main className="flex-grow">
// //         {/* Breadcrumb/Title Section */}
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
// //           <h1 className="text-4xl md:text-5xl font-bold text-[#222] text-center">
// //             About Us
// //           </h1>
// //         </div>

// //         {/* About Company Section - Two Columns */}
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //           <div className="flex flex-col md:flex-row items-center gap-10">
// //             {/* LEFT CONTENT */}
// //             <div className="flex-1">
// //               <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-6">
// //                 About US
// //               </h2>
// //               <p className="text-lg text-[#555] mb-8 leading-relaxed">
// //                 Welcome to TAS Pro Company India Pvt Ltd, where innovation meets convenience and transforms the way you connect with service professionals. We deliver reliable and quality services tailored to modern needs.
// //               </p>

// //               <h3 className="text-2xl font-bold text-[#222] mb-6">
// //                 Why choose TAS Pro
// //               </h3>
// //               <div className="space-y-4">
// //                 {[
// //                   "We ensure peace of mind",
// //                   "We provide trusted and competitive pricing",
// //                   "We deliver professional service",
// //                   "We ensure safety and reliability",
// //                   "We provide quality assurance",
// //                   "We maintain customer satisfaction",
// //                   "We ensure experienced technicians"
// //                 ].map((item, index) => (
// //                   <div key={index} className="flex items-start gap-3">
// //                     <div className="flex-shrink-0 mt-1">
// //                       <Check className="w-5 h-5 text-green-500" />
// //                     </div>
// //                     <span className="text-[#555]">{item}</span>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="mt-12">
// //                 <h3 className="text-2xl font-bold text-[#222] mb-4">
// //                   Our Mission
// //                 </h3>
// //                 <p className="text-lg text-[#555] leading-relaxed">
// //                   Our mission is to provide seamless service solutions that simplify everyday life through technology and professional expertise.
// //                 </p>
// //               </div>
// //             </div>

// //             {/* RIGHT IMAGE */}
// //             <div className="flex-1 flex justify-center">
// //               <img
// //                 src="/Vector.jpg"
// //                 alt="Why Choose TAS Pro"
// //                 className="max-w-[420px] w-full object-contain"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Our Core Values Section */}
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
// //           <h2 className="text-3xl md:text-4xl font-bold text-[#222] text-center mb-16">
// //             Our Core Values
// //           </h2>

// //           <div className="relative">
// //             {/* Connecting Lines */}
// //             <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-orange-200 transform -translate-y-1/2 z-0"></div>
// //             <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-20 bg-orange-200 z-0"></div>

// //             <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
// //               {coreValues.map((value, index) => (
// //                 <div key={index} className="flex flex-col items-center text-center">
// //                   {/* Circular Icon Card */}
// //                   <div className="w-24 h-24 rounded-full border-4 border-orange-500 bg-white flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
// //                     {value.icon}
// //                   </div>
// //                   <h3 className="text-xl font-bold text-[#222] mb-2">
// //                     {value.title}
// //                   </h3>
// //                   <p className="text-sm text-[#555]">
// //                     {value.description}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* CTA Section */}
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
// //           <div className="bg-[#FFF4EC] rounded-3xl p-12 text-center">
// //             <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">
// //               Join us on your journey
// //             </h2>
// //             <p className="text-xl text-[#555] mb-8 max-w-2xl mx-auto">
// //               Are you interested in being a part of us?
// //             </p>
// //             <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
// //               Apply Now
// //               <ArrowRight className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default AboutPage;

// import AboutSection from "@/components/about/AboutSection";
// import CoreValues from "@/components/about/CoreValues";
// import MissionSection from "@/components/about/MissionSection";
// import GradientButton2 from "@/components/ui/GradientButton2";

// export default function AboutPage() {
//   return (
//     <div className="">
//       <AboutSection />
//       <MissionSection />
//       <CoreValues />
//       <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0">
//         <div className="p-[2px] rounded-xl bg-gradient-to-r from-[#FF512F] to-[#F09819] mt-16 md:mt-20">
//           <div className="bg-white rounded-xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 md:py-12 gap-6">
//             {/* Text */}
//             <div className="gap-4 text-center md:text-left">
//               <p className="text-2xl md:text-3xl font-semibold text-black">
//                 Join us on your journey
//               </p>
//               <p className="text-lg md:text-2xl text-gray-400 mt-2 md:mt-6">
//                 Are you interested in being a part of it?
//               </p>
//             </div>

//             {/* Button */}
//             <div className="flex justify-center md:justify-end items-center w-full md:w-auto">
//               <GradientButton2
//                 text="Apply Now"
//                 width="w-full md:w-[180px]"
//                 type="button"
//                 className="rounded-md"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AboutPage() {
  const [aboutUs, setAboutUs] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutUs();
    window.scrollTo(0, 0);
  }, []);

  const fetchAboutUs = async () => {
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
        setAboutUs(res.data?.data?.about_us || "");
      }
    } catch (error) {
      console.error("About Us Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
            About Us
          </h1>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div
              className="
                prose
                prose-lg
                max-w-none
                text-gray-700
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
                __html: aboutUs,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}