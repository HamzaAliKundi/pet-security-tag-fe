import React from 'react'

const Digital = () => {
  return (
    <div className="bg-[#F0F0F0] h-[560px] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-[900px] mx-auto">
          <div className="relative w-[78px] h-[65px] mb-8">
            <img 
              src="/home/headset.svg"
              alt="Headset Icon"
              className="absolute top-[8px] left-[1.25px]"
              width={77.5}
              height={64}
            />
          </div>

          <h2 className="font-helvetica-neue font-bold text-[28px] md:text-[40px] leading-[38px] md:leading-[53px] tracking-[-1.45px] text-[#0F2137] capitalize mb-6">
            At Digital Tails, you'll never<br className="hidden md:block" />
            struggle to reach us
          </h2>

          <p className="font-helvetica-neue font-normal text-base leading-9 text-center capitalize w-full md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
            our dedicated, UK-based customer service team is always here to help. Tired of companies that just send you in circles with endless FAQ pages? Not us. We offer real support through email, WhatsApp, and phone — so you can get the answers you need, fast!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Digital
