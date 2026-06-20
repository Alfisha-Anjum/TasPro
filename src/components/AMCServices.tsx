"use client";

import LayoutContainer from "./LayoutContainer";

const AMCServices = () => {
  return (
    <section className="bg-background">
      <div className="max-w-[1240px] mx-auto px-5">
        <div 
          className="w-full"
          style={{
            height: '608px',
            backgroundColor: '#F3F4F6',
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px'
          }}
        >
          {/* Main Heading */}
          <h2 
            style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '24px',
              textAlign: 'left',
              width: '100%',
              paddingLeft: '0',
              paddingRight: '0'
            }}
          >
            AMC Services we offer in Raipur Chhattisgarhguyjjg
          </h2>

          {/* Block 1: Annual Maintenance Contract */}
          <div style={{ width: '100%', textAlign: 'left', paddingLeft: '0', paddingRight: '0' }}>
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px'
              }}
            >
              Annual Maintenance Contract (AMC)
            </h3>
            <div 
              style={{
                fontSize: '15px',
                color: '#6B7280',
                lineHeight: '26px'
              }}
            >
              Air Conditioner (AC) AMC | Water Purifier (RO) AMC | Kitchen Chimney AMC | Refrigerator AMC | Washing Machine AMC | Geyser AMC
            </div>
          </div>

          {/* Block 2: Cleaning Packages */}
          <div style={{ width: '100%', textAlign: 'left', paddingLeft: '0', paddingRight: '0' }}>
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginTop: '24px',
                marginBottom: '12px'
              }}
            >
              Cleaning Packages
            </h3>
            <div 
              style={{
                fontSize: '15px',
                color: '#6B7280',
                lineHeight: '26px'
              }}
            >
              Bathroom Cleaning Package | Water Tank Cleaning Package | Sofa Cleaning Package | Home Deep Cleaning Package | Kitchen Deep Cleaning | Office Cleaning
            </div>
          </div>

          {/* Divider Line */}
          <div 
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#E5E7EB',
              marginTop: '24px',
              marginBottom: '24px'
            }}
          ></div>

          {/* Block 3: Serving Cities */}
          <div style={{ width: '100%', textAlign: 'left', paddingLeft: '0', paddingRight: '0' }}>
            <div 
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}
            >
              Serving Cities:
            </div>
            <div 
              style={{
                fontSize: '15px',
                color: '#6B7280',
                lineHeight: '26px'
              }}
            >
              Raipur | New Raipur | Durg | Bhilai | Korba | Raigarh | Kanker
            </div>
          </div>

          {/* Additional Services to Fill Height */}
          <div style={{ width: '100%', textAlign: 'left', paddingLeft: '0', paddingRight: '0' }}>
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginTop: '24px',
                marginBottom: '12px'
              }}
            >
              Additional AMC Services
            </h3>
            <div 
              style={{
                fontSize: '15px',
                color: '#6B7280',
                lineHeight: '26px'
              }}
            >
              Microwave Oven AMC | Television AMC | Computer/Laptop AMC | Fan AMC | Light Fixture AMC | CCTV Camera AMC | Water Motor AMC
            </div>
          </div>

          <div style={{ width: '100%', textAlign: 'left' }}>
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginTop: '24px',
                marginBottom: '12px'
              }}
            >
              Specialized Cleaning Services
            </h3>
            <div 
              style={{
                fontSize: '15px',
                color: '#6B7280',
                lineHeight: '26px'
              }}
            >
              Carpet Cleaning | Mattress Cleaning | Car Interior Cleaning | Window Cleaning | Terrace Cleaning | Garden Cleaning | Post-Construction Cleaning
            </div>
          </div>

          <div style={{ width: '100%', textAlign: 'left' }}>
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginTop: '24px',
                marginBottom: '12px'
              }}
            >
              Pest Control Services
            </h3>
            <div 
              style={{
                fontSize: '15px',
                color: '#6B7280',
                lineHeight: '26px'
              }}
            >
              Termite Control | Cockroach Control | Mosquito Control | Rodent Control | Bed Bug Treatment | Ant Control | General Pest Control
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AMCServices;
