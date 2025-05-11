import React from 'react'

const Services = () => {
  const services = [
    {
      icon: '⚡',
      image: '/home/alert.svg',
      title: '⚡ instant location alerts',
      description: "Stay informed about your pet's whereabouts instantly. when someone scans your pet's pawtag, you'll receive an immediate notification with their location. never worry about losing track of your furry friend again."
    },
    {
      icon: '🌧️',
      image: '/home/alert.svg',
      title: '🌧️ durable design',
      description: "Stay informed about your pet's whereabouts instantly. when someone scans your pet's pawtag, you'll receive an immediate notification with their location. never worry about losing track of your furry friend again."
    },
    {
      icon: '📱',
      image: '/home/alert.svg',
      title: '📱 simple setup',
      description: "Stay informed about your pet's whereabouts instantly. when someone scans your pet's pawtag, you'll receive an immediate notification with their location. never worry about losing track of your furry friend again."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      {/* Notice Banner */}
      <div className="w-full max-w-[957px] mx-auto bg-[#4CB2E2] rounded-[8px] px-4 sm:px-8 md:px-12 py-4 sm:py-6">
        <p className="font-['Helvetica_Neue'] font-medium text-[14px] sm:text-[16px] md:text-[20px] text-white text-center sm:text-left">
         <span className='font-bold'> Notice: </span> if you are age 65 and over you can have any package for free - add link to explain how it works and
          <a href="#how-it-works" className="underline ml-1 hover:text-blue-100">
          Order Tag
          </a>
          <span  className="ml-1 hover:text-blue-100">
             option on same page
          </span>
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16 justify-items-center">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="w-full max-w-[350px] sm:max-w-[340px] md:max-w-[387px] bg-[#E6F7FF] rounded-[20px] flex flex-col items-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12"
          >
            {/* Icon Circle */}
            <div className="w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px] flex items-center justify-center mb-4 sm:mb-6">
                <img src={service.image} alt="image" className="w-full h-full object-contain" />
            </div>

            {/* Title */}
            <h3 className="font-['Helvetica_Neue'] font-bold text-[18px] sm:text-[20px] md:text-[22px] leading-[24px] sm:leading-[28px] md:leading-[30px] text-center capitalize mb-2 sm:mb-3 md:mb-4">
              {service.title}
            </h3>

            {/* Description */}
            <p className="font-['Helvetica_Neue'] font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[25px] text-center capitalize">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
