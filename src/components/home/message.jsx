import React from 'react'

const Message = () => {
  return (
    <div className="min-h-screen bg-[#4CB2E2] relative mx-auto px-4 py-12 md:py-24">
      {/* Phone Image with Gradient Overlay */}
      <div className="relative z-0 flex justify-center items-center max-w-7xl mx-auto">
        <div className="relative">
          <img 
            src="/home/phone.svg" 
            alt="Phone notification" 
            className="w-[280px] md:w-[384px] h-auto rounded-[20px]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#4CB2E2] to-transparent"></div>
        </div>
      </div>

      {/* Title - Positioned over the bottom of the image */}
      <div className="relative z-10 -mt-24 md:-mt-32 max-w-7xl mx-auto mb-12 md:mb-12">
        <h2 className="font-helvetica-neue font-bold text-3xl md:text-5xl leading-tight text-center text-white">
          Immediately receive a text message when your<br className="hidden md:block" />
          pets tag is scanned
        </h2>
      </div>

      {/* Bullet Points */}
      <div className="flex justify-center mt-12 md:mt-8 px-6">
        <ul className="list-disc space-y-1 font-helvetica-neue text-lg md:text-2xl leading-relaxed text-white">
          <li>Activate your tag in seconds by scanning it with your phone</li>
          <li>Receive instant, accurate notifications when your pet is found</li>
          <li>We charge a small monthly fee to maintain the technology to keep your pet safe</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-12 md:mt-12 px-6 flex-row gap-[8px]">
        <button className="w-[355px] h-[74px] text-black font-bold rounded-[100px] px-[24px] hover:opacity-90 transition-colors text-sm md:text-base bg-gradient-to-br from-[#FFD700] to-[#B89D0B]">
          SHOP NOW
        </button>
        <button className="w-[355px] h-[74px] bg-black text-white font-bold rounded-[100px] px-[24px] hover:bg-gray-900 transition-colors text-sm md:text-base">
          LEARN MORE
        </button>
      </div>
    </div>
  )
}

export default Message
