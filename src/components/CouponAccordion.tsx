'use client'

import { useState } from 'react'
import { ChevronDown, Tag, X } from 'lucide-react'

interface Coupon {
  id: string
  code: string
  title: string
  description: string
  discount: string
  minOrder?: number
}

export default function CouponAccordion() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null)

  const coupons: Coupon[] = [
    {
      id: '1',
      code: 'FIRST50',
      title: 'First Time User',
      description: 'Get 50% off on your first service',
      discount: '50% OFF',
      minOrder: 299
    },
    {
      id: '2',
      code: 'SAVE100',
      title: 'Weekend Special',
      description: 'Flat ₹100 off on all AC services',
      discount: '₹100 OFF',
      minOrder: 499
    },
    {
      id: '3',
      code: 'COMBO20',
      title: 'Combo Offer',
      description: '20% off on booking 2 or more services',
      discount: '20% OFF',
      minOrder: 799
    }
  ]

  const handleApplyCoupon = (couponId: string) => {
    setSelectedCoupon(couponId)
    setIsOpen(false)
  }

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null)
  }

  const appliedCoupon = coupons.find(c => c.id === selectedCoupon)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Tag className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">Coupons & Offers</h3>
            {appliedCoupon && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Applied: {appliedCoupon.code}
              </span>
            )}
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {/* Applied Coupon Bar */}
        {appliedCoupon && (
          <div className="px-6 py-3 bg-green-50 border-t border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Tag className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {appliedCoupon.title} - {appliedCoupon.discount}
                  </p>
                  <p className="text-xs text-green-600">{appliedCoupon.description}</p>
                </div>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Coupon List */}
        {isOpen && (
          <div className="border-t border-gray-200">
            <div className="p-6 space-y-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                          {coupon.code}
                        </span>
                        <span className="text-lg font-bold text-orange-600">
                          {coupon.discount}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {coupon.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {coupon.description}
                      </p>
                      {coupon.minOrder && (
                        <p className="text-xs text-gray-500">
                          Minimum order: ₹{coupon.minOrder}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleApplyCoupon(coupon.id)}
                      disabled={selectedCoupon === coupon.id}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${selectedCoupon === coupon.id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                        }
                      `}
                    >
                      {selectedCoupon === coupon.id ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
