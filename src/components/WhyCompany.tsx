'use client'

import { CheckCircle } from 'lucide-react'

export default function WhyCompany() {
  const benefits = [
    {
      title: 'Verified & Professional Technicians',
      description: 'All our technicians are background verified and highly skilled'
    },
    {
      title: 'Same Day Booking Available',
      description: 'Book our services and get same day appointment slots'
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden charges, pay what you see'
    },
    {
      title: 'Best Price Guaranteed',
      description: 'Get the best prices in the market with price match guarantee'
    },
    {
      title: 'Hassle Free Work',
      description: 'Sit back and relax while we take care of everything'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Why TASPro?</h2>
        
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
