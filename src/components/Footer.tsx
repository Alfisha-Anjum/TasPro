"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1 - Company */}
          <div>
            <h3 className="text-white text-base font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/about-us" className="hover:text-orange-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-orange-500 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-orange-500 transition-colors">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Consumers */}
          <div>
            <h3 className="text-white text-base font-bold mb-4">Consumers</h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/cancellation-refund" className="hover:text-orange-500 transition-colors">Cancellation & Refund Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-orange-500 transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-orange-500 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Social Media Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-4">Social Media Links</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group">
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all duration-300 group">
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all duration-300 group">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-300 group">
                <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 group">
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 4 - Company Registered Address */}
          <div>
            <h3 className="text-white text-base font-bold mb-4">Company Registered Address</h3>
            <div className="space-y-3 text-xs">
              <p className="font-bold text-white uppercase">TASPRO SERVICE INDIA PVT.LTD.</p>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 leading-relaxed">
                  Office No. 201, Atlantis Corporate Park Ring Road No.1, Telebandha, Raipur Chhattisgarh (22) 492001
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@tascompany.in" className="text-gray-400 hover:text-white transition-colors">info@tascompany.in</a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="tel:7447000045" className="text-gray-400 hover:text-white transition-colors">7447-0000-45</a>
              </div>
              
              <div className="pt-2">
                <p className="text-gray-500 text-[10px]">
                  CIN: USIR0000024655604948
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">T</div>
              <span className="text-white font-bold text-base">TASPro Company</span>
            </div>

            {/* Center */}
            <p className="text-gray-500 text-xs text-center">
              © Copyright. 2024 TASPro Company All Right Reserved
            </p>

            {/* Right - Payment Icons */}
            <div className="flex items-center gap-3">
              <div className="bg-white px-2 py-1 rounded h-6 flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 w-auto" />
              </div>
              <div className="bg-white px-2 py-1 rounded h-6 flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3 w-auto" />
              </div>
              <div className="bg-white px-2 py-1 rounded h-6 flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png" alt="RuPay" className="h-3 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;