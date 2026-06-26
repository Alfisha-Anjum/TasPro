"use client";

import { useRouter } from "next/navigation";
import LayoutContainer from "./LayoutContainer";

const handymanServices = [
  {
    id: 1,
    label: "Electrician",
    image: "/electrician.png",
    slug: "electrician",
  },
  {
    id: 2,
    label: "Carpenter",
    image: "/Carpenter.png",
    slug: "carpenter",
  },
  {
    id: 3,
    label: "Plumber",
    image: "/plumber.png",
    slug: "plumber",
  },
  {
    id: 4,
    label: "Furniture Assembly & Dismantle",
    image: "/Furniture Assembly & Dismantle.png",
    slug: "furniture-assembly-dismantle",
  },
  {
    id: 5,
    label: "House Reparer",
    image: "/House Repairer.png",
    slug: "house-repairer",
  },
];

const HandymanServices = ({ data = [] }: { data?: any[] }) => {
  const router = useRouter();
  const getHandymanImage = (name: string) => {
    const lower = name.toLowerCase();

    if (lower.includes("electric")) return "/electrician.png";
    if (lower.includes("carpenter")) return "/Carpenter.png";
    if (lower.includes("plumber")) return "/plumber.png";
    if (lower.includes("furniture"))
      return "/Furniture Assembly & Dismantle.png";
    if (lower.includes("house")) return "/House Repairer.png";

    return "/electrician.png";
  };

  const finalServices =
    data.length > 0
      ? data.map((item) => ({
          id: item.id,
          label: item.name,
          image: getHandymanImage(item.name),
          slug: item.slug,
        }))
      : handymanServices;
  return (
    <section className="pt-5 w-full sm:max-w-[90%] mx-auto sm:px-0 lg:px-8">
      <div className="">
        <h2 className="text-lg sm:text-2xl font-bold text-foreground dark:text-gray-200 mb-2">
          Handyman Services
        </h2>
        {/* Mobile layout like screenshot */}
        <div className="sm:hidden overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 px-1">
            {finalServices.map((service, index) => (
              <div
                key={index}
                onClick={() =>
                  router.push(
                    `/service/${service.slug || service.label.toLowerCase().replace(/\s+/g, "-")}?service_id=${service.id}`,
                  )
                }
                className="min-w-[78px] text-center cursor-pointer"
              >
                <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-100 mx-auto">
                  <img
                    src={service.image}
                    alt={service.label}
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <p className="mt-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-200 leading-tight">
                  {service.label.split(" ")[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* sm and above old layout */}
        <div className="hidden sm:grid grid-cols-3 md:grid-cols-5 gap-4">
          {finalServices.map((service, index) => (
            <div
              key={index}
              onClick={() =>
                router.push(
                  `/service/${service.slug || service.label.toLowerCase().replace(/\s+/g, "-")}?service_id=${service.id}`,
                )
              }
              className="text-center group cursor-pointer"
            >
              <div className="bg-gray-100 rounded-xl h-36 flex items-center justify-center overflow-hidden">
                <img
                  src={service.image}
                  alt={service.label}
                  className="h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <p className="mt-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-200 leading-tight">
                {service.label.split(" ")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HandymanServices;
