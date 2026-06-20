// "use client";

// import { useEffect } from "react";
// import { Briefcase, Users, Award, TrendingUp } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const CareersPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const jobOpenings = [
//     {
//       title: "Senior Software Engineer",
//       department: "Engineering",
//       location: "Raipur, Chhattisgarh",
//       type: "Full-time",
//       experience: "3-5 years"
//     },
//     {
//       title: "Customer Support Executive",
//       department: "Operations",
//       location: "Raipur, Chhattisgarh",
//       type: "Full-time",
//       experience: "1-2 years"
//     },
//     {
//       title: "Marketing Specialist",
//       department: "Marketing",
//       location: "Raipur, Chhattisgarh",
//       type: "Full-time",
//       experience: "2-4 years"
//     },
//     {
//       title: "Field Service Technician",
//       department: "Operations",
//       location: "Raipur, Chhattisgarh",
//       type: "Full-time",
//       experience: "1-3 years"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <main className="flex-grow">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           {/* Hero Section */}
//           <div className="text-center mb-16">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Join Our Team
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Be part of India's fastest-growing home services platform. We're looking for passionate individuals who want to make a difference.
//             </p>
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
//             <div className="bg-white rounded-xl p-6 text-center shadow-lg">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Users className="w-6 h-6 text-orange-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
//               <p className="text-gray-600">Team Members</p>
//             </div>

//             <div className="bg-white rounded-xl p-6 text-center shadow-lg">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Briefcase className="w-6 h-6 text-orange-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">100+</h3>
//               <p className="text-gray-600">Services Offered</p>
//             </div>

//             <div className="bg-white rounded-xl p-6 text-center shadow-lg">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Award className="w-6 h-6 text-orange-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">5000+</h3>
//               <p className="text-gray-600">Happy Customers</p>
//             </div>

//             <div className="bg-white rounded-xl p-6 text-center shadow-lg">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <TrendingUp className="w-6 h-6 text-orange-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">50%</h3>
//               <p className="text-gray-600">Monthly Growth</p>
//             </div>
//           </div>

//           {/* Values Section */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl">🌟</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
//                 <p className="text-gray-600">We strive for perfection in everything we do, from code quality to customer service.</p>
//               </div>

//               <div className="text-center">
//                 <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl">🤝</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
//                 <p className="text-gray-600">Honesty and transparency guide our decisions and interactions with everyone.</p>
//               </div>

//               <div className="text-center">
//                 <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl">🚀</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
//                 <p className="text-gray-600">We embrace change and continuously seek better ways to serve our customers.</p>
//               </div>
//             </div>
//           </div>

//           {/* Job Openings */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Current Openings</h2>

//             <div className="space-y-6">
//               {jobOpenings.map((job, index) => (
//                 <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors">
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                     <div className="mb-4 md:mb-0">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
//                       <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                         <span className="flex items-center gap-1">
//                           <Briefcase className="w-4 h-4" />
//                           {job.department}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <span className="text-orange-500">📍</span>
//                           {job.location}
//                         </span>
//                         <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
//                           {job.experience}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                         {job.type}
//                       </span>
//                       <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
//                         Apply Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-12 text-center">
//               <p className="text-gray-600 mb-6">Don't see a position that fits? Send us your resume anyway!</p>
//               <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
//                 Send General Application
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CareersPage;
"use client";

import MissionSection from "@/components/about/MissionSection";
import CareerHeroSection from "@/components/CareerHeroSection";
import OpenPositions from "@/components/OpenPositions";
import WhatSetsUsApart from "@/components/WhatSetsUsApart";
import CoreValues from "@/components/about/CoreValues";
import BlogSlider from "@/components/ui/BlogSlider";
import GradientButton2 from "@/components/ui/GradientButton2";

export default function CareersPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-white dark:bg-gray-900 md:px-4">
      <CareerHeroSection />

      <div className="w-full max-w-[1240px] mx-auto">
        <OpenPositions />
      </div>

      {/* Image Section */}
      <div className="hidden lg:block w-full max-w-[1240px] mx-auto relative">
        <img src="/help.png" alt="" className="w-full" />
        <div className="absolute right-0 top-0">
          <img src="/careers.png" alt="" className="w-full" />
        </div>
      </div>

      <div className="w-full max-w-[1240px] mx-auto px-4">
        <MissionSection />
        <WhatSetsUsApart />
        <CoreValues />
      </div>

      <div className="w-full">
        <BlogSlider
          title="Our Blogs"
          subtitle="There are many variations of passages of Lorem Ipsum"
        />
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="p-[2px] rounded-xl bg-gradient-to-r from-[#FF512F] to-[#F09819] mt:4 md:mt-16 lg:mt-20">
          <div className="bg-white rounded-xl flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 py-8 md:py-12 gap-6">
            {/* Text */}
            <div className="gap-4 text-center md:text-left">
              <p className="text-2xl md:text-3xl font-semibold text-black">
                Join us on your journey
              </p>
              <p className="text-lg md:text-2xl text-gray-400 mt-2 lg:mt-6">
                Are you interested in being a part of it?
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-center md:justify-end items-center w-full md:w-auto">
              <GradientButton2
                text="Apply Now"
                width="w-full md:w-[180px]"
                type="button"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
