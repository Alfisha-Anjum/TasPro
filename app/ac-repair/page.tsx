'use client'

import { useState } from 'react'
import ACRepairHero from '@/components/ACRepairHero'
import ACTypeSelector from '@/components/ACTypeSelector'
import ServiceCard from '@/components/ServiceCard'
import CartPanel from '@/components/CartPanel'
import WhyCompany from '@/components/WhyCompany'
import CouponAccordion from '@/components/CouponAccordion'
import RateCardModal from '@/components/RateCardModal'

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
}

interface Service {
  id: string
  title: string
  image: string
  rating: number
  reviewCount: number
  price: number
  originalPrice?: number
  duration: string
  discount?: number
}

export default function ACRepairPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedACType, setSelectedACType] = useState<string>('split')
  const [isRateCardModalOpen, setIsRateCardModalOpen] = useState(false)

  // Sample services data
  const services: Service[] = [
    {
      id: '1',
      title: 'Power Jet Express Cleaning (Split AC)',
      image: '/api/placeholder/287/120',
      rating: 4.8,
      reviewCount: 2847,
      price: 699,
      originalPrice: 999,
      duration: '45 min'
    },
    {
      id: '2',
      title: 'Deep Cleaning & Sanitization (Split AC)',
      image: '/api/placeholder/287/120',
      rating: 4.7,
      reviewCount: 1923,
      price: 899,
      originalPrice: 1299,
      duration: '60 min'
    },
    {
      id: '3',
      title: 'AC Repair & Service (Split AC)',
      image: '/api/placeholder/287/120',
      rating: 4.9,
      reviewCount: 3421,
      originalPrice: 799,
      price: 599,
      duration: '30 min'
    },
    {
      id: '4',
      title: 'AC Gas Charging (Split AC)',
      image: '/api/placeholder/287/120',
      rating: 4.6,
      reviewCount: 1567,
      price: 1299,
      originalPrice: 1599,
      duration: '45 min'
    },
    {
      id: '5',
      title: 'AC Installation (Split AC)',
      image: '/api/placeholder/287/120',
      rating: 4.8,
      reviewCount: 2109,
      price: 999,
      originalPrice: 1499,
      duration: '90 min'
    },
    {
      id: '6',
      title: 'AC Uninstallation (Split AC)',
      image: '/api/placeholder/287/120',
      rating: 4.7,
      reviewCount: 1234,
      originalPrice: 499,
      price: 499,
      duration: '30 min'
    }
  ]

  const handleAddToCart = (service: Service) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === service.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, {
        id: service.id,
        title: service.title,
        price: service.price,
        quantity: 1
      }]
    })
  }

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    // Handle checkout logic
    console.log('Proceeding to checkout with items:', cartItems)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ACRepairHero />

      {/* AC Type Selector */}
      <ACTypeSelector />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Available Services for{" "}
              {selectedACType === "split"
                ? "Split"
                : selectedACType === "window"
                  ? "Window"
                  : "Cassette"}{" "}
              AC
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  image={service.image}
                  rating={service.rating}
                  reviewCount={service.reviewCount}
                  price={service.price}
                  originalPrice={service.originalPrice}
                  duration={service.duration}
                  onAdd={() => handleAddToCart(service)}
                />
              ))}
            </div>

            {/* Why Company Section */}
            <WhyCompany />

            {/* Coupons Section */}
            <CouponAccordion />

            {/* Rate Card Button */}
            <div className="text-center py-8">
              <button
                onClick={() => setIsRateCardModalOpen(true)}
                className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                View Complete Rate Card
              </button>
            </div>
          </div>

          {/* Cart Section */}
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

      {/* Rate Card Modal */}
      <RateCardModal
        isOpen={isRateCardModalOpen}
        onClose={() => setIsRateCardModalOpen(false)}
      />
    </div>
  );
}