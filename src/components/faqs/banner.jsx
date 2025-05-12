import React from 'react'

const Banner = () => {
  return (
    <div className="min-h-[80vh] md:min-h-screen bg-cover bg-center bg-no-repeat p-4 md:p-8 flex items-center relative" style={{backgroundImage: "url('/faqs/banner.svg')"}}>
      {/* Overlay for better text readability, only on mobile */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] md:bg-opacity-0 md:backdrop-blur-none"></div>
      
      <div className="max-w-7xl px-4 md:px-16 relative z-10">
        {/* FAQ Badge */}
        <span className="inline-flex items-center justify-center w-[63px] h-[29px] px-[10px] py-[9px] bg-[#FDD30F] rounded-[24px] text-center font-bold">
          FAQS
        </span>

        {/* Main Heading */}
        <h1 className="font-helvetica-neue max-w-[600px] font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[99px] leading-tight md:leading-[91px] tracking-[-4%] text-white md:text-black mb-4 md:mb-8">
          The <span className="text-[#FDD30F]">Last Pet Tag</span> You'll Ever Need
        </h1>

        {/* Description */}
        <p className="font-helvetica-neue max-w-[550px] font-normal text-sm sm:text-base leading-[136%] tracking-normal capitalize text-white mb-6 md:mb-8">
          Get location tracking and a scannable QR code pet profile built into a pet tag to track your pet with no subscription fees.
        </p>

        {/* Features List */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2">
            <img src="/faqs/location.svg" alt="Location icon" className="max-w-[20px] max-h-[20px] md:max-w-[24px] md:max-h-[24px]" />
            <span className="font-helvetica-neue font-normal text-sm sm:text-base leading-[136%] tracking-normal capitalize text-white">
              Live Location Tracking
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src="/faqs/scanner.svg" alt="QR code icon" className="max-w-[20px] max-h-[20px] md:max-w-[24px] md:max-h-[24px]" />
            <span className="font-helvetica-neue font-normal text-sm sm:text-base leading-[136%] tracking-normal capitalize text-white">
              Scannable QR Code With Your Contact Information
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src="/faqs/subscription.svg" alt="No fees icon" className="max-w-[20px] max-h-[20px] md:max-w-[24px] md:max-h-[24px]" />
            <span className="font-helvetica-neue font-normal text-sm sm:text-base leading-[136%] tracking-normal capitalize text-white">
              No Subscriptions Or Hidden Fees
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
