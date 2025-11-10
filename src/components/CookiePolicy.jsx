import React from 'react'

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="prose prose-lg max-w-none">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[100%] text-black mb-4">
            🍪 Digital Tails – Cookie Policy
          </h1>
          <p className="font-helvetica-neue font-normal text-base text-[#6E6E6E]">
            Last updated: 5th Nov 2025
          </p>
        </div>

        <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-8">
          Digital Tails uses cookies to improve your browsing experience and understand how visitors use our site.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            1. What Are Cookies?
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            Cookies are small text files placed on your device to help our website function properly and remember your preferences.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            2. Types of Cookies We Use
          </h2>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li><strong>Essential cookies:</strong> Required for site functionality (e.g., login, checkout).</li>
            <li><strong>Analytics cookies:</strong> Help us understand site performance and improve usability.</li>
            <li><strong>Marketing cookies:</strong> Used to deliver relevant offers and ads.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            3. Managing Cookies
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            When you visit our site, you can choose to accept or reject non-essential cookies via our cookie banner. You can also change your settings in your browser at any time.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            4. Contact Us
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            For any questions about cookies, please email: <a href="mailto:info@digitaltails.com" className="text-[#4CB2E2] hover:underline">info@digitaltails.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default CookiePolicy

