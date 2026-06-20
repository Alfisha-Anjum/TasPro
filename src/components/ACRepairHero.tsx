'use client'

import { ChevronDown, Home, Shield, Star } from 'lucide-react'
import Image from 'next/image'

export default function ACRepairHero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span>AC & Appliance Repair</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">AC Repair</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Best Air Condition (AC) Repair Service in Raipur
          </h1>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-900">4.8</span>
              <span className="text-gray-600">(2,847 reviews)</span>
            </div>
          </div>

          {/* TASPro Cover Badge */}
          <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 inline-flex">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">TASPro Cover</span>
          </div>

          {/* AC Type Dropdown */}
          <div className="relative">
            <select className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>Split AC</option>
              <option>Window AC</option>
              <option>Cassette AC</option>
              <option>Central AC</option>
              <option>Portable AC</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Right Column - Technician Image */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/api/placeholder/600/400"
              alt="AC Repair Technician"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
