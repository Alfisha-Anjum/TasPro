import { useState } from "react";

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
}

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getCurrentLocation = async () => {
    setLoadingLocation(true);

    return new Promise<LocationData | null>((resolve) => {
      if (!navigator.geolocation) {
        setLoadingLocation(false);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY;

            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
            );

            const data = await res.json();
            const result = data?.results?.[0];

            let city = "";
            let state = "";

            result?.address_components?.forEach((component: any) => {
              if (component.types.includes("locality")) {
                city = component.long_name;
              }

              if (component.types.includes("administrative_area_level_1")) {
                state = component.long_name;
              }
            });

            const locationData: LocationData = {
              latitude,
              longitude,
              address: result?.formatted_address || "",
              city,
              state,
            };

            setLocation(locationData);
            localStorage.setItem("user_location", JSON.stringify(locationData));

            setLoadingLocation(false);
            resolve(locationData);
          } catch (error) {
            console.log("Geocoding error:", error);
            setLoadingLocation(false);
            resolve(null);
          }
        },
        (error) => {
          console.log("Location error:", error);
          setLoadingLocation(false);
          resolve(null);
        },
      );
    });
  };

  return {
    location,
    loadingLocation,
    getCurrentLocation,
  };
};
