import React from 'react'

const Replacements = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
      {/* Title */}
      <div className="flex justify-center items-center mb-12">
        <h1 className="font-helvetica-neue font-bold text-[40px] leading-[53.23px] text-[#0F2137] tracking-[-1.45px] text-center">
          Replacements
        </h1>
      </div>

      {/* Replacement Instructions Card */}
      <div className="max-w-[800px] mx-auto">
        <div className="bg-[#4CB2E2] rounded-[16px] p-8">
          {/* Header with Paw Icon */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-helvetica-neue font-bold text-[22px] leading-[100%] text-white">
              How Can I Order A Replacement PetSecure Tag?
            </h3>
            <img src="/faqs/foot-white.svg" alt="Paw print" className="flex-shrink-0 ml-2" />
          </div>

          {/* Instructions List */}
          <div className="space-y-3">
            <p className="font-helvetica-neue font-normal text-[16px] leading-[23.5px] text-white">
              To Order A Replacement Tag You Can Do So By Logging Into Your Account.
            </p>
            
            <p className="font-helvetica-neue font-normal text-[16px] leading-[23.5px] text-white">
              Once Logged In, Navigate To The 'pets' Tab.
            </p>
            
            <p className="font-helvetica-neue font-normal text-[16px] leading-[23.5px] text-white">
              Click 'Order Replacement' Under The Pet You Require A Replacement Tag For.
            </p>
            
            <p className="font-helvetica-neue font-normal text-[16px] leading-[23.5px] text-white">
              When Your Replacement Tag Arrives You Will Need To Scan It, Login And Click On The 'Replace This Tag' Button.
            </p>
            
            <p className="font-helvetica-neue font-normal text-[16px] leading-[23.5px] text-white">
              This Will Override The Old Tag. Now You Can Place The New Tag On Your Pet's Collar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Replacements 