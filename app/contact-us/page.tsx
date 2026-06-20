// "use client";

// import { useEffect } from "react";
// import { Phone, Mail, MapPin, Clock } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const ContactPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="flex-grow">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//             <div className="grid grid-cols-1 lg:grid-cols-2">
//               {/* Contact Information */}
//               <div className="p-8 md:p-12">
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
//                   Contact Us
//                 </h1>

//                 <div className="space-y-8">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                       <Phone className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Phone
//                       </h3>
//                       <p className="text-gray-600">7447-0000-45</p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         Mon-Sat: 8:00 AM - 8:00 PM
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                       <Mail className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Email
//                       </h3>
//                       <p className="text-gray-600">info@taspro.in</p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         We'll respond within 24 hours
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                       <MapPin className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Office Address
//                       </h3>
//                       <p className="text-gray-600">
//                         Office No. 201, Atlantis Corporate Park
//                         <br />
//                         Ring Road No.1, Telibandha
//                         <br />
//                         Raipur, Chhattisgarh 492001
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                       <Clock className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Business Hours
//                       </h3>
//                       <p className="text-gray-600">
//                         Monday - Saturday: 8:00 AM - 8:00 PM
//                         <br />
//                         Sunday: 9:00 AM - 6:00 PM
//                         <br />
//                         Holidays: As per government calendar
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Form */}
//               <div className="bg-gray-50 p-8 md:p-12">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Send us a Message
//                 </h2>

//                 <form className="space-y-6">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="Enter your full name"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="Enter your email"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="Enter your phone number"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="subject"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Subject
//                     </label>
//                     <select
//                       id="subject"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                     >
//                       <option>Select a subject</option>
//                       <option>General Inquiry</option>
//                       <option>Service Complaint</option>
//                       <option>Billing Issue</option>
//                       <option>Feedback</option>
//                       <option>Partnership Opportunity</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="message"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                     >
//                       Message
//                     </label>
//                     <textarea
//                       id="message"
//                       rows={5}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="Enter your message"
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ContactPage;
"use client";

export default function ContactPage() {
  return (
    <div className="py-8 md:py-12">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
            Contact Us
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7 max-w-4xl">
            We're here to assist you! If you have any questions, concerns, or
            need further assistance, please don't hesitate to reach out to us.
            Our dedicated support team is ready to help and provide the guidance
            you need. Whether you have inquiries about our services, suggestions
            for improvement, or require technical support, we're just a message
            away. Your satisfaction is our priority, and we are committed to
            ensuring a seamless experience for you on TASPRO Company.
          </p>
        </div>

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-10 items-stretch">
          {/* CHAT CARD */}
          <div className="h-full p-5 sm:p-6 flex gap-4">
            {/* Icon */}
            <div className="min-w-10 w-10 h-10 rounded-xl bg-[#FEECE7] flex items-center justify-center">
              <img
                src="/message.png"
                alt="chat"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                Chat to us
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Our friendly team is here to help.
              </p>

              <p className="text-sm sm:text-base text-gray-900 dark:text-white mt-3 break-words">
                help@tasprocompany.app
              </p>
            </div>
          </div>

          {/* PHONE CARD */}
          <div className="h-full p-5 sm:p-6 flex gap-4 dark:bg-gray-800 rounded-lg">
            {/* Icon */}
            <div className="min-w-10 w-10 h-10 rounded-xl bg-[#FEECE7] flex items-center justify-center">
              <img
                src="/phone.png"
                alt="phone"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                Phone
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Mon – Fri from 8am to 5pm
              </p>

              <p className="text-sm sm:text-base text-gray-900 dark:text-white mt-3">
                +1 (555) 000-0000
              </p>
            </div>
          </div>
        </div>

        {/* SOCIAL SECTION */}
        <div className="p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Social Links
          </h2>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">
            Follow us on social media
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src="/facebook.png"
              alt="facebook"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full cursor-pointer hover:scale-110 transition"
            />

            <img
              src="/twitter2.png"
              alt="twitter"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full cursor-pointer hover:scale-110 transition"
            />

            <img
              src="/linkedin.png"
              alt="linkedin"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full cursor-pointer hover:scale-110 transition"
            />

            <img
              src="/instagram.png"
              alt="instagram"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full cursor-pointer hover:scale-110 transition"
            />

            <img
              src="/threat.png"
              alt="threads"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
