"use client";

import ServiceSection from "@/components/ServiceSection";
import FeatureSection from "@/components/FeatureSection";
import AppliancesGrid from "@/components/AppliancesGrid";
import ServicePromoSection from "@/components/ServicePromoSection";
import DeepCleaningServices from "@/components/DeepCleaningServices";
import CleaningPackage from "@/components/CleaningPackage";
import HandymanServices from "@/components/HandymanServices";
import MajorServices from "@/components/MajorServices";
import AMCServicePlan from "@/components/AMCServicePlan";
import WhyChooseUs from "@/components/WhyChooseUs";
import DownloadApp from "@/components/DownloadApp";
import HomeStartupModal from "@/components/HomeStartupModal";
import ServicesSection from "@/components/ServicesSection";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import ServiceReels from "@/components/ServiceReels";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const [isMounted, setIsMounted] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [servicesApiData, setServicesApiData] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

 useEffect(() => {
   const savedLocation = localStorage.getItem("selected_location");

   if (savedLocation) {
     const location = JSON.parse(savedLocation);

     fetchDashboardData(location.state, location.city);

     fetchServicesApi(location.state, location.city);
   } else {
     fetchDashboardData("Chhattisgarh", "Raipur");

     fetchServicesApi("Chhattisgarh", "Raipur");
   }
 }, []);

 const fetchServicesApi = async (state: string, city: string) => {
   try {
     const res = await axios.get("https://app.tasprocompany.in/api/services", {
       params: {
         state_name: state,
         city_name: city,
       },
     });

     setServicesApiData(res.data?.data || []);
   } catch (error) {
     console.log(error);
   }
 };

 useEffect(() => {
   const handleLocationChange = (e: any) => {
     const location = e.detail;

     fetchDashboardData(location.state, location.city);

     fetchServicesApi(location.state, location.city);
   };

   window.addEventListener("location-changed", handleLocationChange);

   return () => {
     window.removeEventListener("location-changed", handleLocationChange);
   };
 }, []);

useEffect(() => {
  fetchDashboardData("Chhattisgarh", "Raipur");
  fetchServicesApi("Chhattisgarh", "Raipur");
}, []);

const fetchDashboardData = async (
  state: string,
  city: string,
  stateId?: number,
  cityId?: number,
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://app.tasprocompany.in/api/customers/dashboard",
      {
        params: {
          state,
          city,
          state_id: stateId,
          city_id: cityId,
          state_name: state,
          city_name: city,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    setDashboardData(res.data?.data);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    if (user && !user.profileCompleted) {
      router.push(`/complete-profile?phone=${user.phone}`);
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    const fetchUserLocation = () => {
      if (!navigator.geolocation) {
        console.log("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("LAT:", latitude);
          console.log("LNG:", longitude);

          try {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY;

            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
            );

            const data = await res.json();

            const result = data?.results?.[0];
        

            let city = "";
            let state = "";
            // let city = "";
            // let state = "";

          
            if (result?.address_components) {
              result.address_components.forEach((component: any) => {
                if (component.types.includes("locality")) {
                  city = component.long_name;
                }
                if (component.types.includes("administrative_area_level_1")) {
                  state = component.long_name;
                }
              });
            }

            const address = result?.formatted_address || "Address not found";
        

            const locationData = {
              latitude,
              longitude,
              address,
              city,
              state,
            };
          

            setLocation(locationData);

            localStorage.setItem("user_location", JSON.stringify(locationData));
            window.dispatchEvent(new Event("location-updated"));

            await fetchDashboardData(state || "Chhattisgarh", city || "Raipur");
            console.log("LOCATION DATA:", locationData);
            console.log("FULL GOOGLE RESPONSE:", data);
            // console.log("FINAL LOCATION DATA:", locationData);
            console.log("FULL GOOGLE RESPONSE:", data);
            // console.log("FINAL LOCATION DATA:", locationData);
            // call your location-wise service API here
            // await fetchServicesByLocation(latitude, longitude);
          } catch (error) {
            console.error("Geocoding error:", error);
          }
        },
        (error) => {
          console.error("Location permission denied:", error);
          fetchDashboardData("Chhattisgarh", "Raipur");
        },
      );
    };
    

    fetchUserLocation();
  }, [user]);

  
  if (isMounted && user && !user.profileCompleted) {
    return null;
  }

  const fetchServicesByLocation = async (
    latitude: number,
    longitude: number,
  ) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://app.tasprocompany.in/api/services?latitude=${latitude}&longitude=${longitude}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

    const data = await res.json();
    console.log("Location wise services:", data);
  } catch (error) {
    console.error("Service API error:", error);
  }
};
console.log("dashboardData", dashboardData);

useEffect(() => {
  const loadDashboard = () => {
    const savedLocation =
      localStorage.getItem("selected_location");

    if (savedLocation) {
      const location = JSON.parse(savedLocation);

    fetchDashboardData(
      location.state,
      location.city,
      location.state_id,
      location.city_id,
    );
    } else {
      fetchDashboardData(
        "Chhattisgarh",
        "Raipur"
      );
    }
  };

  loadDashboard();

  const handleLocationChange = (e: any) => {
    const location = e.detail;

    fetchDashboardData(
      location.state,
      location.city,
      location.state_id,
      location.city_id,
    );

    fetchServicesApi(location.state, location.city);
  };

  window.addEventListener(
    "location-changed",
    handleLocationChange
  );

  return () => {
    window.removeEventListener(
      "location-changed",
      handleLocationChange
    );
  };
}, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HomeStartupModal />
{/* <Header />                           */}
      <main>
        <ServiceSection
          data={dashboardData?.categories || []}
          applianceData={servicesApiData}
        />

        {/* <ServiceSection /> */}
        <FeatureSection />
        {/* <AMCServicePlan /> */}
        <AMCServicePlan data={dashboardData?.amc_services || []} />

        <AppliancesGrid data={servicesApiData} />
        {/* <AppliancesGrid data={dashboardData?.appliance_repair_services || []} /> */}
        {/* <DeepCleaningServices /> */}
        <DeepCleaningServices
          data={dashboardData?.deep_cleaning_services || []}
        />
        {/* <CleaningPackage /> */}
        <CleaningPackage data={dashboardData?.cleaning_packages || []} />

        {/* <HandymanServices /> */}
        <HandymanServices data={dashboardData?.handyman_services || []} />

        {/* <MajorServices /> */}
        <MajorServices data={dashboardData?.major_services || []} />

        <ServicePromoSection />
        {/* <WhyChooseUs /> */}
        <WhyChooseUs data={dashboardData?.why_choose_us || []} />
        <DownloadApp />
        <ServiceReels data={dashboardData?.reels || []} />
        <ServicesSection />
      </main>
    </div>
  );
}
