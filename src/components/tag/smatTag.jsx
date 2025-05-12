import React from 'react'

const SmartTag = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12">
        {/* Heading */}
        <h2 className="w-full max-w-[300px] sm:max-w-[450px] md:max-w-[570px] font-helvetica-neue font-bold text-[28px] sm:text-[36px] md:text-[48px] leading-[110%] md:leading-[100%] text-center uppercase text-black">
          ORDER YOUR SMART
          <br />
          TAG TODAY
        </h2>

        {/* Smart Tag Image */}
        <div className="w-full max-w-[250px] sm:max-w-[320px] md:max-w-[385px] aspect-square bg-[#4CB2E2] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] flex items-center justify-center p-4 sm:p-6 md:p-8">
          <img 
            src="/faqs/smart-tag.svg" 
            alt="PetSecure Smart Tag" 
            className="w-full h-full object-contain"
            onError={(e) => e.target.src = "/fallback-image.png"}
          />
        </div>
      </div>
    </div>
  )
}

export default SmartTag
