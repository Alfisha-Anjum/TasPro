"use client";

import GradientButton2 from "./ui/GradientButton2";
const jobs = Array(9).fill({
  title: "Ac Technician",
  desc: "Window, Castle, Split, HVAC etc",
  open: "7 post open",
});

export default function OpenPositions() {
  return (
    <section className="md:py-20">
      <div className="max-w-[1240] mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl dark:text-white font-semibold mb-6 leading-tight mt-10">
          Open Positions
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomized words which don't look even slightly believable.
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-[#e8ded4] rounded-xl p-6 text-left shadow-sm hover:shadow-md transition"
            >
              {/* Icon + Title */}
              <div className="flex gap-4 items-start">
                {/* LEFT - ICON */}
                <div className="w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center shadow shrink-0">
                  <img src="/bag.png" alt="" className="w-5 h-5" />
                </div>

                {/* RIGHT - CONTENT */}
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-1">{job.title}</h3>

                  <p className="text-gray-600 text-sm mb-1">{job.desc}</p>

                  <p className="text-orange-500 text-sm mb-3">({job.open})</p>

                  <GradientButton2
                    text="Apply Now"
                    width="w-[150px]"
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
