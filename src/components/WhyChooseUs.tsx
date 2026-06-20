// import { CheckCircle, Eye, Layers, Award, TrendingUp, Grid3X3 } from "lucide-react";
// import LayoutContainer from "./LayoutContainer";

// const whyChooseUsData = [
//   {
//     icon: CheckCircle,
//     title: "100% Satisfaction",
//     description: "We Don't provide service only but we change the perception and feeling along. If not free rework done."
//   },
//   {
//     icon: Eye,
//     title: "Transparency",
//     description: "At TAS Home Service we put clear information of service at every stage of operation in front of customers."
//   },
//   {
//     icon: Layers,
//     title: "One Step Solution",
//     description: "We provide 110+ services at best price so that customers need not go outside of tashome in further choice."
//   },
//   {
//     icon: Award,
//     title: "Quality Assurance",
//     description: "We Don't tell our standards. We show it indeed. The work only is performed by our specialist champs."
//   },
//   {
//     icon: TrendingUp,
//     title: "Best of Cheapest",
//     description: "Tashome.in offers best quality of services at least price in order to meet customer standards and demands."
//   },
//   {
//     icon: Grid3X3,
//     title: "Wide Range of Choice",
//     description: "We provide various choices in order to satisfy the customer and to meet their demand at the standard they want."
//   }
// ];

// const WhyChooseUs = () => {
//   return (
//     <section className="pt-12 bg-background mb-10">
//       <div className="max-w-[1240px] mx-auto px-5">
//         <div
//           className="w-full"
//           style={{
//             height: '464px',
//             borderRadius: '20px',
//             backgroundColor: '#F5F5F5',
//             padding: '40px 20px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: '10px',
//             marginBottom: '40px'
//           }}
//         >
//           {/* Header Area */}
//           <div
//             style={{
//               width: '100%',
//               maxWidth: '1000px',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '16px',
//               textAlign: 'center'
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: '24px',
//                 fontWeight: '600',
//                 color: '#222222',
//                 margin: 0
//               }}
//             >
//               Why Choose Us
//             </h2>
//             <p
//               style={{
//                 fontSize: '16px',
//                 color: '#6B7280',
//                 margin: 0,
//                 maxWidth: '800px',
//                 lineHeight: '1.5'
//               }}
//             >
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas id erat a ornare.
//               Donec bibendum venenatis mollis. Aliquam id libero at mi bibendum venenatis at ac purus.
//             </p>
//           </div>

//           {/* Cards Container */}
//           <div
//             style={{
//               width: '100%',
//               display: 'grid',
//               gridTemplateColumns: 'repeat(3, 1fr)',
//               gridTemplateRows: 'repeat(2, 1fr)',
//               gap: '24px'
//             }}
//           >
//             {whyChooseUsData.map((item, index) => {
//               const Icon = item.icon;
//               return (
//                 <div
//                   key={index}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '16px',
//                     padding: '0',
//                     background: 'transparent'
//                   }}
//                 >
//                   {/* Icon */}
//                   <div
//                     style={{
//                       width: '48px',
//                       height: '48px',
//                       borderRadius: '50%',
//                       backgroundColor: '#FFEAD5',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       flexShrink: 0
//                     }}
//                   >
//                     <Icon
//                       style={{
//                         width: '24px',
//                         height: '24px',
//                         color: '#FF6B35'
//                       }}
//                     />
//                   </div>

//                   {/* Text Content */}
//                   <div style={{ flex: 1 }}>
//                     <h3
//                       style={{
//                         fontSize: '18px',
//                         fontWeight: '600',
//                         color: '#222222',
//                         margin: '0 0 8px 0',
//                         lineHeight: '1.3'
//                       }}
//                     >
//                       {item.title}
//                     </h3>
//                     <p
//                       style={{
//                         fontSize: '14px',
//                         color: '#6B7280',
//                         margin: 0,
//                         lineHeight: '22px'
//                       }}
//                     >
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

import { Shield, Eye, CheckCircle, Award, Wallet, Layers } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

const features = [
  {
    image: "/satis.png",
    title: "100% Satisfaction",
    description:
      "We Don’t provide service only but we change the perception and feeling along. If not free rework done.",
  },
  {
    image: "/trans.png",
    title: "Transparency",
    description:
      "At TAS Home Service we put clear information of service at every stage of operation in front of customers.",
  },
  {
    image: "/one.png",
    title: "One Step Solution",
    description:
      "We provide 110+ services at best price so that customers need not go outside of tashome in for further choice.",
  },
  {
    image: "/quality.png",
    title: "Quality Assurance",
    description:
      "We Don’t tell our standards. We show it indeed. The work only is performed by our specialist champs.",
  },
  {
    image: "/best.png",
    title: "Best of Cheapest",
    description:
      "Tashome.in offers best quality of services at least price in order to meet customer standards and demands.",
  },
  {
    image: "/wide.png",
    title: "Wide Range of Choice",
    description:
      "We provide various choices in order to satisfy the customer and to meet their demand at the standard they want.",
  },
];
const iconMap: Record<string, string> = {
  "thumb-up": "/satis.png",
  visibility: "/trans.png",
  "check-circle": "/one.png",
  "verified-user": "/quality.png",
  "attach-money": "/best.png",
  dashboard: "/wide.png",
};
const WhyChooseUs = ({ data = [] }: { data?: any[] }) => {
  const finalFeatures =
    data.length > 0
      ? data.map((item) => ({
          image: iconMap[item.icon] || "/satis.png",

          title: item.title,
          description: item.description,
          color: item.color,
        }))
      : features;

  return (
    <section className="py-5 ">
      <LayoutContainer className="relative">
        {/* <div className="container-custom py-4 shadow-xl sm:shadow-none rounded-xl"> */}
        <div className="text-center mb-5 sm:mb-10">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground dark:text-gray-200 mb-3">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            egestas id erat a ornare. Donec bibendum venenatis mollis. Aliquam
            id libero at mi bibendum venenatis at ac purus.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {finalFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 xl:p-5 hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex-shrink-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-5 h-5 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-xs sm:text-base dark:text-gray-200 mb-1">
                  {feature.title}
                </h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* </div> */}
      </LayoutContainer>
    </section>
  );
};

export default WhyChooseUs;
