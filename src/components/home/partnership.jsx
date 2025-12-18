import React from 'react';
import { Link } from 'react-router-dom';

const Partnership = () => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-helvetica-neue font-bold text-[28px] sm:text-[32px] md:text-[38.71px] leading-[1.2] md:leading-[53.23px] tracking-[-1.45px] text-[#0F2137] mb-4">
            We are working in partnership with
          </h2>
        </div>

        {/* Partnership Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10 md:p-12 text-center">
            {/* Logo */}
            <Link 
              to="/partner-charities"
              className="inline-block mb-6 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/toronto-humane-society-logo.png" 
                alt="Toronto Humane Society" 
                className="h-16 sm:h-20 md:h-24 object-contain mx-auto"
              />
            </Link>

            {/* Canada Badge */}
            <div className="inline-block bg-[#DBEEFF] rounded-full px-6 py-2 mb-6">
              <p className="font-helvetica-neue font-semibold text-[14px] sm:text-[16px] text-[#0897FF]">
                Canada based pet charity 🇨🇦
              </p>
            </div>

            {/* Learn More Link */}
            <div className="mt-6">
              <Link 
                onClick={() => window.scrollTo(0, 0)}
                to="/partner-charities"
                className="inline-flex items-center font-helvetica-neue font-medium text-[16px] text-[#4CB2E2] hover:text-[#3da1d1] transition-colors"
              >
                Learn more about our partnership
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;

