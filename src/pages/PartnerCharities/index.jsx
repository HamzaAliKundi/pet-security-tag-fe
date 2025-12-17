import React from 'react';

const PartnerCharitiesPage = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4CB2E2] to-[#3da1d1] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-helvetica-neue font-bold text-[36px] sm:text-[48px] md:text-[58px] leading-[1.2] text-white text-center mb-4">
            Partner Charities
          </h1>
          <p className="font-helvetica-neue text-[18px] sm:text-[20px] text-white/90 text-center max-w-3xl mx-auto">
            Making a difference together for animals in need
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Logo and Button */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            {/* Toronto Humane Society Logo */}
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
              <a 
                href="https://www.torontohumanesociety.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/toronto-humane-society-logo.png" 
                  alt="Toronto Humane Society" 
                  className="w-full h-auto object-contain"
                />
              </a>
            </div>

            {/* Canada Badge */}
            <div className="bg-[#DBEEFF] rounded-full px-8 py-3">
              <p className="font-helvetica-neue font-semibold text-[16px] text-[#0897FF] text-center">
                Canada based pet charity 🇨🇦
              </p>
            </div>

            {/* Visit Website Button */}
            <a 
              href="https://www.torontohumanesociety.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#4CB2E2] text-white font-helvetica-neue font-bold text-[16px] px-12 py-4 rounded-full hover:bg-[#3da1d1] transition-all shadow-lg hover:shadow-xl"
            >
              Visit Toronto Humane Society Website
            </a>
          </div>

          {/* Right Column - Description */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <h2 className="font-helvetica-neue font-bold text-[28px] sm:text-[32px] leading-[1.2] text-[#0F2137] mb-6">
                About Toronto Humane Society
              </h2>
              <p className="font-helvetica-neue font-normal text-[16px] sm:text-[18px] leading-[28px] text-[#343D48] mb-6">
                The Toronto Humane Society is a well-respected animal welfare charity dedicated to improving the lives of animals through rescue, sheltering, adoption, accessible veterinary care, education, and community support programs.
              </p>
            </div>

            <div className="bg-[#4CB2E2]/10 rounded-2xl p-8 shadow-md">
              <h2 className="font-helvetica-neue font-bold text-[28px] sm:text-[32px] leading-[1.2] text-[#0F2137] mb-6">
                Our Partnership
              </h2>
              <p className="font-helvetica-neue font-normal text-[16px] sm:text-[18px] leading-[28px] text-[#343D48] mb-6">
                We're proud to share that <span className="font-bold text-[#4CB2E2]">Digital Tails has officially collaborated with the Toronto Humane Society</span>, and as part of this partnership, <span className="font-bold">a portion of our profits will be donated</span> to support their incredible work.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-[#4CB2E2]">
              <h2 className="font-helvetica-neue font-bold text-[28px] sm:text-[32px] leading-[1.2] text-[#0F2137] mb-6">
                Get Involved
              </h2>
              {/* Right Column - Description */}
              <p className="font-helvetica-neue font-normal text-[16px] sm:text-[18px] leading-[28px] text-[#343D48]">
                If you'd like to learn more about the Toronto Humane Society or support them directly, you can visit their website to explore their programs and find ways to get involved.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gradient-to-br from-[#4CB2E2]/10 to-[#3da1d1]/10 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[1.2] text-[#0F2137] mb-4">
            Every Purchase Makes a Difference
          </h3>
          <p className="font-helvetica-neue font-normal text-[16px] sm:text-[18px] leading-[28px] text-[#343D48] max-w-3xl mx-auto">
            When you choose Digital Tails, you're not just protecting your pet, you're also helping support animal welfare initiatives across Canada. Together, we're making a positive impact on the lives of animals in need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerCharitiesPage;

