import React from 'react'

const Search = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16 mt-12 md:mt-28">
      {/* Main Yellow Container */}
      <div className="w-full max-w-[957px] mx-auto bg-[#FDD30F] rounded-[16px] sm:rounded-[24px] p-6 sm:p-8 md:p-[48px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Heading */}
          <h2 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[100%] tracking-[-4%] capitalize text-center md:text-left">
            Find Your{' '}
            <br />
            <span className="text-[#4CB2E2] block md:inline">PetSecure Tag</span>
          </h2>

          {/* Search Input Container */}
          <div className="relative w-full sm:w-[263px] h-[60px] sm:h-[70px] md:h-[80px] mt-4 md:mt-0">
            <input 
              type="text"
              placeholder="Search here"
              className="w-full h-full rounded-[100px] pl-[20px] sm:pl-[32px] pr-[60px] sm:pr-[72px] py-[12px] sm:py-[16px] 
                       border-2 border-[#D9B50C] bg-[#FDD30F]
                       font-helvetica-neue font-medium text-[14px] sm:text-[16px] leading-[100%] 
                       uppercase placeholder-[#D9B50C]"
            />
            {/* Search Button */}
            <button className="absolute right-[12px] sm:right-[16px] top-1/2 -translate-y-1/2 
                           w-[40px] h-[40px] sm:w-[46px] sm:h-[48px] bg-white rounded-[40px] 
                           flex items-center justify-center">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-6 sm:h-6"
              >
                <path 
                  d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
                  stroke="#000000" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
