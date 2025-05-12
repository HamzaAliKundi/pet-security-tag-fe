import React, { useState } from 'react'

const Delivery = () => {
  const [openItem, setOpenItem] = useState(1) // Setting second item open by default as shown in image

  const deliveryData = [
    {
      question: 'What Is The Refund Policy?',
      answer: 'Our refund policy ensures customer satisfaction. If you are not satisfied with your purchase, you can return it within 30 days for a full refund.'
    },
    {
      question: 'How Much Does Shipping Cost?',
      answer: 'For A Nominal Fee Of £1.49, Enjoy The Convenience Of Next-Day Delivery On Orders Placed Before 4pm On Weekdays.'
    },
    {
      question: 'When Will My Pawtag Arrive?',
      answer: 'Your Pawtag will typically arrive within 1-2 business days when ordered before 4pm on weekdays.'
    },
    {
      question: 'Where Do You Deliver Pawtags?',
      answer: 'We deliver Pawtags across the entire United Kingdom, including mainland UK and Northern Ireland.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 overflow-x-hidden">
      <div className="flex justify-center items-center mb-12">
        <h1 className="font-helvetica-neue font-bold text-[40px] leading-[53.23px] text-[#0F2137] tracking-[-1.45px] text-center">
          Delivery & Returns
        </h1>
      </div>

      {/* Delivery Items */}
      <div className="max-w-[800px] mx-auto space-y-6">
        {deliveryData.map((item, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              openItem === index
                ? 'bg-[#4CB2E2] border border-[#FDD30F] text-[#0F2137] rounded-[16px] p-8'
                : 'cursor-pointer'
            }`}
            onClick={() => setOpenItem(openItem === index ? null : index)}
          >
            {/* Question */}
            <div className="flex items-center justify-between">
              <h3 
                className={`font-helvetica-neue ${
                  openItem === index
                    ? 'font-bold text-white'
                    : 'font-normal text-[#2D2D2D]'
                } text-[22px] leading-[100%] capitalize pr-2`}
              >
                {item.question}
              </h3>

              {/* Paw Print Icon */}
              <button className="flex-shrink-0 ml-2">
                {openItem === index ? (
                  <img src="/faqs/foot-white.svg" alt="Paw print white" />
                ) : (
                  <img src="/faqs/foot.svg" alt="Paw print" />
                )}
              </button>
            </div>

            {/* Answer */}
            {openItem === index && (
              <p className="font-helvetica-neue font-normal text-[16px] leading-[23.5px] text-white capitalize mt-4">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Delivery