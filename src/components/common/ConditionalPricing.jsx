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
    <div className="w-full flex justify-center py-8 px-4">
      <img
        src={getPricingImage()}
        alt="Digital Tails pricing comparison"
        className="max-w-[500px] w-full h-auto object-contain"
      />
    </div>
  );
};

export default ConditionalPricing;
