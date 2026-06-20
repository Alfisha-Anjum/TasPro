"use client";
export const dynamic = "force-dynamic";
import { Star, MapPin, Clock, ShoppingCart, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AllServicesPage = () => {
  // Mock data for services
  const services = [
    {
      id: "ac-installation",
      title: "AC Installation",
      description: "Professional AC installation with certified technician",
      price: "₹2,499",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop&q=80",
      estimatedTime: "2-3 hours"
    },
    {
      id: "ac-repair",
      title: "AC Repair",
      description: "Expert repair for all AC brands and models",
      price: "₹1,299",
      rating: 4.7,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1-2 hours"
    },
    {
      id: "ac-service",
      title: "AC Service (Split)",
      description: "Comprehensive AC maintenance service",
      price: "₹1,499",
      rating: 4.9,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1-2 hours"
    },
    {
      id: "fridge-repair",
      title: "Refrigerator Repair",
      description: "Professional fridge repair and maintenance",
      price: "₹1,599",
      rating: 4.6,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1-2 hours"
    },
    {
      id: "washing-machine",
      title: "Washing Machine Repair",
      description: "Expert washing machine repair service",
      price: "₹1,199",
      rating: 4.5,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1593064440619-8eb0bd1e4b16?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1-2 hours"
    },
    {
      id: "geyser-repair",
      title: "Geyser Repair",
      description: "Professional geyser installation and repair",
      price: "₹1,499",
      rating: 4.7,
      reviews: 102,
      image: "https://images.unsplash.com/photo-1593064440619-8eb0bd1e4b16?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1-2 hours"
    },
    {
      id: "microwave-repair",
      title: "Microwave Repair",
      description: "Expert microwave oven repair service",
      price: "₹999",
      rating: 4.4,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1593064440619-8eb0bd1e4b16?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1 hour"
    },
    {
      id: "chimney-cleaning",
      title: "Kitchen Chimney Cleaning",
      description: "Professional chimney cleaning and service",
      price: "₹1,299",
      rating: 4.6,
      reviews: 93,
      image: "https://images.unsplash.com/photo-1593064440619-8eb0bd1e4b16?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1-2 hours"
    },
    {
      id: "tv-repair",
      title: "TV Repair",
      description: "Professional TV repair for all brands",
      price: "₹1,799",
      rating: 4.5,
      reviews: 81,
      image: "https://images.unsplash.com/photo-1593064440619-8eb0bd1e4b16?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1-2 hours"
    },
    {
      id: "deep-cleaning",
      title: "Deep Cleaning Service",
      description: "Complete home deep cleaning with professional equipment",
      price: "₹1,999",
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1586105251261-72a756497a1d?w=400&h=300&fit=crop&q=80",
      estimatedTime: "4-6 hours"
    },
    {
      id: "carpenter",
      title: "Carpenter Services",
      description: "Professional carpentry and furniture assembly",
      price: "₹1,499",
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&q=80",
      estimatedTime: "2-4 hours"
    },
    {
      id: "electrician",
      title: "Electrician Services",
      description: "Professional electrical repairs and installations",
      price: "₹1,299",
      rating: 4.8,
      reviews: 201,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop&q=80",
      estimatedTime: "1-3 hours"
    }
  ];

  const handleBookNow = (serviceId: string) => {
    // Navigate to service detail page
    window.location.href = `/service/${serviceId}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary">Home</a>
              <span>/</span>
              <span className="text-foreground">All Services</span>
            </nav>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600">
              Professional home services at your doorstep with guaranteed quality and satisfaction
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group border border-gray-100"
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-orange-600">{service.price}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{service.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-gray-500 text-sm">({service.reviews})</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleBookNow(service.id)}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default AllServicesPage;