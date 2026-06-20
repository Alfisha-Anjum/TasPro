"use client";

import LayoutContainer from "./LayoutContainer";

const ServicesSection = () => {
  return (
    <>
      <section className="py-5">
        <LayoutContainer>
          <div className=" ">
            {/* Main Title
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 text-center">
            Services we offer in Raipur Chhattisgarh
          </h2> */}

            {/* SECTION 1: On-demand Services */}
            <div className="">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                On-demand Services we offer in Raipur Chhattisgarh
              </h3>

              {/* Appliances Repair & Service */}
              <div className="mb-3">
                <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1.5">
                  Appliances Repair & Service
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  AC Repair | Air Cooler Repair | Gas Stove Repair | Geyser
                  Repair | Kitchen Chimney Cleaning | Kitchen Chimney Repair |
                  Microwave Oven Repair | Refrigerator Repair | Residential
                  Inverter Repair | TV & Fan Installation | TV Repair | Washing
                  Machine Repair | Water Cooler Repair | Water Purifier Repair
                </p>
              </div>

              {/* Deep Cleaning Services */}
              <div className="mb-3">
                <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1.5">
                  Deep Cleaning Services
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bathroom Cleaning | Carpet Cleaning | Floor Cleaning | Home
                  Deep Cleaning | Kitchen Deep Cleaning | Office Deep Cleaning |
                  Sofa Cleaning | Water Tank Cleaning | Carpenter | Electrician
                  | Furniture Assembly & Dismantle | Plumber | House Painter
                </p>
              </div>

              {/* Construction & Remodeling */}
              <div className="mb-3">
                <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1.5">
                  Construction & Remodeling
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Home Renovation & Remodeling | Bathroom Renovation &
                  Remodeling | Commercial Chimney Service | Painting Contractor
                  | Plumbing Contractor | Electrical Contractor | False Ceiling
                  Contractor | Water Proofing Contractor | Cockroaches, Ants &
                  General Pest Control | Termites Control | Bed Bugs Control
                </p>
              </div>
            </div>

            {/* Divider Line */}

            {/* SECTION 2: AMC Services */}
            <div className="">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                AMC Services we offer in Raipur Chhattisgarh
              </h3>

              {/* Annual Maintenance Contract (AMC) */}
              <div className="mb-3">
                <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1.5">
                  Annual Maintenance Contract (AMC)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Air Conditioner (AC) AMC | Water Purifier (RO) AMC | Kitchen
                  Chimney AMC
                </p>
              </div>

              {/* Cleaning Packages */}
              <div className="">
                <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1.5">
                  Cleaning Packages
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bathroom Cleaning Package | Water Tank Cleaning Package | Sofa
                  Cleaning Package | Home Cleaning Package
                </p>
              </div>
            </div>

            {/* Divider Line */}
            {/* <div className="border-t border-gray-200 my-5"></div> */}

            {/* SECTION 3: Serving Cities */}
          </div>
        </LayoutContainer>
      </section>
      <LayoutContainer>
        <div className="pt-5">
          <div className=" flex items-center gap-1 mx-auto">
            {/* <h3 className="text-lg  text-gray-900 mb-2"></h3> */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Serving Cities : Raipur | New Raipur | Durg | Bhilai | Korba |
              Raigarh | Kanker
            </p>
          </div>
        </div>
      </LayoutContainer>
    </>
  );
};

export default ServicesSection;
