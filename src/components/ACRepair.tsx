"use client";

import { useState, useRef } from "react";
import { Star, Shield, CheckCircle, Clock, Award, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import CartCard from "./CartCard";
import ServiceModal from "./ServiceModal";
import DateTimeModal from "./DateTimeModal";
import ServiceTypeSelector from "./ServiceTypeSelector";
import HeroSection from "./HeroSection";
import clientSayImg from "./client say.png";
import nikImg from "./nik.png";
import kkImg from "./kk.png";

const serviceTypesData = [
  { id: "split", name: "Split AC" },
  { id: "window", name: "Window AC" },
  { id: "cassette", name: "Cassette AC" },
];

const servicesData = {
  split: [
    { id: "1", name: "Split AC Installation", price: 899, description: "Professional installation for all brands.", duration: "Approx. 60 mins", image: "/service1.png" },
    { id: "2", name: "Split AC Repair", price: 599, description: "Expert repair for cooling issues, noise, etc.", duration: "Approx. 45 mins", image: "/service1.png" },
    { id: "3", name: "Split AC Gas Refill", price: 1299, description: "Complete gas refill with leak check.", duration: "Approx. 90 mins", image: "/service1.png" },
    { id: "4", name: "Split AC Cleaning", price: 399, description: "Deep cleaning of indoor and outdoor units.", duration: "Approx. 30 mins", image: "/service1.png" },
  ],
  window: [
    { id: "5", name: "Window AC Installation", price: 799, description: "Professional installation for window ACs.", duration: "Approx. 45 mins", image: "/service1.png" },
    { id: "6", name: "Window AC Repair", price: 499, description: "Expert repair for cooling and noise issues.", duration: "Approx. 40 mins", image: "/service1.png" },
    { id: "7", name: "Window AC Gas Refill", price: 999, description: "Complete gas refill with leak detection.", duration: "Approx. 75 mins", image: "/service1.png" },
    { id: "8", name: "Window AC Cleaning", price: 299, description: "Thorough cleaning of window AC unit.", duration: "Approx. 25 mins", image: "/service1.png" },
  ],
  cassette: [
    { id: "9", name: "Cassette AC Installation", price: 1499, description: "Professional installation for cassette ACs.", duration: "Approx. 90 mins", image: "/service1.png" },
    { id: "10", name: "Cassette AC Repair", price: 899, description: "Expert repair for commercial cassette ACs.", duration: "Approx. 60 mins", image: "/service1.png" },
    { id: "11", name: "Cassette AC Gas Refill", price: 1799, description: "Complete gas refill for cassette systems.", duration: "Approx. 120 mins", image: "/service1.png" },
    { id: "12", name: "Cassette AC Cleaning", price: 699, description: "Deep cleaning of cassette AC units.", duration: "Approx. 45 mins", image: "/service1.png" },
  ],
};

const whyTasproItems = ["Trained technicians", "100% satisfaction", "On time delivery", "Best price guarantee", "Hassle free work"];

const acBrands = ["Voltas", "Daikin", "Samsung", "Blue Star", "Hitachi", "Mitsubishi"];

const faqs = [
  { question: "How much time does the service take?", answer: "The service typically takes 45-60 minutes depending on the condition of the AC unit." },
  { question: "Do you provide a warranty?", answer: "Yes, we offer a 30-day service warranty. If any issue arises within this period, we will fix it free of cost." },
  { question: "Are spare parts included?", answer: "No, spare parts are charged separately. We use only genuine parts and provide a bill for the same." },
  { question: "Is the technician verified?", answer: "Absolutely. All our technicians are background-verified and professionally trained for your safety." },
  { question: "How can I pay?", answer: "You can pay online via UPI, card, or net banking, or pay cash after the service is completed." }
];

const otherServices = [
  { id: "101", name: "Domestic Help Services", rating: 4.8, price: 499, image: "/service1.png" },
  { id: "102", name: "Home Appliances Repair", rating: 4.7, price: 399, image: "/service1.png" },
  { id: "103", name: "Furniture Dealers", rating: 4.5, price: 999, image: "/service1.png" },
  { id: "104", name: "Packer and Movers", rating: 4.9, price: 1500, image: "/service1.png" },
];

const reviews = [
  { id: "1", name: "Anjali Singh", rating: 5, text: "Excellent service! The technician arrived on time and did a thorough job cleaning my Split AC. Cooling has improved significantly.", image: nikImg },
  { id: "2", name: "Rahul Verma", rating: 4.8, text: "Very professional and polite staff. They fixed the noise issue in my AC quickly. Highly recommended for AC repair in Raipur.", image: kkImg }
];


interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
  image: string;
}

interface CartItem extends Service {
  quantity: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  image: any;
}

const ServiceListItem = ({ service, onAdd, onViewDetails }: { service: Service; onAdd: (service: Service) => void; onViewDetails: () => void }) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-[90px] h-[90px] relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
      <Image src={service.image} alt={service.name} fill className="object-cover" onError={(e) => { if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = ''; }} />
    </div>
    <div className="flex-grow">
      <h3 className="font-semibold text-gray-800 hover:text-orange-600 cursor-pointer" onClick={onViewDetails}>
        {service.name}
      </h3>
      <p className="text-xs text-gray-500 mt-1">{service.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
        <div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{service.duration}</span></div>
        <div className="flex items-center gap-1"><Award className="w-3 h-3" /><span>30-Day Warranty</span></div>
      </div>
    </div>
    <div className="text-right flex-shrink-0">
      <div className="font-bold text-lg text-gray-900">₹{service.price}</div>
      <button onClick={() => onAdd(service)} className="mt-2 h-9 px-6 bg-[#ff6a00] text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
        Add
      </button>
    </div>
  </div>
);

const WhyTasproCard = () => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg mb-4">Why TASPro?</h3>
    <ul className="space-y-3">
      {whyTasproItems.map((item, index) => (
        <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ServiceDetailsContent = () => (
    <div className="space-y-6">
        <div>
            <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
            <ul className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Select the service and add to cart.</li>
                <li>Choose your preferred date and time.</li>
                <li>A verified technician will be assigned for the job.</li>
                <li>Pay online or after the service is completed.</li>
            </ul>
        </div>
        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Service Inclusion</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Diagnosis of the issue.</li>
                <li>Repair or replacement of faulty parts (parts extra).</li>
                <li>Post-service cleanup.</li>
            </ul>
        </div>
        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Service Exclusion</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Cost of spare parts, material, or consumables.</li>
                <li>Major structural or masonry work.</li>
            </ul>
        </div>
        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Important Notes</h3>
            <p className="text-sm text-gray-600">
                Please ensure power and water supply are available. For major repairs, a quote will be provided before work begins.
            </p>
        </div>
    </div>
);

const ACRepair = () => {
  const [activeType, setActiveType] = useState<string>("split");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const reviewsRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: any, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddItem = (service: Service) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === service.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...service, quantity: 1, name: service.name, price: service.price }];
    });
  };

const handleUpdateQuantity = (id: string, quantity: number) => {
  if (quantity < 1) {
    handleRemoveItem(id);
  } else {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }
};

const handleRemoveItem = (id: string) => {
  setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
};

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleDateTimeContinue = (date: any, timeSlot: any, notes: any) => {
    console.log({ date, timeSlot, notes });
    // Proceed to checkout or summary page
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 lg:px-8">
        {/* HERO SECTION */}
        <HeroSection />

        {/* Choose a Service Type SECTION */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Choose a Service Type
          </h2>
          <ServiceTypeSelector
            types={[
              { id: "split", name: "Split AC" },
              { id: "window", name: "Window AC" },
              { id: "cassette", name: "Cassette AC" },
            ]}
            activeType={activeType}
            onTypeChange={setActiveType}
          />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {/* Left Column - Services */}
          <div className="lg:col-span-2 space-y-6">
            {/* SECTION: SERVICE LIST */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">
                Services for{" "}
                {activeType.charAt(0).toUpperCase() + activeType.slice(1)} AC
              </h2>
              {servicesData[activeType as keyof typeof servicesData]?.map(
                (service) => (
                  <ServiceListItem
                    key={service.id}
                    service={service}
                    onAdd={handleAddItem}
                    onViewDetails={() => handleViewDetails(service)}
                  />
                ),
              )}
            </div>

            {/* CUSTOMER SAY SECTION */}
            <div className="mt-6">
              <Image
                src={clientSayImg}
                alt="What our customers say"
                className="w-full h-auto rounded-[24px]"
                priority
              />
            </div>
          </div>

          {/* Right Column - Cart */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartCard
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
            <WhyTasproCard />
          </div>
        </div>

        {/* --- NEW SECTIONS START --- */}
        <div className="mt-20 space-y-20 max-w-7xl mx-auto">
          {/* 1️⃣ Customer Reviews Section */}
          <section className="relative w-full rounded-xl overflow-hidden min-h-[400px] flex items-center shadow-sm">
            <div className="absolute inset-0 z-0">
              {/* Dark overlay on background */}
              <div className="absolute inset-0 bg-slate-900/80 z-10" />
              <Image
                src={nikImg}
                alt="Banner"
                fill
                className="object-cover opacity-50 grayscale"
              />
            </div>

            <div className="relative z-20 w-full px-6 py-12">
              <div className="flex justify-between items-end mb-8 text-white max-w-6xl mx-auto">
                <div>
                  <h2 className="text-3xl font-bold">Customer Reviews</h2>
                  <p className="text-gray-300 mt-2">
                    See what our happy customers have to say
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => scroll(reviewsRef, "left")}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => scroll(reviewsRef, "right")}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div
                ref={reviewsRef}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x max-w-6xl mx-auto [&::-webkit-scrollbar]:hidden"
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="min-w-[350px] md:min-w-[500px] bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white snap-center"
                  >
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{review.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(review.rating) ? "fill-current" : ""}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-gray-200 leading-relaxed italic">
                      "{review.text}"
                    </p>
                  </div>
                ))}
                {/* See All Link Card */}
                <div className="min-w-[200px] flex items-center justify-center">
                  <a
                    href="#"
                    className="text-white hover:text-orange-400 font-semibold flex items-center gap-1"
                  >
                    View All Reviews <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 2️⃣ We Covered AC Brand */}
          <section className="bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                We Covered AC Brand
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll(brandsRef, "left")}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md text-gray-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll(brandsRef, "right")}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md text-gray-600"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div
              ref={brandsRef}
              className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
              {acBrands.map((brand, idx) => (
                <div
                  key={idx}
                  className="min-w-[180px] h-24 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-xl font-bold text-gray-500">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3️⃣ AC Repair Service in Raipur */}
          <section className="text-center max-w-4xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              AC Repair Service in Raipur
            </h2>
            <p className="text-gray-600 leading-7">
              TasPro offers top-notch AC repair and maintenance services in
              Raipur. Our team of certified professionals ensures your air
              conditioner runs efficiently, providing quick cooling and lower
              power consumption. From gas refilling to circuit repair, we handle
              it all with precision and care.
            </p>
          </section>

          {/* 4️⃣ Hiring Guide Section */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hiring guide for AC Repair service in Raipur
            </h2>
            <div className="prose prose-orange max-w-none text-gray-600">
              <p>
                When hiring an AC repair service in Raipur, it is crucial to
                look for verified professionals who offer a warranty on their
                work. Always check for transparent pricing to avoid hidden
                costs. A good service provider will inspect your AC thoroughly
                before suggesting repairs. Ensure that they use genuine spare
                parts and have a good track record of customer satisfaction. At
                TasPro, we ensure all these standards are met to give you a
                hassle-free experience.
              </p>
            </div>
          </section>

          {/* 5️⃣ FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6️⃣ You May Like Our Other Services */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                You May Like Our Other Services
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll(servicesRef, "left")}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md text-gray-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll(servicesRef, "right")}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md text-gray-600"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              ref={servicesRef}
              className="flex gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden scroll-smooth -mx-1 px-1"
            >
              {otherServices.map((service) => (
                <div
                  key={service.id}
                  className="min-w-[260px] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                >
                  <div className="h-40 relative bg-gray-100">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{" "}
                      {service.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {service.name}
                    </h3>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-lg">
                        ₹{service.price}
                      </span>
                      <button className="px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-semibold rounded-lg hover:bg-orange-100 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* --- NEW SECTIONS END --- */}
      </div>

   <ServiceModal
  isOpen={isServiceModalOpen}
  onClose={() => setIsServiceModalOpen(false)}
  service={
    selectedService
      ? {
          title: selectedService.name,
          rating: 4.8,
          reviewCount: 2847,
          warranty: "30-Day Service Warranty",
        }
      : {
          title: "Service Details",
          rating: 0,
          reviewCount: 0,
          warranty: "",
        }
  }
/>
     

      <DateTimeModal
        isOpen={isDateTimeModalOpen}
        onClose={() => setIsDateTimeModalOpen(false)}
        onContinue={handleDateTimeContinue}
      />
    </div>
  );
};

export default ACRepair;
