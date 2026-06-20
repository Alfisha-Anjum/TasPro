import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ServiceTabs from './ServiceTabs';
import ServiceCard from './ServiceCard';
import CartPanel from './CartPanel';
import { Star, CheckCircle2, ChevronDown, Clock, ShieldCheck, BadgePercent } from 'lucide-react';
import nikImg from './nik.png';
import Image from 'next/image';

// Dynamic data
const serviceTypes = [
  { id: 'split', name: 'Split AC' },
  { id: 'window', name: 'Window AC' },
  { id: 'cassette', name: 'Cassette AC' }
];

const servicesData = [
  {
    id: '1',
    title: 'Split AC Service',
    description: 'Complete service including cleaning and maintenance',
    rating: 4.9,
    reviews: 856,
    duration: '45 mins',
    price: 2999,
    originalPrice: 3999,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Split AC Repair',
    description: 'Repair for compressor, gas refill, electrical issues',
    rating: 4.7,
    reviews: 654,
    duration: '1-2 hours',
    price: 3499,
    originalPrice: 4999,
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Split AC Installation',
    description: 'Professional installation of new AC units',
    rating: 4.8,
    reviews: 432,
    duration: '2-3 hours',
    price: 1999,
    originalPrice: 2999,
    discount: '33% OFF',
    image: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=2069&auto=format&fit=crop'
  }
];

const customerReviews = [
  {
    id: '1',
    name: 'Rakesh Sharma',
    rating: 5,
    text: 'The technician was very professional and fixed my AC in no time. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: '2',
    name: 'Priya Singh',
    rating: 5,
    text: 'Excellent service! The team was punctual and very efficient. My AC is working perfectly now.',
    avatar: 'https://i.pravatar.cc/150?u=2'
  }
];

const acBrands = ['VOLTAS', 'DAIKIN', 'SAMSUNG', 'BLUE STAR', 'HITACHI', 'MITSUBISHI'];

const coupons = [
  {
    id: '1',
    code: 'WELCOME20',
    description: '20% off on first booking'
  },
  {
    id: '2',
    code: 'SAVE15',
    description: '₹15 off on orders above ₹500'
  }
];

const whyTasproFeatures = [
  'Verified & Professional Technicians',
  'Same Day Booking Available',
  'Transparent Pricing',
  '30-Day Money Back Guarantee'
];

const ACRepairPage = () => {
  const router = useRouter();
  // const [activeServiceType, setActiveServiceType] = useState('split');
  // const [cartItems, setCartItems] = useState([]);
  const [expandedCoupon, setExpandedCoupon] = useState(false);

type ServiceType = "split" | "window" | "cassette";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
}

interface CartItem extends ServiceItem {
  quantity: number;
}

const [cartItems, setCartItems] = useState<CartItem[]>([]);

const [activeServiceType, setActiveServiceType] =
  useState<ServiceType>("split");

// const [cartItems, setCartItems] = useState<CartItem[]>([]);

const handleServiceTypeChange = (typeId: ServiceType) => {
  setActiveServiceType(typeId);
};
const handleCheckout = () => {
    // Implement checkout logic here
    alert('Proceeding to checkout with ' + cartItems.length + ' items in cart.');
  };

const handleAddToCart = (service: ServiceItem) => {
  setCartItems((prev) => [...prev, { ...service, quantity: 1 }]);
  router.push("/rate-card");
};

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCoupons = () => {
    setExpandedCoupon(!expandedCoupon);
  };
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <section className="mb-10">
          <div className="text-sm text-gray-500 mb-2">
            Home / AC & Appliance Repair / AC Repair
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content (Left Column) */}
          <div className="col-span-8 space-y-10">
            {/* Section 2: Choose a Service Type */}
            <ServiceTabs
              activeServiceType={activeServiceType}
              onServiceTypeChange={handleServiceTypeChange}
            />

            {/* Section 3: Split AC Services List */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Split AC</h2>
                <button className="text-[#FF6B00] font-semibold flex items-center gap-1 hover:underline">
                  View All <ChevronDown size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {servicesData.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    image={service.image}
                    rating={service.rating}
                    reviewCount={service.reviews}
                    price={service.price}
                    originalPrice={service.originalPrice}
                    duration={service.duration}
                    onAdd={() => handleAddToCart(service)}
                  />
                ))}
              </div>
            </section>

            {/* Section 4: Customer Reviews Section */}
            <section className="relative mt-16 rounded-xl shadow-sm">
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
                alt="Customer review background"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-white">
                    What Our Customers Say
                  </h2>
                  <a
                    href="#"
                    className="text-white font-semibold flex items-center gap-2"
                  >
                    View All Reviews &gt;&gt;
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customerReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                      <div className="flex items-center mb-4">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="ml-4">
                          <p className="font-semibold text-white">
                            {review.name}
                          </p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/80">"{review.text}"</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                      &lt;
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: We Covered AC Brand */}
            <section className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-8">
                We Covered AC Brand
              </h2>
              <div className="relative">
                <div className="flex gap-6 pb-4 overflow-x-auto">
                  {acBrands.map((brand) => (
                    <div
                      key={brand}
                      className="flex-shrink-0 w-40 h-24 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center"
                    >
                      <span className="text-lg font-semibold text-gray-700">
                        {brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 6: AC Repair Service in Raipur */}
            <section className="mt-20 text-center">
              <h2 className="text-2xl font-bold mb-4">
                AC Repair Service in Raipur
              </h2>
              <p className="max-w-3xl mx-auto text-gray-600">
                We provide the best AC repair services in Raipur. Our team of
                experienced technicians is equipped to handle all your
                AC-related problems, ensuring your comfort during the hot summer
                months. We are committed to providing fast, reliable, and
                affordable services.
              </p>
            </section>

            {/* Section 7: Hiring Guide */}
            <section className="mt-20">
              <h2 className="text-2xl font-bold mb-4">
                Hiring guide for AC Repair service in Raipur
              </h2>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <p className="text-gray-600 leading-relaxed">
                  When hiring an AC repair service, it's important to consider
                  several factors to ensure you get the best service possible.
                  Look for companies with a good reputation and positive
                  customer reviews. Verify that they have licensed and
                  experienced technicians. It's also a good idea to get a
                  detailed quote before any work begins to avoid hidden charges.
                  At our company, we pride ourselves on transparency and
                  quality, providing you with a seamless and trustworthy
                  experience from start to finish.
                </p>
              </div>
            </section>

            {/* Section 8: FAQ Section */}
            <section className="mt-20">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b last:border-b-0">
                      <button className="w-full flex justify-between items-center py-4">
                        <span className="font-semibold">
                          This is a question?
                        </span>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 9: You May Like Our Other Services */}
            <section className="mt-20">
              <h2 className="text-2xl font-bold mb-8">
                You May Like Our Other Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Domestic Help Services",
                    image:
                      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
                    rating: 4.5,
                    price: 500,
                  },
                  {
                    name: "Home Appliances Repair & Service",
                    image:
                      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop",
                    rating: 4.8,
                    price: 800,
                  },
                  {
                    name: "Furniture Dealers",
                    image:
                      "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=2070&auto=format&fit=crop",
                    rating: 4.2,
                    price: 1200,
                  },
                  {
                    name: "Packer and Movers",
                    image:
                      "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=2069&auto=format&fit=crop",
                    rating: 4.9,
                    price: 2500,
                  },
                ].map((service) => (
                  <div
                    key={service.name}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={300}
                      height={200}
                      className="object-cover"
                    />
                    <div className="p-5">
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className="flex items-center my-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{service.rating}</span>
                      </div>
                      <p className="text-lg font-bold">₹{service.price}</p>
                      <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: What our Customers Say (Testimonials) */}
            <section className="relative rounded-3xl overflow-hidden py-16 px-10">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
                  alt="Background"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10 text-white">
                  <h2 className="text-3xl font-bold">
                    What our Customers Say?
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400 font-bold">4.5</span>
                    <span className="text-sm opacity-80">(12M Reviews)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-orange-500">
                          <Image
                            src={`https://i.pravatar.cc/150?u=${i}`}
                            alt="User"
                            width={48}
                            height={48}
                          />
                        </div>
                        <div>
                          <p className="font-bold">Tikesh Dewangan</p>
                          <div className="flex text-orange-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={12}
                                className="fill-current"
                              />
                            ))}
                          </div>
                          <p className="text-[10px] opacity-60 mt-0.5">
                            1m ago
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed opacity-90 italic">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. In ut id elit dunc. Vestibulum ante ipsum primis
                        in faucibus orci luctus."
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="text-orange-400 font-bold hover:underline flex items-center gap-1 mx-auto">
                    View All Reviews <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </section>

            {/* Section 5: We covered AC Brand */}
            <section>
              <h2 className="text-2xl font-bold mb-8">We covered AC Brand</h2>
              <div className="grid grid-cols-6 gap-6">
                {[
                  "VOLTAS",
                  "DAIKIN",
                  "SAMSUNG",
                  "BLUE STAR",
                  "HITACHI",
                  "MITSUBISHI",
                ].map((brand) => (
                  <div
                    key={brand}
                    className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center justify-center h-24 hover:shadow-md transition-shadow"
                  >
                    <span className="text-blue-900 font-black italic tracking-tighter text-lg">
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: AC Repair service in Raipur (Description) */}
            <section className="bg-white p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">
                AC Repair service in Raipur
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.
                </p>
                <p>
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first true
                  generator on the Internet. It uses a dictionary of over 200
                  Latin words, combined with a handful of model sentence
                  structures, to generate Lorem Ipsum which looks reasonable.
                </p>
              </div>
            </section>

            {/* Section 7: Hiring guide */}
            <section className="bg-white p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">
                Hiring guide for AC Repair service in Raipur
              </h2>
              <div className="text-gray-600 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </section>

            {/* Section 8: FAQ Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  "How long does AC service take?",
                  "What is included in AC cleaning?",
                  "Do you provide warranty?",
                  "Are technicians verified?",
                ].map((q, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-100 last:border-0 pb-4"
                  >
                    <button className="flex items-center justify-between w-full font-semibold text-gray-800 text-left">
                      {q} <ChevronDown size={20} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: You may like our other services */}
            <section className="pb-10">
              <h2 className="text-2xl font-bold mb-8">
                You may like our other services
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { name: "Domestic Help", rate: "4.5" },
                  { name: "Home Appliances", rate: "4.8" },
                  { name: "Packers & Movers", rate: "4.7" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-44">
                      <Image
                        src={`https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop`}
                        alt={s.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold mb-2">{s.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                        <Star
                          size={14}
                          className="fill-orange-500 text-orange-500"
                        />{" "}
                        {s.rate}
                      </div>
                      <button className="w-full py-3 border border-orange-500 text-orange-500 font-bold rounded-xl hover:bg-orange-50 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (Right Column) */}
          <div className="col-span-4">
            <CartPanel
              cartItems={cartItems}
              onRemoveItem={(id) =>
                setCartItems((prev) => prev.filter((item) => item.id !== id))
              }
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default ACRepairPage;
