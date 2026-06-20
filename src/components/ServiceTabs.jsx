import React from 'react';

const ServiceTabs = ({ activeServiceType, onServiceTypeChange }) => {
  const serviceTypes = [
    { id: 'split', name: 'Split AC' },
    { id: 'window', name: 'Window AC' },
    { id: 'cassette', name: 'Cassette AC' }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Choose a Service Type</h2>
      <div className="flex gap-3 flex-wrap">
        {serviceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onServiceTypeChange(type.id)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
              activeServiceType === type.id
                ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ServiceTabs;
