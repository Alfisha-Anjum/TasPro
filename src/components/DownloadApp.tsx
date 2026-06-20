"use client";

import LayoutContainer from "./LayoutContainer";

const DownloadApp = () => {
  return (
    <section className="sm:pb-10 px-0 sm:px-4">
      <LayoutContainer className="relative">
        <div className="w-full rounded-[20px] overflow-hidden bg-gradient-to-r from-black to-[#1a1a1a]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="p-5 sm:p-10">
              <h2 className="text-white sm:text-2xl text-lg font-bold mb-2 sm:mb-4 leading-tight">
                Download This App
              </h2>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[420px] mb-4 sm:mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent egestas id erat a ornare. Donec bibendum venenatis
                mollis. Aliquam id libero at mi bibendum venenatis at ac purus.
              </p>

              {/* Playstore + QR below content */}
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-3">
                  <a href="#">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-8 sm:h-9 w-auto"
                    />
                  </a>

                  <a href="#">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                      className="h-8 sm:h-9 w-auto"
                    />
                  </a>
                </div>

                <div className="w-px h-20 bg-gray-700"></div>

                <div className="bg-white p-2 rounded-xl shadow-md">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://taspro.in"
                    alt="Scan QR Code"
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />
                </div>
              </div>
            </div>

            {/* Mobile image only lg and above */}
            <div className="hidden lg:flex items-center justify-center">
              <img
                src="/mob.png"
                alt="App Mockup"
                className="w-full h-72 object-contain"
              />
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
};

export default DownloadApp;
