import React from 'react'
import { useLocalization } from '../../context/LocalizationContext'

const ServicesInfo = () => {
  const { subscriptionPrices, isLocalizing } = useLocalization()
  
  const images = [
    { src: "/home/dog-1.jpeg", alt: "Dog with tag" },
    { src: "/home/dog-3.jpeg", alt: "Second dog with tag" },
    { src: "/home/dog-2.jpeg", alt: "Cat with tag" }
  ]
  
  // Duplicate images for seamless loop
  const allImages = [...images, ...images, ...images]
  
  return (
    <div className="max-w-9xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-[957px] mx-auto bg-[#4CB2E2] rounded-[8px] px-4 sm:px-8 md:px-12 py-4 sm:py-6">
        <h2 className="font-helvetica-neue font-semibold text-[16px] sm:text-[22px] md:text-[20px] text-white text-center sm:text-left mb-2">
         Setting up your Digital Tail smart tag
        </h2>
        <p className="font-helvetica-neue text-[16px]  text-white text-center sm:text-left capitalize">
        {isLocalizing 
          ? 'Loading pricing information...' 
          : `Once your tag arrives, simply scan it to create your pet's profile! For just ${subscriptionPrices.monthly.symbol}${subscriptionPrices.monthly.amount.toFixed(2)} per month or ${subscriptionPrices.yearly.symbol}${subscriptionPrices.yearly.amount.toFixed(2)} a year, you'll unlock all features and keep your pet safe and connected.`
        }
        </p>  
      </div>
      
      <div className="mt-20 max-w-[1200px] mx-auto overflow-hidden relative">
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="flex animate-scroll" style={{ width: 'max-content' }}>
          {allImages.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 px-8">
              <img 
                src={img.src}
                alt={img.alt}
                className="w-[400px] h-auto rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesInfo;
