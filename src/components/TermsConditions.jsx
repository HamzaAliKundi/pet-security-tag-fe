import React from 'react'

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="prose prose-lg max-w-none">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[100%] text-black mb-4">
            Digital Tails – Terms & Conditions
          </h1>
          <p className="font-helvetica-neue font-normal text-base text-[#6E6E6E]">
            Last updated: 5th Nov 2025
          </p>
        </div>

        <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-8">
          These Terms & Conditions govern your use of the Digital Tails website and services. By using our site or purchasing our products, you agree to these terms.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            1. About Us
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-2">
            <strong>Digital Tails Services Ltd</strong>
          </p>
          <ul className="list-none space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li><strong>Address:</strong> 10 Easterdale, Greater Manchester, OL4 1NU, UK</li>
            <li><strong>Email:</strong> <a href="mailto:info@digitaltails.com" className="text-[#4CB2E2] hover:underline">info@digitaltails.com</a></li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            2. Our Services
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            Digital Tails provides smart QR pet tags and a connected online profile that helps reunite lost pets with their owners.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            3. Subscriptions & Payments
          </h2>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>Subscription payments are processed securely via our payment partners.</li>
            <li>You agree to provide accurate billing information.</li>
            <li>Subscriptions renew automatically unless cancelled through your account.</li>
            <li>You can cancel at any time — see our Refund & Cancellation Policy for details.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            4. Use of Service
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            You agree not to misuse our website or services. Any fraudulent, abusive, or illegal activity may result in account suspension.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            5. Liability
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            We aim to provide a reliable service but cannot guarantee that every lost pet will be found. We're not liable for any indirect loss, such as emotional distress or consequential damages.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            6. Intellectual Property
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            All content, logos, and materials on our website belong to Digital Tails Services Ltd. You may not copy or reproduce them without permission.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            7. Governing Law
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            These terms are governed by the laws of England and Wales. Any disputes will be handled in UK courts.
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsConditions

