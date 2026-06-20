const OnDemandServices = () => {
  return (
    <section className="py-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-1 gap-6">
          {/* AMC Services */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">AMC Services we offer in Raipur Chhattisgarh</h3>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
              <span className="font-medium text-gray-900">Annual Maintenance Contract (AMC)</span>
              <span>|</span>
              <a href="#" className="hover:text-orange-500 transition-colors">Air Conditioner (AC) AMC</a>
              <span>|</span>
              <a href="#" className="hover:text-orange-500 transition-colors">Water Purifier (RO) AMC</a>
              <span>|</span>
              <a href="#" className="hover:text-orange-500 transition-colors">Kitchen Chimney AMC</a>
            </div>
          </div>

          {/* Cleaning Packages */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Cleaning Packages</h3>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
              <a href="#" className="hover:text-orange-500 transition-colors">Bathroom Cleaning Package</a>
              <span>|</span>
              <a href="#" className="hover:text-orange-500 transition-colors">Water Tank Cleaning Package</a>
              <span>|</span>
              <a href="#" className="hover:text-orange-500 transition-colors">Sofa Cleaning Package</a>
              <span>|</span>
              <a href="#" className="hover:text-orange-500 transition-colors">Home Cleaning Package</a>
            </div>
          </div>
        </div>

        {/* Cities Row */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-gray-900">Serving Cities:</span>
            <span className="text-gray-600">Raipur</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">New Raipur</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Durg</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Bhilai</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Korba</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Raigarh</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Kanker</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnDemandServices;
