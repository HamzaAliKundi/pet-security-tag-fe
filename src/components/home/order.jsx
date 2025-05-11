import React from 'react'

const Order = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 mt-32">
      <div className="relative w-full lg:w-[1200px] h-[473px] overflow-visible">
        {/* Blue Background Box */}
        <div className="absolute inset-0 bg-[#4CB2E2]/25 rounded-[16px]"></div>

        {/* Content Container - Left Aligned */}
        <div className="relative h-full flex flex-col justify-center pl-8 sm:pl-12 lg:pl-16 max-w-[500px]">
          {/* Title */}
          <h2 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] lg:text-[40px] leading-[1.1] text-[#303233] mb-4">
            Ready To Start Your{' '}
            <span className="block">Adventure?</span>
          </h2>

          {/* Subtitle */}
          <p className="font-helvetica-neue font-normal text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-[#303233] mb-8 max-w-[400px]">
            Seamless Pet Monitoring for Peace of Mind, Anytime, Anywhere.
          </p>

          {/* Button with Gradient */}
          <button 
            className="w-[200px] h-[56px] rounded-full px-6 text-black font-bold 
            hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200
            uppercase text-sm tracking-wide"
            style={{
              background: 'radial-gradient(58.93% 58.93% at 50% 77.68%, #FFD700 0%, #B89D0B 100%)'
            }}
          >
            Order Today
          </button>
        </div>

        {/* Dog Image - Positioned to extend above the container but aligned at bottom */}
        <div className="absolute right-0 bottom-0 hidden sm:block">
          <img 
            src="/home/big-dog.svg" 
            alt="Happy dog" 
            className="w-auto h-[604px] object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  )
}

export default Order
