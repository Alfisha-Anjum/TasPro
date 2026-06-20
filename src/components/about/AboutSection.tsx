export default function AboutSection() {
  const points = [
    "We assure you peace of mind.",
    "We assure of honest and competitive pricing",
    "We assure you of quality workmanship",
    "We assure you of timely delivery",
    "We are reliable, reasonable and responsible",
    "We deliver what we have agreed",
    "Expect exceptional service quality and satisfaction",
    "Expect customer service par excellence",
    "We are more experienced and having team of experts in fixing the problems",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl dark:text-white font-semibold mb-6 leading-tight">
        About Us
      </h1>

      {/* Intro */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7 mb-6 max-w-5xl">
        Welcome to <span className="font-semibold">TASPRO Company</span> by DEJA
        Tech LLC – where innovation meets convenience and transforms the way you
        connect with service professionals. We believe in the power of
        technology to simplify your life, making it easier than ever to find and
        hire independent service professionals who can meet your unique needs.
      </p>

      {/* Who are we */}
      <h3 className="text-lg sm:text-xl font-semibold dark:text-white mt-8 mb-3">
        Who are we?
      </h3>

      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7 mb-6 max-w-5xl">
        At DEJA Tech LLC, we take a customer-centric approach to developing
        intuitive service apps that prioritize your satisfaction and deliver
        exceptional experiences. Our team of dedicated experts combines
        cutting-edge technology with a deep understanding of your daily
        challenges, crafting solutions that seamlessly bridge the gap between
        you and the services you require.
      </p>

      {/* Why best */}
      <h3 className="text-lg sm:text-xl font-semibold dark:text-white mt-8 mb-3">
        What makes TASPro Company the best?
      </h3>

      <p className="text-sm sm:text-base md:text-lg text-[#414141] dark:text-gray-400 leading-7 mb-6">
        We understand that finding the right professional can be time-consuming
        and daunting.
      </p>

      {/* Points */}
      <div className="space-y-4">
        {points.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* Icon */}
            <div className="min-w-5 w-5 h-5 bg-green-600 rounded-md flex items-center justify-center text-white text-xs mt-1">
              ✓
            </div>

            {/* Text */}
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-6">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
