"use client";

import { useRouter } from "next/navigation";

type HandymanItem = {
  label: string;
  image: string;
  slug?: string;
};

const handymanServices = [
  {
    label: "Electrician",
    image: "/electrician.png",
  },
  {
    label: "Carpenter",
    image: "/Carpenter.png",
  },
  {
    label: "Plumber",
    image: "/plumber.png",
  },
  {
    label: "Furniture Assembly & Dismantle",
    image: "/Furniture Assembly & Dismantle.png",
  },
  {
    label: "House Reparer",
    image: "/House Repairer.png",
  },
];

const HandymanServices = ({ data = [] }: { data?: any[] }) => {
  const router = useRouter();

const finalServices: HandymanItem[] =
  data.length > 0
    ? data.map((item) => ({
        label: item.name,
        image: item.icon,
        slug: item.slug,
      }))
    : handymanServices;

  return (
    <section className="py-5 max-w-[90%] mx-auto lg:px-8">
      <h2 className="text-2xl md:text-2xl font-bold text-foreground dark:text-gray-200 mb-6">
        Handyman Services
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {finalServices.map((service, index) => (
          <div
            key={index}
            onClick={() =>
              service.slug
                ? router.push(`/service/${service.slug}`)
                : router.push("/services")
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

            <p className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-200">
              {service.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HandymanServices;
