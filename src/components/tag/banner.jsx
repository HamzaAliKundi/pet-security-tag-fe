import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-[590px] flex flex-col">
            {/* Limited Time Badge */}
            <div className="inline-flex items-center w-fit h-auto py-[3px] sm:py-[5px] px-[8px] sm:px-[10px] gap-[8px] bg-[#FDD30F] rounded-[24px]">
              <span className="font-helvetica-neue font-bold text-sm sm:text-base leading-[136%] text-black capitalize">
                Free For A Limited Time
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-helvetica-neue font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[99px] leading-tight sm:leading-[91px] tracking-[-4%] text-black">
              Get a Smart{' '}
              <span className="text-[#FDD30F]">
                PetSecure
                <br />
                Tag
              </span>{' '}
              For Your
              <br />
              Pet
            </h1>

            {/* Description */}
            <p className="font-helvetica-neue font-normal text-sm sm:text-base leading-[136%] text-[#0F2137] capitalize max-w-[500px] mt-2 sm:mt-4">
              Petsecure Tag Uses Smart QR Technology To Ensure Your Pets' Safety. Instantly Receive Their Location When The Tag Is Scanned.
            </p>

            {/* Price */}
            <div className="mt-2 sm:mt-4">
              <span className="font-helvetica-neue font-medium text-lg sm:text-[24px] leading-[136%] text-[#4CB2E2] capitalize">
                £1.49 Free
              </span>
            </div>

            {/* CTA Button */}
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to="/order"
              className="mt-4 sm:mt-8 w-full sm:w-[300px] md:w-[387px] h-[50px] sm:h-[74px] bg-[#4CB2E2] rounded-[100px] px-4 sm:px-6 flex items-center justify-center"
            >
              <span className="font-helvetica-neue font-bold text-lg sm:text-[24px] leading-[100%] text-white uppercase">
                Order a FREE Tag →
              </span>
            </Link>
          </div>

          {/* Right Section - Tag Image */}
          <div className="w-full lg:w-[590px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[618px] flex items-center justify-center mt-8 lg:mt-0">
            <img 
              src="/faqs/tag.svg" 
              alt="PetSecure Tag" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default Banner
