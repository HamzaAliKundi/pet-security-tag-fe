import React, { useState } from 'react'

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false)

  const pricingData = [
    {
      type: 'bronze',
      icon: '/home/bronz.svg',
      tickIcon: '/home/bronz-tick.svg',
      title: 'Bronze Package',
      subtitle: 'Save 25% On Yearly Packages',
      price: isYearly ? '£29.99/y' : '£1.45/m',
      features: [
        'Online Pet Profile',
        'FREE Tag Replacement If Lost Or Damaged',
        'Email Support',
        "What's App Support"
      ]
    },
    {
      type: 'silver',
      icon: '/home/silver.svg',
      tickIcon: '/home/silver-tick.svg',  
      title: 'Silver Package',
      subtitle: 'Save 25% On Yearly Packages',
      price: isYearly ? '£39.99/y' : '£3.45/m',
      features: [
        'Monthly £3.45 Yearly £39.99 Save 26 %',
        "Everything That's Included In Bronze Package",
        'Location Text Alerts',
        'Notify Your Vets That Your Pet Is Missing'
      ]
    },
    {
      type: 'gold',
      icon: '/home/gold.svg',
      tickIcon: '/home/gold-tick.svg',
      title: 'Gold Package',
      subtitle: 'Join The Pack - Your Pet Gets A Free Gift!',
      price: isYearly ? '£49.99/y' : '£5.45/m',
      features: [
        '£5.45 Monthly Yearly £49.99',
        "Everything That's Included In Bronze & Silver Package",
        'Phone Support',
        'Free Pet Gift When You Join',
        'Multiple Pets'
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      {/* Title Section */}
      <h2 className="font-['Helvetica_Neue'] font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-[38px] md:leading-[53.23px] tracking-[-1.45px] text-center">
        Choose Your Pricing Plan
      </h2>
      
      {/* Subtitle */}
      <p className="font-['Helvetica_Neue'] font-normal text-[14px] sm:text-[16px] leading-[120%] sm:leading-[100%] text-center capitalize mt-3 sm:mt-4 max-w-2xl mx-auto px-2">
        We charge a small monthly fee to maintain the technology &
        software to keep your pet safe
      </p>

      {/* Toggle Button */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <div className="w-[250px] sm:w-[292px] h-[50px] sm:h-[60px] bg-gray-100 rounded-md p-2 flex items-center">
          <button 
            className={`flex-1 h-[36px] sm:h-[44px] rounded-md transition-all text-sm sm:text-base ${!isYearly ? 'bg-white shadow-md' : ''}`}
            onClick={() => setIsYearly(false) ? setIsYearly(false) : null}
          >
            Monthly Plan
          </button>
          <button 
            className={`flex-1 h-[36px] sm:h-[44px] rounded-md transition-all text-sm sm:text-base ${isYearly ? 'bg-white shadow-md' : ''}`}
            onClick={() => setIsYearly(true) ? setIsYearly(true) : null}
          >
            Yearly Plan
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 sm:mt-12 md:mt-16 justify-items-center">
        {pricingData.map((plan) => (
          <div 
            key={plan.type}
            className="w-full max-w-[350px] sm:max-w-[340px] md:max-w-[386px] h-auto sm:h-[620px] md:h-[550px] rounded-[9.68px] border-[0.97px] border-gray-200 p-5 sm:p-6 md:p-8 flex flex-col"
          >
            {/* Card Icon */}
            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <img src={plan.icon} alt={plan.title} width={48} height={48} className="w-[48px] h-[48px]" />
            </div>

            {/* Card Title */}
            <h3 className="font-['Helvetica_Neue'] font-bold text-[18px] sm:text-[21.29px] leading-[100%] tracking-[-0.53px] capitalize">
              {plan.title}
            </h3>

            {/* Card Subtitle */}
            <p className="font-['Helvetica_Neue'] font-normal text-[12px] sm:text-[13.55px] leading-[115%] tracking-[-3%] capitalize text-[#666666] mt-2">
              {plan.subtitle}
            </p>

            {/* Features List */}
            <ul className="mt-6 sm:mt-8 flex-grow space-y-3 sm:space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <img src={plan.tickIcon} alt="tick" width={16} height={16} className="w-4 h-4 sm:w-[16px] sm:h-[16px] flex-shrink-0" />
                  <span className="font-['Helvetica_Neue'] text-xs sm:text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="mt-6 sm:mt-8">
              <div>
                <p className="font-['Helvetica_Neue'] font-bold text-[22px] sm:text-[27.1px] leading-[100%] text-[#2D2D2D]">
                  {plan.price}
                </p>
                <div className="flex items-center justify-between ">
                  <p className="font-['Helvetica_Neue'] font-bold text-[14px] sm:text-[15.48px] leading-[24px] sm:leading-[27.1px]">
                    ORDER YOUR TAG TODAY!
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#343D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing