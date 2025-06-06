import React, { useState } from 'react'

const Faqs = () => {
  const [openFaq, setOpenFaq] = useState(1)

  const faqData = [
    {
      question: 'What is PetSecure Tag And How It Works?',
      answer: 'PetSecure Tag is a smart pet identification system that uses QR technology to help locate lost pets quickly and efficiently.'
    },
    {
      question: 'Is Having A Pet Tag A Legal Requirement In The UK?',
      answer: "Yes, it is a legal requirement in the UK to have a pet tag on a dog in public.<br><br>According to the Control of Dogs Order 1992, all dogs must wear a collar and ID tag when out in public, which must detail their owner's name and address. This dog ID tags UK law applies whether your dog is on a lead or not. Contravention of this order is an offence and risks a fine of up to £2000.<br><br>If your dog is involved in an altercation, an accident, or runs off, a dog ID tag is the quickest way for someone to contact you about your dog."
    },
    {
      question: 'Can I use PetSecure Tag alongside Microchipping?',
      answer: 'Yes, PetSecure Tag works perfectly alongside microchipping, providing an additional layer of security for your pet.'
    },
    {
      question: "How do I update my pet's information on the tag?",
      answer: "You can easily update your pet's information through our secure online portal at any time."
    },
    {
      question: 'What Happens If I have More than One Pets',
      answer: 'We offer multi-pet packages and you can manage all your pets from a single account.'
    },
    {
      question: 'How Does The Tag Work?',
      answer: "The tag works by providing a unique QR code that when scanned, displays your pet's profile with your contact information."
    },
    {
      question: 'How Do The Gps Alerts Work?',
      answer: 'The GPS alerts notify you when your pet leaves a designated safe area, allowing you to track their location in real-time.'
    },
    {
      question: 'Do I Need An App To Use PetSecure Tag?',
      answer: "Yes, our free mobile app is required to set up your pet's profile and receive location alerts."
    },
    {
      question: 'Are PetSecure Tag Waterproof?',
      answer: 'Yes, PetSecure Tags are fully waterproof and designed to withstand all weather conditions and pet activities.'
    },
    {
      question: 'Is The PetSecure Tag Safe?',
      answer: 'Absolutely! The tag is made from pet-safe materials and designed to be comfortable for your pet to wear.'
    },
    {
      question: 'Which Pets Can Use A Pawtag?',
      answer: 'PetSecure Tags can be used for dogs, cats, and other pets that wear collars.'
    },
    {
      question: 'What Information Is Included In The Pet Profile?',
      answer: "The pet profile includes your contact details, pet's name, breed, medical information, and any special care instructions you choose to add."
    }
  ]
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-16">
      <div className="flex justify-center items-center mb-12">
        <h1 className="font-helvetica-neue font-bold text-[28px] sm:text-[40px] leading-[1.2] text-[#0F2137] tracking-[-1.45px] text-center px-2">
          PetSecure Tag Important Faqs
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Section */}
        <div className="lg:w-1/3 px-2">
          {/* FAQ Badge */}
          <div className="inline-flex items-center h-[34px] px-[8px] rounded-[30px] bg-[#4CB2E2] border border-[#FDD30F] mb-6">
            <span className="text-white font-bold text-sm">FAQ's</span>
          </div>

          {/* Title */}
          <h2 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[100%] text-[#2D2D2D]">
            <span className='text-[#4CB2E2]'>Got questions?</span>{' '}
            <span className="block">We've got answers!</span>
          </h2>
        </div>

        {/* Right Section - FAQs */}
        <div className="lg:w-[700px] space-y-6 mt-10 lg:mt-0 w-full px-2">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${openFaq === index
                ? 'bg-[#4CB2E2] border border-[#FDD30F] text-[#0F2137] rounded-[16px] p-8'
                : 'cursor-pointer'
                }`}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              {/* Question */}
              <div className="flex items-center justify-between">
                <h3 className={`font-helvetica-neue ${openFaq === index
                  ? 'font-bold text-white'
                  : 'font-normal text-[#2D2D2D]'
                  } text-[18px] sm:text-[22px] leading-[100%] capitalize pr-2 ${openFaq !== index ? 'font-helvetica-neue font-normal text-[18px] sm:text-[22px] leading-[100%] tracking-[0%]' : ''}`}
                >
                  {faq.question}
                </h3>

                {/* Toggle Icon */}
                <button className="flex-shrink-0 ml-2">
                  {openFaq === index ? (
                    <img src="/faqs/foot-white.svg" alt="Plus icon" />
                  ) : (
                    <img src="/faqs/foot.svg" alt="Minus icon" />
                  )}
                </button>
              </div>

              {/* Answer */}
              {openFaq === index && (
                <p 
                  className="font-helvetica-neue font-normal text-[14px] sm:text-[16px] leading-[23.5px] text-white capitalize mt-4"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faqs
