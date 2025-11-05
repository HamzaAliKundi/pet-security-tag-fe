import React from 'react'

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="prose prose-lg max-w-none">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[100%] text-black mb-4">
            📦 Digital Tails – Shipping Policy
          </h1>
          <p className="font-helvetica-neue font-normal text-base text-[#6E6E6E]">
            Last updated: 5th Nov 2025
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            1. Shipping Locations
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            We currently ship to:
          </p>
          <ul className="list-none space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>🇬🇧 United Kingdom</li>
            <li>🇺🇸 United States</li>
            <li>🇨🇦 Canada</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            2. Processing & Delivery Times
          </h2>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>Orders are usually dispatched within 1-2 working days of payment.</li>
            <li>UK delivery typically takes 2-4 working days.</li>
            <li>International delivery may take 5-10 working days, depending on customs.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            3. Shipping Costs
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            Shipping costs are calculated at checkout and depend on your location.
          </p>
          <ul className="list-none space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            <li>UK orders are sent via Royal Mail</li>
            <li>United States & Canada orders are sent by [carrier name]</li>
          </ul>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            All orders are sent with tracking information, once your order has been shipped you will receive tracking info via email.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            4. Lost or Damaged Items
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            If your order hasn't arrived or is damaged, contact us at <a href="mailto:info@digitaltails.com" className="text-[#4CB2E2] hover:underline">info@digitaltails.com</a> - We'll investigate and send a replacement if needed.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            5. Customs & Import Fees
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            We will cover the cost of customs & import fees for all our international customers if they apply, you don't need to worry about this!
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            6. Contact Us
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            If you have any shipping questions, please email us at <a href="mailto:info@digitaltails.com" className="text-[#4CB2E2] hover:underline">info@digitaltails.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default ShippingPolicy

