import React from 'react';

const Reviews = () => {
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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <style>{`
            .uc-iframe {
              height: 700px !important;
              border: none;
            }
            @media (max-width: 768px) {
              .uc-iframe {
                height: 600px !important;
              }
            }
            @media (max-width: 640px) {
              .uc-iframe {
                height: 550px !important;
              }
            }
          `}</style>
          <iframe
            id="EmbedReviews-Collect-Form"
            className="uc-iframe w-full"
            src="https://embedsocial.com/api/pro_universal_collect_form/7830983d4e58b13503a24afec9acce0b96121f12"
            frameBorder="0"
            border="0"
            title="Customer Reviews"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews;

