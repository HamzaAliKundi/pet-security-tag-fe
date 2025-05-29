import React from 'react'
import { Link } from 'react-router-dom'

const GetMoreInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row rounded-[30px] overflow-hidden shadow-lg">
        {/* Left Section - Image */}
        <div className="w-full md:w-[40%] lg:w-[473px] h-[300px] sm:h-[400px] md:h-[637px] relative rounded-t-[30px] md:rounded-t-none md:rounded-l-[30px] overflow-hidden">
          <img 
            src="/home/man.svg" 
            alt="Senior with their pet cat" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div 
          className="w-full md:w-[60%] lg:w-[714px] h-auto sm:h-[350px] md:h-[637px] bg-gray-100/80 rounded-b-[30px] md:rounded-b-none md:rounded-r-[30px] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center"
        >
          {/* Title */}
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[32px] md:text-[40px] leading-[1.2] md:leading-[53.23px] tracking-[-1.45px] text-center text-[#0F2137] capitalize max-w-[600px] mb-4 sm:mb-6 md:mb-8 px-2">
            Age 65+ Get Our Complete Service For Free!
          </h2>

          {/* Button with Gradient using Tailwind */}
          <Link
            to="/get-info"
            className="w-full max-w-[268px] h-[46px] sm:h-[56px] rounded-full px-6 sm:px-8 py-3 sm:py-4 text-black font-helvetica-neue font-bold text-[12px] sm:text-[14px] leading-[100%] uppercase
            bg-gradient-to-br from-[#FFD700] to-[#B89D0B] hover:-translate-y-0.5 transition-transform duration-200
            shadow-lg hover:shadow-xl active:translate-y-0 active:shadow-md"
          >
            Get More Information
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GetMoreInfo
