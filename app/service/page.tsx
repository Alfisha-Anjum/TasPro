"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ServiceTabs from '@/components/ServiceTabs';
import ServiceCard from '@/components/ServiceCard';
import CartPanel from '@/components/CartPanel';

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

type ServiceType = 'split' | 'window' | 'cassette';

const ACRepairServicePage = () => {
  const router = useRouter();
  const [activeServiceType, setActiveServiceType] = useState<ServiceType>('split');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Services data for different AC types
  const servicesData: Record<ServiceType, ServiceItem[]> = {
    split: [
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
    ],
    window: [
      {
        id: '4',
        title: 'Window AC Service',
        description: 'Complete cleaning and maintenance service',
        rating: 4.8,
        reviews: 623,
        duration: '40 mins',
        price: 2499,
        originalPrice: 3499,
        discount: '29% OFF',
        image: 'https://images.unsplash.com/photo-1581092795856-3d5bba5c2b2e?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '5',
        title: 'Window AC Repair',
        description: 'Comprehensive repair for all window AC issues',
        rating: 4.6,
        reviews: 412,
        duration: '1-2 hours',
        price: 2999,
        originalPrice: 4499,
        discount: '33% OFF',
        image: 'https://images.unsplash.com/photo-1578945037312-59f1dd5d5332?q=80&w=2070&auto=format&fit=crop'
      }
    ],
    cassette: [
      {
        id: '6',
        title: 'Cassette AC Service',
        description: 'Professional service for cassette AC units',
        rating: 4.9,
        reviews: 287,
        duration: '60 mins',
        price: 3999,
        originalPrice: 5499,
        discount: '27% OFF',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '7',
        title: 'Cassette AC Installation',
        description: 'Expert installation for commercial spaces',
        rating: 4.8,
        reviews: 156,
        duration: '3-4 hours',
        price: 4999,
        originalPrice: 6999,
        discount: '29% OFF',
        image: 'https://images.unsplash.com/photo-1578945037312-59f1dd5d5332?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  };

  const handleServiceTypeChange = (typeId: ServiceType) => {
    setActiveServiceType(typeId);
  };

  const handleAddToCart = (service: ServiceItem) => {
    // Add service to cart and redirect to rate card
    setCartItems(prev => [...prev, { ...service, quantity: 1 }]);
    
    // Redirect to rate card page
    router.push('/rate-card');
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    router.push('/rate-card');
  };

  const currentServices = servicesData[activeServiceType] || [];

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <section className="mb-6">
          <div className="text-sm text-gray-500">
            Home / AC & Appliance Repair / AC Repair
          </div>
        </section>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Service cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Type Tabs */}
            <ServiceTabs
              activeServiceType={activeServiceType}
              onServiceTypeChange={handleServiceTypeChange}
            />

            {/* Service Cards Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {activeServiceType} AC
                </h2>
                <button className="text-[#FF6B00] font-semibold flex items-center gap-1 hover:underline transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {currentServices.map((service: ServiceItem) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    rating={service.rating}
                    reviews={service.reviews}
                    duration={service.duration}
                    price={service.price}
                    originalPrice={service.originalPrice}
                    discount={service.discount}
                    image={service.image}
                    onAdd={() => handleAddToCart(service)}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right side - Cart Panel */}
          <div className="lg:col-span-1">
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

export default ACRepairServicePage;