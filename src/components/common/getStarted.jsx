import React from 'react'
import { useLocalization } from '../../context/LocalizationContext'

const GetStarted = () => {
  const { subscriptionPrices, isLocalizing } = useLocalization()
  
  const steps = [
    {
      number: '01',
      title: 'Order Your Tag',
      description: 'Get your Digital Tails smart pet tag for free, you just cover a small shipping fee. Each tag is uniquely coded, durable, and designed for everyday use. Once ordered, it’s shipped directly to you, ready to be activated for your pet.'
    },
    {
      number: '02',
      title: ' Scan & Create Profile',
      description: "Once you receive your smart tags, setting them up is easy. Simply scan the tag and you’ll be redirected to our website to complete the activation. If you’ve ordered multiple pet tags, please scan each tag individually to activate them."
    },
    {
      number: '03',
      title: 'Choose Subscription',
      description: `Select a subscription plan that works for you. We charge a small monthly fee to help cover the costs of our software and technology that keep your pet safe. For more flexibility, we also offer yearly plans for better savings, or a one time lifetime plan for long term protection without ongoing payments.`
    },
    {
      number: '04',
      title: 'Attach Tag to Your Pet',
      description: "After setting up and activating your pet’s tag, simply attach it to your pet’s collar. Now they’re ready for any adventure, knowing they are protected and can be easily found if they get lost or run off. Simple, effective, and peace of mind in one small tag!"
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
              <h3 className="font-helvetica-neue font-bold text-[#283646] text-[24px] leading-[31.99px] capitalize mb-3">
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