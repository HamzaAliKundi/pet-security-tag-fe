import React, { useState } from 'react'

const Faqs = () => {
    const [openFaq, setOpenFaq] = useState(-1) // First FAQ open by default

    const faqData = [
        {
            question: 'What Is PetSecure Tag And How It Works?',
            answer: 'PetSecure Tag is a smart pet identification system that uses QR technology to help locate lost pets quickly and efficiently.'
        },
        {
    question: 'Is Having A Pet Tag A Legal Requirement In The UK?',
    answer: "Yes, it is a legal requirement in the UK to have a pet tag on a dog in public.<br><br>According to the Control of Dogs Order 1992, all dogs must wear a collar and ID tag when out in public, which must detail their owner’s name and address. This dog ID tags UK law applies whether your dog is on a lead or not. Contravention of this order is an offence and risks a fine of up to £2000.<br><br>If your dog is involved in an altercation, an accident, or runs off, a dog ID tag is the quickest way for someone to contact you about your dog."
},
        {
            question: 'Can I Use PetSecure Tag Alongside Microchipping?',
            answer: 'Yes, PetSecure Tag works perfectly alongside microchipping, providing an additional layer of security for your pet.'
        },
        {
            question: "How Do I Update My Pet's Information On The Tag?",
            answer: "You can easily update your pet's information through our secure online portal at any time."
        },
        {
            question: 'What Happens If I Have More Than One Pets',
            answer: 'We offer multi-pet packages and you can manage all your pets from a single account.'
        }
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 overflow-x-hidden">
            <div className="flex flex-col lg:flex-row justify-between">
                {/* Left Section */}
                <div className="lg:w-1/ 3">
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
                <div className="lg:w-[700px] space-y-6 mt-10 lg:mt-0 w-full">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-300 ${openFaq === index
                                    ? 'bg-[#4CB2E2] border border-[#FDD30F] rounded-[16px] p-8'
                                    : 'cursor-pointer'
                                }`}
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                            {/* Question */}
                            <div className="flex items-center justify-between">
                                <h3 className={`font-helvetica-neue ${openFaq === index
                                        ? 'font-bold text-white'
                                        : 'font-normal text-[#2D2D2D]'
                                    } text-[22px] leading-[100%] capitalize pr-2`}
                                >
                                    {faq.question}
                                </h3>

                                {/* Toggle Icon */}
                                <button className="flex-shrink-0 ml-2">
                                    {openFaq === index ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_53_101)">
                                                <path d="M16.875 11.25H7.125C6.711 11.25 6.375 11.586 6.375 12C6.375 12.414 6.711 12.75 7.125 12.75H16.875C17.289 12.75 17.625 12.414 17.625 12C17.625 11.586 17.289 11.25 16.875 11.25Z" fill="white" />
                                                <path d="M12 0.75C5.78662 0.75 0.75 5.78662 0.75 12C0.75 18.2134 5.78662 23.25 12 23.25C18.2134 23.25 23.25 18.2134 23.25 12C23.25 5.78662 18.2134 0.75 12 0.75ZM12 21.75C6.624 21.75 2.25 17.376 2.25 12C2.25 6.624 6.624 2.25 12 2.25C17.376 2.25 21.75 6.624 21.75 12C21.75 17.376 17.376 21.75 12 21.75Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_53_101">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_53_97)">
                                                <path d="M12.0979 0.75C5.88453 0.75 0.8479 5.78662 0.8479 12C0.8479 18.2134 5.88453 23.25 12.0979 23.25C18.3113 23.25 23.3479 18.2134 23.3479 12C23.3479 5.78662 18.3109 0.75 12.0979 0.75ZM12.0979 21.75C6.72153 21.75 2.3479 17.376 2.3479 12C2.3479 6.624 6.72153 2.25 12.0979 2.25C17.4743 2.25 21.8479 6.624 21.8479 12C21.8479 17.376 17.4739 21.75 12.0979 21.75Z" fill="#EAEFF3" />
                                                <path d="M16.7854 11.0625H12.8479V7.125C12.8479 6.711 12.5119 6.375 12.0979 6.375C11.6839 6.375 11.3479 6.711 11.3479 7.125V11.0625H7.4104C6.9964 11.0625 6.6604 11.3985 6.6604 11.8125C6.6604 12.2265 6.9964 12.5625 7.4104 12.5625H11.3479V16.5C11.3479 16.914 11.6839 17.25 12.0979 17.25C12.5119 17.25 12.8479 16.914 12.8479 16.5V12.5625H16.7854C17.1994 12.5625 17.5354 12.2265 17.5354 11.8125C17.5354 11.3985 17.1994 11.0625 16.7854 11.0625Z" fill="#EAEFF3" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_53_97">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Answer */}
                            {openFaq === index && (
                                <p className="font-helvetica-neue font-normal text-[16px] leading-[23.5px] text-white capitalize mt-4">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Faqs
