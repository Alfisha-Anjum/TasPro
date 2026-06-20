"use client";

import { Wind, Droplets, Flame, Droplet, WashingMachine, Fan } from "lucide-react";

const appliances = [
  { slug: "ac-repair", icon: Wind, label: "AC Repair", color: "from-blue-500 to-blue-600" },
  { slug: "geyser-repair", icon: Droplets, label: "Geyser Repair", color: "from-orange-500 to-orange-600" },
  { slug: "gas-stove-repair", icon: Flame, label: "Gas Stove Repair", color: "from-red-500 to-red-600" },
  { slug: "water-cooler-repair", icon: Droplet, label: "Water Cooler Repair", color: "from-cyan-500 to-cyan-600" },
  { slug: "washing-machine-repair", icon: WashingMachine, label: "Washing Machine Repair", color: "from-purple-500 to-purple-600" },
  { slug: "kitchen-chimney-repair", icon: Fan, label: "Kitchen Chimney Repair", color: "from-gray-500 to-gray-600" },
];

const ApplianceRepair = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[24px]">
      {appliances.map((appliance, index) => (
        <a
          key={index}
          href={appliance.slug ? `/service/${appliance.slug}` : "/services"}
          className="w-[180px] h-[170px] rounded-[20px] bg-white border border-[#E5E7EB] p-5 text-center hover:translate-y-[-5px] hover:shadow-[0px_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 shadow-[0px_4px_15px_rgba(0,0,0,0.05)]"
        >
          <div className={`w-[60px] h-[60px] rounded-[12px] bg-gradient-to-br ${appliance.color} flex items-center justify-center mx-auto mb-3`}>
            <appliance.icon className="w-[24px] h-[24px] text-white" />
          </div>
          <span className="text-[14px] font-semibold text-[#111827]">
            {appliance.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default ApplianceRepair;
