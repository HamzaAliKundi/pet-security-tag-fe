import React from 'react'

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="prose prose-lg max-w-none">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[100%] text-black mb-4">
            About Us
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            At Digital Tails, we're not a big corporation we're a small UK-based company with a big passion for pets. As proud owners of two cats ourselves, we understand the stress, worry, and heartache that comes when a beloved cat or dog goes missing. That's exactly why we created Digital Tails: to give pet owners peace of mind and a reliable way to keep their pets safe.
          </p>

          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            We believe that protecting your pet shouldn't break the bank. Unlike other brands that overcharge for basic services, we provide real value at a fair price, with a platform designed to be simple, effective, and packed with features. From smart pet tags to instant alerts when your pet's tag is scanned, we focus on giving you better service, better tools, and better results.
          </p>

          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            But Digital Tails is about more than just technology, we want to build a connected community of pet lovers. Our goal is to create a safe, caring space where pets are protected, owners are supported, and everyone can share in the joy of keeping pets happy and safe.
          </p>

          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            Whether you have a dog, a cat, or multiple furry family members, Digital Tails is here to provide a cost effective, reliable, and community driven solution that gives you peace of mind and keeps your pets close, even when they wander.
          </p>

          <p className="font-helvetica-neue font-bold text-base sm:text-lg leading-relaxed text-[#333333] mt-8">
            Because at Digital Tails, your pet's safety is our mission.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

