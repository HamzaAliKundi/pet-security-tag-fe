import React from 'react'

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Left Side */}
      <div className="w-full flex justify-end md:max-w-[600px]">
        <div>
        <h1 className="font-['Helvetica_Neue'] font-bold text-[50px] md:text-[99px] leading-[50px] md:leading-[91px] tracking-[-0.04em]">
          The Fastest<br />
          <span className="text-[#FDD30F]"> <span className="text-black">Way To</span> Find</span><br />
          <span className="text-[#FDD30F]">Your Pet</span>
        </h1>
        <p className="mt-4 text-gray-500 max-w-md font-['Helvetica_Neue'] font-bold text-sm md:text-base leading-[136%] tracking-[0.01em] capitalize">
          Age 65+ Get Our Complete Service For Free! If You're 65 Or Older, You Can Get A Free Account With All Our Services. Simply Send Us Your Proof Of ID Via Email And We'll Guide You Through The Quick Activation Process. We're Here To Make Pet Safety Accessible For Our Senior Community.
        </p>
 
        <div className="mt-8 flex flex-col gap-4">
          <a
            href="#"
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full text-center shadow-md transition text-sm md:text-base"
          >
            FREE TAG, JUST PAY SHIPPING £2.99
          </a>
          <a
            href="#"
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 md:py-3 px-4 md:px-6 rounded-full text-center shadow-md transition text-sm md:text-base"
          >
            ORDER YOUR TAG TODAY!
          </a>
        </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full mt-8 md:mt-12 lg:w-1/2 flex flex-col items-center relative">
        <div className="relative w-full px-4 md:px-0">
          {/* Dog Image */}
          <img
            src="/home/hero/dog.svg"
            alt="Dog with tag"
            className="w-full max-w-[500px] lg:max-w-[700px] h-auto mx-auto"
          />
          {/* Blue gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#FFFFFF] to-transparent"></div>
        </div>
        {/* Review Badge */}
        <div className="absolute bottom-4 md:bottom-8 lg:bottom-4 right-4 md:right-8 lg:-right-48 transform lg:-translate-x-1/2">
          <img 
            src="/home/hero/reviews.svg" 
            alt="Customer reviews" 
            className="w-[200px] h-[80px] md:w-[300px] md:h-[100px] lg:w-[300px] lg:h-[112px]"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
