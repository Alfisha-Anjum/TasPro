"use client";

const features = [
  {
    title: "Same Day Service",
    icon: "/same-day.png",
  },
  {
    title: "Verified Serviceman",
    icon: "/group.png",
  },
  {
    title: "Satisfaction Guaranteed",
    icon: "/guarantee.png",
  },
];

export default function FeatureHighlight() {
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[30px] lg:gap-0">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center w-full lg:w-1/3"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="h-10 w-auto object-contain mb-3"
              />
              <h3 className="text-sm font-semibold text-gray-900 text-center">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}