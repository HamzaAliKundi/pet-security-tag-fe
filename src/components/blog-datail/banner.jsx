import React from 'react'

const Banner = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[550px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/blog-detail/banner.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
        <div className="max-w-[488px] px-2 sm:px-0">
          {/* Pet Behaviour Badge */}
          <div className="inline-flex items-center h-[29px] px-[10px] py-[9px] gap-[8px] bg-[#FDD30F] rounded-[24px] mb-2 sm:mb-3">
            <span className="font-helvetica-neue font-medium text-xs sm:text-sm text-black">
              Pet Behaviour
            </span>
          </div>

          {/* Title */}
          <h1 className="font-helvetica-neue font-medium text-3xl sm:text-4xl md:text-[48px] leading-[110%] sm:leading-[100%] text-white capitalize mb-3 sm:mb-4">
            Are Some Dog
            <br />
            Breeds Just Smarter?
          </h1>

          {/* Description */}
          <p className="font-helvetica-neue font-normal text-sm sm:text-base leading-[130%] sm:leading-[100%] text-white capitalize mb-4 sm:mb-6 max-w-[488px]">
            Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi. Facilisis gravida scelerisque nisi adipiscing vitae adipiscing proin morbi ut. Cursus in dapibus vitae nullam a dolor ut sapien. Commodo sed pellentesque mauris in.
          </p>

          {/* Info Section */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {/* Date */}
            <div className="flex items-center gap-2">
              <img src="/blog-detail/calendar.svg" alt="Calendar" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-helvetica-neue font-normal text-[12px] sm:text-[14px] leading-[111%] text-white capitalize">
                Mar 11, 2024
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2">
              <img src="/blog-detail/user.svg" alt="Author" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-helvetica-neue font-normal text-[12px] sm:text-[14px] leading-[111%] text-white capitalize">
                By Jacob Kennedy
              </span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-2">
              <img src="/blog-detail/comments.svg" alt="Comments" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-helvetica-neue font-normal text-[12px] sm:text-[14px] leading-[111%] text-white capitalize">
                0 Comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
