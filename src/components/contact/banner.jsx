import React from 'react'

const Banner = () => {
  return (
    <>
    <div className="relative w-full min-h-[300px] sm:min-h-[550px] md:h-[400px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/contact/banner.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability - darker on mobile */}
        <div className="absolute inset-0 bg-black/40 sm:bg-black/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-[600px] py-12 sm:py-16 md:py-0">
          {/* Title */}
          <h1 className="font-helvetica-neue font-medium 
            text-[32px] sm:text-[40px] md:text-[48px] 
            leading-[100%] capitalize text-white 
            mb-4 sm:mb-6"
          >
            Contact Us
          </h1>

          {/* Description */}
          <p className="font-helvetica-neue font-normal 
            text-[14px] sm:text-[16px] 
            leading-[140%] sm:leading-[100%] 
            tracking-[0.04em] capitalize 
            text-white/90 max-w-[500px]"
          >
            Lorem ipsum dolor sit amet consectetur. Habitasse egestas 
            scelerisque rutrum quis amet mi. Facilisis gravida 
            scelerisque nisi adipiscing vitae adipiscing proin morbi ut. 
            Cursus in dapibus vitae nullam a dolor ut sapien. Commodo 
            sed pellentesque mauris in.
          </p>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Banner
