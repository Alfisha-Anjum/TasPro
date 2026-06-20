import React, { useState } from 'react';

const TestimonialSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Tikesh Dewangan",
      time: "1m ago",
      rating: 5,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc diam. Vestibulum ante ipsum primis in faucibus orci luctus.",
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Tikesh Dewangan",
      time: "1m ago",
      rating: 5,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc diam. Vestibulum ante ipsum primis in faucibus orci luctus.",
      image: "/api/placeholder/60/60"
    }
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-orange-500" : "text-gray-400"}>
        ★
      </span>
    ));
  };

  return (
    <section className="relative min-h-[600px] overflow-hidden rounded-3xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
          <img
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=600&fit=crop&blur=20"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-right mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">
            What our Customers Say?
          </h2>
          <div className="flex items-center justify-end gap-2 text-white">
            <span className="text-yellow-400">⭐</span>
            <span className="text-2xl font-semibold">4.5</span>
            <span className="text-lg opacity-90">(12M Reviews)</span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="flex items-center justify-center gap-8 mb-12">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Testimonial Cards Container */}
          <div className="flex gap-6 max-w-4xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 min-w-[350px] max-w-[350px]"
                style={{
                  opacity: index === currentSlide || index === (currentSlide + 1) % testimonials.length ? 1 : 0.5,
                  transform: `translateX(${(index - currentSlide) * 20}px)`,
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/30 shadow-lg">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name and Time */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {testimonial.time}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-white/90 text-center leading-relaxed">
                  {testimonial.review}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* View All Reviews Link */}
        <div className="text-left">
          <a
            href="#"
            className="text-orange-500 hover:text-orange-400 font-semibold text-lg transition-colors duration-300 inline-flex items-center gap-2"
          >
            View All Reviews
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
