import React from 'react'

const Gps = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
        {/* GPS Icon */}
        <div className="relative">
          <img 
            src="/faqs/gps.svg" 
            alt="GPS Location Alert" 
            className="w-[90px] h-[92px] sm:w-[110px] sm:h-[112px] md:w-[125px] md:h-[127px] object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-[567px] flex items-center mt-4 md:mt-0">
          <h2 className="font-helvetica-neue font-medium text-xl sm:text-2xl md:text-3xl lg:text-[37px] leading-[120%] md:leading-[100%] text-black capitalize text-center md:text-left">
            Get Instant GPS Location Alerts
            <br className="hidden sm:block" />
            When Your Pet's Tag Is Scanned.
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Gps
