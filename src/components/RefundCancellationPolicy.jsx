import React from 'react'

const RefundCancellationPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="prose prose-lg max-w-none">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[100%] text-black mb-4">
            💳 Digital Tails – Refund & Cancellation Policy
          </h1>
          <p className="font-helvetica-neue font-normal text-base text-[#6E6E6E]">
            Last updated: 5th Nov 2025
          </p>
        </div>

        <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-8">
          We want you to be happy with your purchase. This policy explains how refunds and cancellations work for our products and subscriptions.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            1. Subscription Services
          </h2>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>You can cancel your subscription at any time through your account dashboard.</li>
            <li>If you cancel within 14 days of purchase (and haven't used the service), you're entitled to a full refund.</li>
            <li>After 14 days, you can cancel future renewals, but past payments are non-refundable.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            2. Physical Products (Pet Tags)
          </h2>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>If your item arrives damaged or incorrect, please contact us within 14 days for a replacement or refund.</li>
            <li>Return shipping costs may apply unless the item was faulty or sent in error.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            3. How to Request a Refund
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            Email <a href="mailto:info@digitaltails.com" className="text-[#4CB2E2] hover:underline">info@digitaltails.com</a> with your order number and reason for refund. We'll respond within 1-2 working days.
          </p>
        </section>
      </div>
    </div>
  )
}

export default RefundCancellationPolicy

