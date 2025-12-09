import React, { useEffect } from 'react';

const Reviews = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('EmbedSocialHashtagScript')) {
      return;
    }

    // Create and append the script
    const script = document.createElement('script');
    script.id = 'EmbedSocialHashtagScript';
    script.src = 'https://embedsocial.com/cdn/ht.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    // Cleanup function to remove script on unmount (optional)
    return () => {
      const existingScript = document.getElementById('EmbedSocialHashtagScript');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="w-full bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-helvetica-neue font-bold text-[28px] sm:text-[32px] md:text-[38.71px] leading-[1.2] md:leading-[53.23px] tracking-[-1.45px] text-[#0F2137]">
            Customer Reviews
          </h2>
          <p className="mt-4 font-helvetica-neue text-[16px] sm:text-[18px] text-[#343D48] max-w-2xl mx-auto">
            See what our customers are saying about us
          </p>
        </div>

        {/* Reviews Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <div 
            className="embedsocial-hashtag" 
            data-ref="ccae6baa842a94b742131c49051a8200f1a59d35"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
