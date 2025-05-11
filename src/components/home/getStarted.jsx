import React from 'react'

const GetStarted = () => {
  const steps = [
    {
      number: '01',
      title: 'Order Your Tag',
      description: 'Getting started with Digital Tails Pet Security Tag is as easy as can be! Simply place your order for our cutting-edge QR pet tag and cover the minimal postage cost.'
    },
    {
      number: '02',
      title: 'Create Pet Profile',
      description: "After receiving your tag, ensure your pet's safety by visiting our user friendly website to register. Input vital information about you and your companion with the assurance that your details will be securely protected for privacy."
    },
    {
      number: '03',
      title: 'Choose Subscription',
      description: 'For continuous pet protection, choose between our £1.99/ month subscription or a convenient yearly payment. The yearly plan comes with a discount of 20%, ensuring constant protection for your furry friend at a reduced rate.'
    },
    {
      number: '04',
      title: 'Attach Tag to Your Pet',
      description: "After registering and setting up your subscription, simply attach the PetSecure Tag securely to your pet's collar. Now, you're good to go on your adventures, with the assurance that your pet's safety is well taken care of"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="mb-16">
        <p className="font font-bold text-[14px] sm:text-[16px] leading-[18px] sm:leading-[22px] text-[#4CB2E2] mb-2 sm:mb-4 text-center sm:text-left">
          HOW IT WORKS
        </p>
        <h2 className="font font-bold text-[32px] sm:text-[48px] leading-[42px] sm:leading-[63.98px] text-[#4CB2E2] text-center sm:text-left">
          Get Started with 4 Easy Steps
        </h2>
      </div>

      {/* Steps Grid - Changed to flex with overflow for mobile */}
      <div className="flex md:grid md:grid-cols-4 gap-8 overflow-x-auto pb-4 md:overflow-visible md:pb-0">
        {steps.map((step, index) => (
          <div key={index} className="relative flex-shrink-0 w-[300px] md:w-auto">
            {/* Step Card */}
            <div className="w-[300px] sm:w-[320px] md:w-[264px] h-[280px] sm:h-[300px] md:h-[232px] bg-white rounded-[8px] shadow-sm p-4">
              {/* Number Box */}
              <div className="w-[48px] h-[48px] bg-[#FDD30F] rounded-[8px] flex items-center justify-center mb-4">
                <span className="font-helvetica-neue font-bold text-[18px]">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-helvetica-neue font-bold text-[24px] leading-[31.99px] capitalize mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-helvetica-neue font-normal text-[16px] leading-[150%] text-[#77808B]">
                {step.description}
              </p>
            </div>

            {/* Arrow Icon - Show for all except last card on desktop only */}
            {index < steps.length - 1 ? (
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <img src="/home/right-icon.svg" alt="Right Arrow" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetStarted