import React from 'react'

const ServicesInfo = () => {
  return (
    <div className="max-w-9xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-[957px] mx-auto bg-[#4CB2E2] rounded-[8px] px-4 sm:px-8 md:px-12 py-4 sm:py-6">
        <h2 className="font-helvetica-neue font-semibold text-[16px] sm:text-[22px] md:text-[20px] text-white text-center sm:text-left mb-2">
         Setting up your Digital Tail smart tag
        </h2>
        <p className="font-helvetica-neue text-[16px]  text-white text-center sm:text-left capitalize">
        Once your tag arrives, simply scan it to create your pet’s profile! For just £2.75 per month or £28.99 a year, you’ll unlock all features and keep your pet safe and connected.
        </p>  
      </div>
      
      <div className="flex flex-wrap justify-center gap-16 mt-20">
        <div className="w-full sm:w-auto">
          <img 
            src="/home/dog-1.jpeg" 
            alt="Dog with tag" 
            className="w-full max-w-[400px] h-auto mx-auto rounded-lg object-cover"
          />
        </div>
        <div className="w-full sm:w-auto">
          <img 
            src="/home/dog-2.jpeg" 
            alt="Cat with tag" 
            className="w-full max-w-[400px] h-auto mx-auto rounded-lg object-cover"
          />
        </div>
        <div className="w-full sm:w-auto">
          <img 
            src="/home/dog-1.jpeg" 
            alt="Second dog with tag" 
            className="w-full max-w-[400px] h-auto mx-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesInfo;
