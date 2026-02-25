import React from 'react';
import { useLocalization } from '../../context/LocalizationContext';

const ConditionalPricing = () => {
  const { userCountry } = useLocalization();

  // US → usa.png, CA → canada.png, default (UK + all others) → uk.png
  const getPricingImage = () => {
    if (userCountry === 'US') return '/global/usa.png';
    if (userCountry === 'CA') return '/global/canada.png';
    return '/global/uk.png'; // UK (GB) and default
  };

  return (
    <div className="w-full flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="max-w-[640px] mb-10 text-center sm:text-left">
        <p className="font-helvetica-neue font-normal text-[#283646] text-[16px] sm:text-[17px] leading-[1.7] mb-6">
          We charge a small monthly fee to cover our software and technology costs, ensuring your pet&apos;s profile is always secure and accessible when it matters most.
        </p>
        <p className="font-helvetica-neue font-normal text-[#283646] text-[16px] sm:text-[17px] leading-[1.7]">
          We also donate a percentage of our profits to pet charities across the USA, UK, and Canada. So when you buy from us, you&apos;re not just protecting your pet, you&apos;re helping protect cats and dogs around the world. <span className="inline-block" role="img" aria-label="paw">🐾</span>
        </p>
      </div>
      <img
        src={getPricingImage()}
        alt="Digital Tails pricing comparison"
        className="max-w-[500px] w-full h-auto object-contain"
      />
    </div>
  );
};

export default ConditionalPricing;
