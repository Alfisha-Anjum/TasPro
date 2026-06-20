'use client'

import { useState } from 'react'
import { Wind } from 'lucide-react'

interface ACType {
  id: string
  name: string
  icon: React.ReactNode
}

export default function ACTypeSelector() {
  const [selectedType, setSelectedType] = useState<string>('split')

  const acTypes: ACType[] = [
    {
      id: 'split',
      name: 'Split AC',
      icon: <Wind className="w-6 h-6" />
    },
    {
      id: 'window',
      name: 'Window AC',
      icon: <Wind className="w-6 h-6" />
    },
    {
      id: 'cassette',
      name: 'Cassette AC',
      icon: <Wind className="w-6 h-6" />
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {acTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`
              relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200
              ${selectedType === type.id 
                ? 'border-orange-500 bg-orange-50 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }
            `}
          >
            {/* Active indicator */}
            {selectedType === type.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 rounded-full" />
            )}
            
            <div className="flex flex-col items-center space-y-3">
              {/* AC Icon */}
              <div className={`
                p-3 rounded-lg transition-colors
                ${selectedType === type.id 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {type.icon}
              </div>
              
              {/* AC Type Label */}
              <span className={`
                font-medium text-center
                ${selectedType === type.id 
                  ? 'text-orange-700' 
                  : 'text-gray-900'
                }
              `}>
                {type.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
