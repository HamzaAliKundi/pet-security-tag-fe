import React from 'react'

const GetInfo = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow-md mt-12 mb-16">
      <h1 className="font-helvetica-neue font-bold text-[32px] md:text-[40px] text-[#FDD30F] mb-6 leading-tight">
        Free Service for Age 65+
      </h1>
      <div className="font-helvetica-neue text-lg md:text-xl text-[#283646] leading-relaxed w-full">
        <p className="mb-6 text-[#0F2137] text-[20px] md:text-[22px] font-semibold">
          If you're 65 or older, you're eligible to receive our complete service absolutely free!
          <br />To get started, simply email us proof of your age for verification.
        </p>
        <div className="mb-6 bg-[#F0F0F0] rounded-xl p-5">
          <span className="font-bold text-[#4CB2E2] text-lg">Accepted documents:</span>
          <p className="mt-2 text-base md:text-lg text-[#283646]">A valid driver's license or passport. Once your age is verified, we'll get in touch and set up your FREE account.</p>
        </div>
        <p className="mb-4 text-[#B89D0B] text-base md:text-lg font-semibold">
          For your privacy, your document will be permanently deleted after it's reviewed—we do not keep any copies.
        </p>
        <div className="mb-4">
          <span className="font-bold text-[#0F2137]">Please note:</span> <span className="text-[#283646]">This offer applies to <span className="font-bold">one pet account only</span>.<br />If you have more than one pet, you'll need to upgrade to our Gold package. However, we're happy to offer you a <span className="font-bold text-[#FDD30F]">35% discount</span> on the upgrade!</span>
        </div>
        <p className="mt-8 font-bold text-[#4CB2E2] text-lg md:text-xl">
          Email us at: <a href="mailto:verification@digitaltails.com" className="underline text-[#0F2137]">verification@digitaltails.com</a>
        </p>
      </div>
    </div>
  )
}

export default GetInfo