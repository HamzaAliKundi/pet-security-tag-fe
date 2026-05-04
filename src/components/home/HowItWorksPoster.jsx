import React from 'react';

const HowItWorksPoster = () => {
  return (
    <div className="w-full py-8 sm:py-12 md:py-16">
      <img
        src="/global/how-it-works-1.png"
        alt="How it works - Digital Tails Pet Security Tag"
        className="w-full h-auto object-contain block"
      />
      <div className="mt-5 max-w-7xl mx-auto px-4">
        <div className="max-w-[950px] w-full mx-auto rounded-[14px] border border-[#F3D35A] bg-gradient-to-r from-[#FFF8D9] via-[#FFFDF3] to-[#EAF8FF] px-4 py-3 shadow-[0_6px_18px_rgba(76,178,226,0.15)]">
          <p className="text-center font-helvetica-neue text-[14px] sm:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#1D2F40]">
            <span className="font-bold text-[#4CB2E2]">Important:</span> Make sure all your details are up to date, so reuniting with your pet stays{' '}
            <span className="font-bold text-[#1B7FAF]">simple</span>,{' '}
            <span className="font-bold text-[#1B7FAF]">fast</span>, &amp;{' '}
            <span className="font-bold text-[#1B7FAF]">stress free</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPoster;
