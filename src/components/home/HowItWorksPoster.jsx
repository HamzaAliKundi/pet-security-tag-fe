import React from 'react';

const HowItWorksPoster = () => {
  return (
    <div className="w-full flex flex-col items-center py-8 px-4">
      <img
        src="/global/how-it-works-1.png"
        alt="How it works - Digital Tails Pet Security Tag"
        className="max-w-[950px] w-full h-auto object-contain"
      />
      <div className="mt-5 max-w-[950px] w-full rounded-[14px] border border-[#F3D35A] bg-gradient-to-r from-[#FFF8D9] via-[#FFFDF3] to-[#EAF8FF] px-4 py-3 shadow-[0_6px_18px_rgba(76,178,226,0.15)]">
        <p className="text-center font-helvetica-neue text-[16px] sm:text-[17px] leading-[1.65] text-[#1D2F40]">
          <span className="font-bold text-[#4CB2E2]">Important:</span> Make sure all your details are up to date, so reuniting with your pet stays{' '}
          <span className="font-bold text-[#1B7FAF]">simple</span>,{' '}
          <span className="font-bold text-[#1B7FAF]">fast</span>, &amp;{' '}
          <span className="font-bold text-[#1B7FAF]">stress free</span>.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksPoster;
