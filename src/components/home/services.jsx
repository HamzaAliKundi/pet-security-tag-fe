import React from 'react'

const Services = () => {
  const services = [
    {
      icon: '⚡',
      image: '/home/alert.svg',
      title: '⚡ instant location alerts',
      description: "Your pet can't call you but their tag can. When someone scans your Digital Tails tag, you're immediately notified with their location via text message, helping reunite you with your furry family member faster."
    },
    {
      icon: '🌧️',
      image: '/home/alert.svg',
      title: '🌧️ durable design',
      description: "Built for every adventure, our smart pet tags are fully waterproof and made to last. Each tag is protected by a strong outer metal ring and sealed in epoxy, keeping it safe in all weather conditions. And for extra peace of mind, if your tag is ever lost or damaged, we'll replace it for free. Just message us."
    },
    {
      icon: '📱',
      image: '/home/alert.svg',
      title: '📱 simple setup',
      description: "Setting up your Digital Tails tag is quick and easy. Simply place your order, wait for your tag to arrive, then scan it with your phone. You'll be guided to our website to complete your signup, it only takes 1–2 minutes."
    },
    {
      icon: '💰',
      image: '/home/alert.svg',
      title: '💰 Pricing',
      description: "To keep your pet protected, we charge a small monthly fee. This helps us cover the cost of running our technology and software, so we can continue keeping your furry friend safe. If you'd like to save more, we also offer discounted yearly and one-off lifetime plans. We've genuinely made Digital Tails as affordable as possible and with one account, you can protect up to 5 pets at no extra cost."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      {/* Notice Banner */}
      {/* <div className="w-full max-w-[957px] mx-auto bg-[#4CB2E2] rounded-[8px] px-4 sm:px-8 md:px-12 py-4 sm:py-6">
        <p className="font-helvetica-neue font-medium text-[14px] sm:text-[16px] md:text-[20px] text-white text-center sm:text-left">
         <span className='font-bold'> Notice: </span> if you are age 65 and over you can have any package for free - add link to explain how it works and
          <a href="#how-it-works" className="underline ml-1 hover:text-blue-100">
          Order Tag
          </a>
          <span  className="ml-1 hover:text-blue-100">
             option on same page
          </span>
        </p>
      </div> */}

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="w-full bg-[#E6F7FF] rounded-[20px] flex flex-col px-6 md:px-8 py-6 md:py-8 h-full"
          >
            {/* Icon and Title Row */}
            <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
              {/* Icon Circle */}
              <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] flex items-center justify-center flex-shrink-0">
                <img src={service.image} alt="image" className="w-full h-full object-contain" />
              </div>

              {/* Title */}
              <h3 className="font-helvetica-neue font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-tight flex-grow">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="font-helvetica-neue font-normal text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
