"use client";

import Image from "next/image";
import GradientButton2 from "../ui/GradientButton2";

const values = [
  {
    title: "Transparency",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    icon: "/icons/transparency.png",
  },
  {
    title: "Accountability",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    icon: "/icons/accountability.png",
  },
  {
    title: "Professionalism",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    icon: "/icons/professionalism.png",
  },
  {
    title: "Quality Excellence",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    icon: "/icons/quality.png",
  },
  {
    title: "One Stop Solution",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    icon: "/icons/solution.png",
  },
];

const Item = ({ item, index }: any) => {
  const isTop = index % 2 !== 0;

  return (
    <div className="flex items-center justify-between lg:text-center gap-4 lg:gap-6 w-full lg:max-w-[180px]">
      {/* MOBILE: IMAGE LEFT */}
      <div className="relative w-16 h-16 lg:hidden rounded-full border-2 border-dashed border-orange-400 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-[5px] border-orange-500 bg-white flex items-center justify-center">
          <Image src={item.icon} alt={item.title} width={24} height={24} />
        </div>
      </div>

      {/* TEXT */}
      <div className="lg:hidden flex flex-col">
        <h4 className="font-medium dark:text-white">{item.title}</h4>
        <p className="text-sm text-gray-500">{item.desc}</p>
      </div>

      {/* DESKTOP ZIGZAG */}
      <div className="hidden lg:flex flex-col items-center">
        {/* TOP TEXT */}
        {isTop && (
          <div className="mb-4 text-center">
            <h4 className="text-[16px] font-medium dark:text-white">
              {item.title}
            </h4>
            <p className="text-[16px] text-gray-500">{item.desc}</p>
          </div>
        )}

        {/* CIRCLE */}
        <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-orange-400 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-[8px] border-orange-500 bg-white flex items-center justify-center">
            <Image src={item.icon} alt={item.title} width={40} height={40} />
          </div>
        </div>

        {/* BOTTOM TEXT */}
        {!isTop && (
          <div className="mt-4 text-center">
            <h4 className="font-medium dark:text-white">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default function CoreValues() {
  return (
    <section className="px-4">
      <div className="max-w-full mx-auto">
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl dark:text-white font-semibold mb-6 leading-tight">
            Our Core Values
          </h2>
          <p className="text-gray-500 mb-4 lg:mb-20">
            There are many variations of passages of Lorem Ipsum
          </p>
          <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-y-28 relative z-10">
            {/* TOP ROW */}
            <Item item={values[0]} index={0} />

            <Item item={values[1]} index={1} />
            <Item item={values[3]} index={2} />

            {/* BOTTOM ROW */}

            {/* 3 → BETWEEN 1 & 2 */}
            <div className="col-start-2">
              <Item item={values[2]} index={3} />
            </div>

            {/* 5 → BELOW 4 */}
            <div className="col-start-3">
              <Item item={values[4]} index={4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
