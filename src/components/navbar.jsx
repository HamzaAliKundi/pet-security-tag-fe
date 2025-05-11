import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full h-20 bg-white shadow-sm flex items-center  left-0 z-50">
      <div className="max-w-[1440px] w-full mx-auto px-5 flex items-center justify-between">
        {/* Left: Logo and GET YOUR PET TAG button */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center">
              {/* D with paw icon */}
              <span className="relative flex items-center mr-1">
               <img src="/resuable/logo.svg" alt="logo" />
              </span>
            </div>
          </div>
          {/* GET YOUR PET TAG button (hidden on mobile) */}
          <button className="bg-[#4CB2E2] text-white font-bold text-sm px-8 py-2 rounded-full border-2 border-[#4CB2E2] hover:bg-[#3da1d1] transition-all hidden lg:block">GET YOUR PET TAG</button>
        </div>

        {/* Center: Navigation links (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="font-bold text-black">HOME</a>
          <a href="#" className="text-black font-normal">FAQS</a>
          <a href="#" className="text-black font-normal">PET TAG</a>
          <a href="#" className="text-black font-normal">CONTACT US</a>
        </div>

        {/* Right: Login button (hidden on mobile) */}
        <button className="bg-[#4CB2E2] text-white font-bold px-8 py-2 rounded-full border-2 border-[#FDD30F] hover:bg-[#3da1d1] transition-all hidden md:block">LOGIN NOW</button>

        {/* Hamburger menu button (mobile only) */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#4CB2E2]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="#4CB2E2" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg z-50 animate-fade-in">
          <div className="flex flex-col items-center py-4 space-y-4">
            <a href="#" className="font-bold text-black">HOME</a>
            <a href="#" className="text-black font-normal">FAQS</a>
            <a href="#" className="text-black font-normal">PET TAG</a>
            <a href="#" className="text-black font-normal">CONTACT US</a>
            <button className="bg-[#4CB2E2] text-white font-bold px-8 py-2 rounded-full border-2 border-[#4CB2E2] hover:bg-[#3da1d1] transition-all">GET YOUR PET TAG</button>
            <button className="bg-[#4CB2E2] text-white font-bold px-8 py-2 rounded-full border-2 border-[#FDD30F] hover:bg-[#3da1d1] transition-all">LOGIN NOW</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
