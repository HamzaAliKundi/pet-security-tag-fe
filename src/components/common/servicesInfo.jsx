import React from 'react'

const ServicesInfo = () => {
  return (
    <div className="max-w-9xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-[957px] mx-auto bg-[#4CB2E2] rounded-[8px] px-4 sm:px-8 md:px-12 py-4 sm:py-6">
        <h2 className="font-helvetica-neue font-semibold text-[16px] sm:text-[22px] md:text-[20px] text-white text-center sm:text-left mb-2">
          Setting Up Your PawTag
        </h2>
        <p className="font-helvetica-neue text-[16px]  text-white text-center sm:text-left capitalize">
          Once Your Tag Arrives, Scan It To Set Up Your Pet's Profile. For Just £2.75/month Or One Payment Of £28.99 Yearly, You Can Activate Your Tag And Access All The Features To Keep Your Pet Safe.
          Seniors Age 65+ Get Any Package For Free!
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
