'use client'

import { X } from 'lucide-react'

interface RateCardModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ServiceRate {
  description: string
  serviceCharge: number
  labour: number
}

export default function RateCardModal({ isOpen, onClose }: RateCardModalProps) {
  const serviceRates: ServiceRate[] = [
    {
      description: 'Non-Inverter PCB Repair',
      serviceCharge: 1200,
      labour: 800
    },
    {
      description: 'Inverter PCB Repair',
      serviceCharge: 1800,
      labour: 999
    },
    {
      description: 'Replace LVT',
      serviceCharge: 600,
      labour: 400
    },
    {
      description: 'Capacitor 2.5 mfd',
      serviceCharge: 350,
      labour: 200
    },
    {
      description: 'Capacitor 3.5 mfd',
      serviceCharge: 450,
      labour: 250
    },
    {
      description: 'Capacitor 5.0 mfd',
      serviceCharge: 550,
      labour: 300
    },
    {
      description: 'Replace Sensor',
      serviceCharge: 400,
      labour: 300
    },
    {
      description: 'Gas Charging (R22)',
      serviceCharge: 800,
      labour: 500
    },
    {
      description: 'Gas Charging (R410/R32)',
      serviceCharge: 1200,
      labour: 600
    },
    {
      description: 'Compressor Replacement',
      serviceCharge: 3500,
      labour: 999
    },
    {
      description: 'Fan Motor Replacement',
      serviceCharge: 1500,
      labour: 700
    },
    {
      description: 'Thermostat Replacement',
      serviceCharge: 800,
      labour: 400
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Rate Card</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Labour Cap Notice */}
        <div className="px-6 py-3 bg-orange-50 border-b border-orange-200">
          <p className="text-sm font-medium text-orange-800">
            Labour Charges are capped at ₹999 per appliance
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="px-6 py-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Description
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">
                    Service Charge
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">
                    Labour
                  </th>
                </tr>
              </thead>
              <tbody>
                {serviceRates.map((service, index) => (
                  <tr 
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">
                        {service.description}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{service.serviceCharge}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{service.labour}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Prices are inclusive of taxes. Additional charges may apply for spare parts.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
