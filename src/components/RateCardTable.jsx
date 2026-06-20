import React from 'react';

const RateCardTable = () => {
  const electricalParts = [
    {
      description: 'Non-Inverter PCB Repaired',
      serviceCharge: '₹1500',
      labour: '₹200'
    },
    {
      description: 'Inverter PCB Repaired',
      serviceCharge: '₹4000',
      labour: '₹200'
    },
    {
      description: 'Replace LVT',
      serviceCharge: '₹900',
      labour: '₹200'
    },
    {
      description: 'Capacitor 2.5 mfd',
      serviceCharge: '₹250',
      labour: '₹250'
    },
    {
      description: 'Capacitor 35-50 mfd',
      serviceCharge: '₹250',
      labour: '₹250'
    },
    {
      description: 'Capacitor 50-60 mfd',
      serviceCharge: '₹250',
      labour: '₹250'
    },
    {
      description: 'Replace Sensor',
      serviceCharge: '₹250',
      labour: '₹250'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-black text-white p-4">
        <h3 className="text-lg font-bold">Electrical Parts</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-900">Description</th>
              <th className="text-center p-4 font-semibold text-gray-900">Service Charge</th>
              <th className="text-center p-4 font-semibold text-gray-900">Labour</th>
            </tr>
          </thead>
          <tbody>
            {electricalParts.map((part, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                } hover:bg-gray-50 transition-colors`}
              >
                <td className="p-4 text-gray-800 font-medium">{part.description}</td>
                <td className="p-4 text-center text-gray-900 font-semibold">{part.serviceCharge}</td>
                <td className="p-4 text-center text-gray-900 font-semibold">{part.labour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RateCardTable;
