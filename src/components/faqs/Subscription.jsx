import React from 'react'

const Subscription = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 overflow-x-hidden">
      {/* Title */}
      <div className="flex justify-center items-center mb-12">
        <h1 className="font-helvetica-neue font-bold text-[40px] leading-[53.23px] text-[#0F2137] tracking-[-1.45px] text-center">
          Subscription
        </h1>
      </div>

      {/* Subscription Card */}
      <div className="max-w-[800px] mx-auto">
        <div className="bg-[#4CB2E2] rounded-[16px] p-8">
          {/* Header with Paw Icon */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-helvetica-neue font-bold text-[22px] leading-[100%] text-white">
              How Do I Cancel My Subscription?
            </h3>
            <img src="/faqs/foot-white.svg" alt="Paw print" className="flex-shrink-0 ml-2" />
          </div>

          {/* Cancellation Instructions */}
          <p className="font-helvetica-neue font-normal text-[16px] leading-[23.5px] text-white">
            To Cancel Your Subscription It's Simple. Just Fill Out This Form With Your Full Name, Email And Pet Name And We Will Process The Cancellation Within 48 Hours. We Require A Return Of The Tags To Process The Cancellation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Subscription 