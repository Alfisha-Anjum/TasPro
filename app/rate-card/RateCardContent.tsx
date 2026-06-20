"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";

const RateCardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams?.get("service_id") ?? "";

  const [rateData, setRateData] = useState<any[]>([]);
  const [openElectrical, setOpenElectrical] = useState(true);
  const [openSpare, setOpenSpare] = useState(true);

  useEffect(() => {
    const fetchRateCard = async () => {
      try {
        const res = await fetch(
          `https://app.tasprocompany.in/api/service-details?service_id=${serviceId}&state_name=Chhattisgarh&city_name=Raipur`,
          { headers: { accept: "application/json" } },
        );

        const data = await res.json();
        setRateData(data?.data?.subServices || []);
      } catch (error) {
        console.log("RATE CARD ERROR:", error);
      }
    };

    if (serviceId) fetchRateCard();
  }, [serviceId]);

  const rateCart = rateData.flatMap((item) => item.rate_cart || []);
  const spareParts = rateData.flatMap((item) => item.spare_parts || []);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto sm:px-4">
        <div className="flex items-center justify-center relative mb-5 dark:text-gray-300">
          <button onClick={() => router.back()} className="absolute left-0">
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-lg sm:text-2xl font-semibold">Rate Card</h1>
        </div>

        {/* Electrical Parts */}
        {/* Electrical Parts */}
        {/* Electrical Parts */}
        <div className="border rounded-2xl overflow-hidden mb-8">
          <button
            onClick={() => setOpenElectrical(!openElectrical)}
            className="w-full bg-black text-white px-5 py-4 flex justify-between items-center"
          >
            <h2 className="text-xl font-semibold">Electrical Parts</h2>
            <ChevronDown
              className={`transition-transform ${openElectrical ? "rotate-180" : ""}`}
            />
          </button>

          {openElectrical && (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-4">Description</th>
                  <th className="text-left px-4 py-4">Service Charge</th>
                </tr>
              </thead>

              <tbody>
                {rateCart.map((item: any, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-5">{item.description}</td>
                    {openElectrical && (
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left px-4 py-4">Description</th>
                            <th className="text-left px-4 py-4">
                              Service Charge
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {rateCart.map((item: any, index: number) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-5">{item.description}</td>

                              <td className="px-4 py-5">
                                <p className="text-gray-400 line-through">
                                  {item.originalService}
                                </p>
                                <p>{item.service}</p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    <td className="px-4 py-5">
                      <p className="text-gray-400 line-through">
                        {item.originalService}
                      </p>
                      <p>{item.service}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Spare Parts */}
        <div className="border rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpenSpare(!openSpare)}
            className="w-full bg-black text-white px-5 py-4 flex justify-between items-center"
          >
            <h2 className="text-xl font-semibold">Spare Parts</h2>
            <ChevronDown
              className={`transition-transform ${openSpare ? "rotate-180" : ""}`}
            />
          </button>

          {openSpare && (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-4">Part Name</th>
                  <th className="text-left px-4 py-4">Price</th>
                  <th className="text-left px-4 py-4">Warranty</th>
                </tr>
              </thead>

              <tbody>
                {spareParts.map((item: any, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-5">{item.description}</td>

                    <td className="px-4 py-5">
                      <p className="text-gray-400 line-through">
                        {item.originalPrice}
                      </p>
                      <p>{item.price}</p>
                    </td>
                    <td className="px-4 py-5">
                      <p className="text-gray-400 line-through">
                        {item.originalPrice}
                      </p>
                      <p>{item.price}</p>
                    </td>

                    <td className="px-4 py-5">{item.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateCardContent;
