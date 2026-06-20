"use client";

import {
  Star,
  Check,
  Shield,
  Clock,
  Phone,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Wrench,
  Calendar,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplianceRepair from "@/components/ApplianceRepair";
import DeepCleaningServices from "@/components/DeepCleaningServices";
import OnDemandServices from "@/components/OnDemandServices";
import HandymanServices from "@/components/HandymanServices";
import MajorServices from "@/components/MajorServices";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}

      <main>
        {/* Breadcrumb */}
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary">
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Services</span>
          </div>
        </div>

        <div className="px-20 py-16">
          <div className="text-center mb-16">
            <h1 className="text-[36px] font-bold text-gray-900 text-center mb-[10px]">
              Our <span className="text-[#FF6A00]">Services</span>
            </h1>
            <p className="text-[16px] text-[#6B7280] text-center max-w-[600px] mx-auto mt-[10px]">
              Professional home services at your doorstep with guaranteed
              quality and satisfaction
            </p>
          </div>
        </div>

        {/* Expert Appliance Repair */}
        <section className="mt-[60px] mb-[40px] px-20">
          <div className="text-center mb-[40px]">
            <h2 className="text-[30px] font-bold text-gray-900 text-center mb-[8px]">
              Expert <span className="text-[#FF6A00]">Appliance Repair</span>
            </h2>
            <p className="text-[16px] text-[#6B7280] text-center max-w-[600px] mx-auto mt-[8px]">
              Professional repair services for all major home appliances with
              guaranteed quality work
            </p>
          </div>
          <ApplianceRepair />
        </section>

        {/* Deep Cleaning Services */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DeepCleaningServices />
          </div>
        </section>

        {/* On Demand Services */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OnDemandServices />
          </div>
        </section>

        {/* Handyman Services */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HandymanServices />
          </div>
        </section>

        {/* Major Services */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MajorServices />
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
