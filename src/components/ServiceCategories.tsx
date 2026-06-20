"use client";

// import { Wrench, Home, Zap, Shield, Star, Tool } from "lucide-react";
import { Wrench, Home, Zap, Shield, Star, Settings } from "lucide-react";

const ServiceCategories = () => {
  const serviceCards = [
    {
      icon: Wrench,
      title: "Appliances",
      color: "#FFEAD5",
      iconColor: "#FF6B35"
    },
    {
      icon: Home,
      title: "Home Care",
      color: "#E8F5E8",
      iconColor: "#22C55E"
    },
    {
      icon: Zap,
      title: "Quick Fix",
      color: "#FFF3E0",
      iconColor: "#F59E0B"
    },
    {
      icon: Shield,
      title: "Protection",
      color: "#E3F2FD",
      iconColor: "#3B82F6"
    },
    {
      icon: Star,
      title: "Premium",
      color: "#F3E5F5",
      iconColor: "#9333EA"
    },
    {
      icon: Settings,
      title: "Expert",
      color: "#FCE4EC",
      iconColor: "#EC4899"
    }
  ];

  return (
    <section className="bg-background py-8">
      <div className="max-w-[1240px] mx-auto px-5">
        <div 
          style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center'
          }}
        >
          {/* LEFT PANEL CONTAINER */}
          <div 
            style={{
              width: '400px',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}
          >
            {/* HEADING */}
            <div 
              style={{
                width: '360px',
                height: '64px',
                opacity: 1,
                transform: 'rotate(0deg)',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '12px',
                lineHeight: '30px',
                letterSpacing: '-0.3px',
                color: '#1A1A1A',
                textAlign: 'left',
                margin: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              How can we serve you today?
            </div>

            {/* CARDS WRAPPER */}
            <div 
              style={{
                width: '360px',
                height: '340px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 120px)',
                gridTemplateRows: 'repeat(2, 165px)',
                columnGap: '0px',
                rowGap: '10px'
              }}
            >
              {serviceCards.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    style={{
                      width: '120px',
                      height: '165px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      borderRadius: '12px',
                      backgroundColor: service.color,
                      textAlign: 'center'
                    }}
                  >
                    {/* ICON */}
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon 
                        style={{
                          width: '20px',
                          height: '20px',
                          color: service.iconColor
                        }}
                      />
                    </div>

                    {/* TEXT BELOW ICON */}
                    <div 
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        lineHeight: '14px',
                        textAlign: 'center',
                        maxWidth: '110px',
                        color: '#374151',
                        wordWrap: 'break-word',
                        hyphens: 'auto'
                      }}
                    >
                      {service.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div 
            style={{
              flex: 1,
              height: '400px',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop"
              alt="Service Professional"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
