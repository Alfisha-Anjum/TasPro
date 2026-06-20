import { Shield, CheckCircle, Star, Clock, Users } from "lucide-react";

const SurakshaPackages = () => {
  const packages = [
    {
      title: "Basic Protection",
      price: "₹999",
      originalPrice: "₹1,499",
      features: [
        "AC annual servicing (2 visits)",
        "Refrigerator cleaning (1 visit)",
        "Geyser maintenance (1 visit)",
        "Priority customer support"
      ],
      validity: "1 Year",
      rating: 4.5,
      reviews: 120
    },
    {
      title: "Premium Protection",
      price: "₹1,999",
      originalPrice: "₹2,999",
      features: [
        "AC annual servicing (4 visits)",
        "Refrigerator cleaning (2 visits)",
        "Geyser maintenance (2 visits)",
        "Washing machine service (1 visit)",
        "Priority customer support",
        "Free diagnostics"
      ],
      validity: "1 Year",
      rating: 4.8,
      reviews: 240,
      popular: true
    },
    {
      title: "Elite Protection",
      price: "₹2,999",
      originalPrice: "₹4,499",
      features: [
        "AC annual servicing (6 visits)",
        "Refrigerator cleaning (3 visits)",
        "Geyser maintenance (3 visits)",
        "Washing machine service (2 visits)",
        "Micro-wave cleaning (1 visit)",
        "Chimney service (1 visit)",
        "Priority customer support",
        "Free diagnostics",
        "24/7 helpline"
      ],
      validity: "1 Year",
      rating: 4.9,
      reviews: 180
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            <span>Annual Maintenance Contracts</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Suraksha <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">Protection Plans</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive protection plans for all your home appliances with guaranteed service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border ${
                pkg.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-gray-100'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
              )}
              
              <div className="bg-white p-5">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(pkg.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium">{pkg.rating}</span>
                    <span className="text-gray-500 text-sm">({pkg.reviews} reviews)</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-blue-600">{pkg.price}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">{pkg.originalPrice}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{pkg.validity} Coverage</div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  <Shield className="w-5 h-5" />
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure Service</h3>
              <p className="text-gray-600 text-sm">100% genuine parts and certified technicians</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">On-Time Service</h3>
              <p className="text-gray-600 text-sm">Punctual service with flexible scheduling</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Trusted by Many</h3>
              <p className="text-gray-600 text-sm">5000+ happy customers served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurakshaPackages;