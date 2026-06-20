"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const HomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  console.log('HomePopup: Component rendered, isVisible =', isVisible);

  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem('hasSeenHomePopup');
    console.log('HomePopup: hasSeenPopup =', hasSeenPopup);
    
    if (!hasSeenPopup) {
      console.log('HomePopup: Setting timer to show popup');
      // Show popup after 1 second delay
      const timer = setTimeout(() => {
        console.log('HomePopup: Timer fired, setting isVisible to true');
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      console.log('HomePopup: Popup already shown, not showing again');
    }
  }, []);

  // Set localStorage when popup actually becomes visible
  useEffect(() => {
    if (isVisible) {
      console.log('HomePopup: Popup is now visible, setting localStorage');
      localStorage.setItem('hasSeenHomePopup', 'true');
    }
  }, [isVisible]);

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  if (!isVisible) {
    console.log('HomePopup: Returning null (popup not visible)');
    return null;
  }

  console.log('HomePopup: Rendering popup modal');

  const services = [
    // Row 1
    { name: "AC Repair", icon: "❄️" },
    { name: "Air Cooler Repair", icon: "🌬️" },
    { name: "Gas Stove Repair", icon: "🔥" },
    { name: "Geyser Repair", icon: "🚿" },
    // Row 2
    { name: "Kitchen Chimney Repair", icon: "🍳" },
    { name: "Microwave Oven Repair", icon: "📦" },
    { name: "Refrigerator Repair", icon: "❄️" },
    { name: "Residential Inverter Repair", icon: "⚡" },
    // Row 3
    { name: "TV & Fan Installation", icon: "📺" },
    { name: "Water Cooler Repair", icon: "💧" },
    { name: "Washing Machine Repair", icon: "🌊" },
    { name: "Water Purifier Repair", icon: "💦" },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleOverlayClick}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-[500px] w-full p-6 text-center animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute -top-2 -right-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg"
          style={{ zIndex: 10 }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 
          className="font-bold text-center mb-4"
          style={{
            fontSize: '26px',
            color: '#FF6A00'
          }}
        >
          Appliance Repair & Service
        </h2>

        {/* Description */}
        <p 
          className="text-gray-600 text-center mb-6 mx-auto"
          style={{ maxWidth: '80%' }}
        >
          Professional repair services for all your home appliances. Expert technicians at your service.
        </p>

        {/* Service Grid */}
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {services.slice(0, 4).map((service, index) => (
              <div key={index} className="group">
                <div 
                  className="w-[80px] h-[80px] bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto transition-transform duration-200 group-hover:scale-110"
                >
                  <span className="text-xl">{service.icon}</span>
                </div>
                <p className="text-xs text-gray-700 text-center font-medium max-w-[80px]">
                  {service.name}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {services.slice(4, 8).map((service, index) => (
              <div key={index + 4} className="group">
                <div 
                  className="w-[80px] h-[80px] bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto transition-transform duration-200 group-hover:scale-110"
                >
                  <span className="text-xl">{service.icon}</span>
                </div>
                <p className="text-xs text-gray-700 text-center font-medium max-w-[80px]">
                  {service.name}
                </p>
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {services.slice(8, 12).map((service, index) => (
              <div key={index + 8} className="group">
                <div 
                  className="w-[80px] h-[80px] bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto transition-transform duration-200 group-hover:scale-110"
                >
                  <span className="text-xl">{service.icon}</span>
                </div>
                <p className="text-xs text-gray-700 text-center font-medium max-w-[80px]">
                  {service.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 300ms ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 300ms ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePopup;
