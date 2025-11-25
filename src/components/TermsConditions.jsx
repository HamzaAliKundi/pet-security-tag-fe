import React, { useEffect, useRef } from 'react'

const TermsConditions = () => {
  const sectionsRef = useRef([]);

  // Get today's date in readable format
  const getCurrentDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .section-item {
          opacity: 0;
        }
      `}</style>
      
      <div className="prose prose-lg max-w-none">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[100%] text-black mb-4">
            DIGITAL TAILS – TERMS OF SERVICE
          </h1>
          <p className="font-helvetica-neue font-normal text-base text-[#6E6E6E]">
            Effective Date: {getCurrentDate()}
          </p>
        </div>

        <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-8 animate-fade-in-up">
          These Terms of Service ("Terms") govern your access to and use of the Digital Tails website, mobile applications, smart pet tag products, subscription services, and any other related services provided by Digital Tails ("we," "us," or "our"). By accessing or using our services, you agree to be bound by these Terms.
        </p>

        <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-12 animate-fade-in-up">
          If you do not agree with these Terms, you must not use our services.
        </p>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 1 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            By creating an account, subscribing to any service, purchasing a product, or using our website, app, or smart pet tag features, you acknowledge that:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>You have read, understood, and agree to be bound by these Terms.</li>
            <li>You agree to all policies on our website including, without limitation, our Privacy Policy, Cookie Policy, and any other posted guidelines or policies.</li>
            <li>Your purchase and subscription signify your full acceptance of all such policies.</li>
          </ul>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 2 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            2. Service Description
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            Digital Tails provides smart pet tag services, pet profile storage, emergency contact alerts, location-based notifications, and related digital pet safety features. Availability and performance of these features may vary depending on network coverage, device compatibility, and other external factors.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 3 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            3. Geographic Coverage
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-2">
            These Terms apply to users located in the United Kingdom, United States, and Canada.
          </p>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            Your use of the services must comply with all local, state/provincial, federal, and international laws applicable to your jurisdiction.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 4 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            4. Accounts and Security
          </h2>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>You are responsible for maintaining the confidentiality of your account login details and for all activity occurring under your account.</li>
            <li>You agree to notify us immediately of any unauthorised use of your account.</li>
          </ul>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 5 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            5. Eligible Individuals
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            To use our services, you must meet the following requirements:
          </p>
          
          <div className="mb-4">
            <p className="font-helvetica-neue font-semibold text-base sm:text-lg text-[#333333] mb-2">
              a. Age Requirement
            </p>
            <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
              You must be at least 18 years old or the age of legal majority in your jurisdiction.
            </p>
          </div>

          <div className="mb-4">
            <p className="font-helvetica-neue font-semibold text-base sm:text-lg text-[#333333] mb-2">
              b. Legal Capacity
            </p>
            <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
              You must have the legal capacity to enter into a binding agreement such as these Terms.
            </p>
          </div>

          <div className="mb-4">
            <p className="font-helvetica-neue font-semibold text-base sm:text-lg text-[#333333] mb-2">
              c. Lawful Use
            </p>
            <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
              Your use of our services must not violate any applicable law, statute, or regulation in any jurisdiction.
            </p>
          </div>

          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            By subscribing or using our services, you represent and warrant that you meet all eligibility requirements. If you do not meet these criteria, you are not permitted to access or use our services.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 6 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            6. Consent to Text Message Alerts
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            By creating an account or subscribing, you expressly agree to receive text message notifications from Digital Tails, including pet alerts, updates, service notices, and emergency communications.
          </p>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-2">
            You may opt out at any time by:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>Contacting us directly, or</li>
            <li>Deleting your account via the Customer Dashboard → Account Settings.</li>
          </ul>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mt-4">
            Standard messaging rates may apply depending on your mobile plan.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 7 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            7. Subscription Billing and Auto-Renewal
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            Digital Tails operates on a subscription model.
          </p>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>All subscriptions automatically renew unless you cancel auto-renewal.</li>
            <li>You may cancel any time through your User Dashboard → Subscription Settings.</li>
            <li>Cancellation will prevent future charges but will not refund payments already processed unless required by law.</li>
          </ul>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mt-4">
            Prices, billing cycles, and terms will always be shown to you prior to purchase.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 8 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            8. User Responsibilities
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            You agree not to:
          </p>
          <ol className="list-decimal pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>Use the services for unlawful, fraudulent, harmful, or abusive purposes.</li>
            <li>Modify, copy, reverse-engineer, or exploit any part of our services.</li>
            <li>Interfere with or disrupt the security, integrity, or performance of the website, app, or infrastructure.</li>
            <li>Upload harmful code, viruses, malware, bots, or automated tools.</li>
            <li>Create accounts using false information or impersonate others.</li>
            <li>Collect or harvest other users' personal information.</li>
            <li>Use our services to stalk, harass, or endanger others.</li>
          </ol>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mt-4">
            Violation of these prohibitions may result in immediate termination of your account.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 9 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            9. Product and Service Availability
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            We reserve the right to change, discontinue, or modify any product or service without prior notice. Availability may vary depending on country, region, or carrier network.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 10 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            10. Intellectual Property
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            All content, trademarks, logos, software, text, and materials provided by Digital Tails are owned by or licensed to us. You may not reproduce, distribute, or modify any content without written permission.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 11 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            11. Third-Party Links
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            Our services may contain links to third-party websites or tools. We are not responsible for the availability, accuracy, or content of such external resources.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 12 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            12. Disclaimer of Location Data Accuracy
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            We strive to provide accurate and reliable services, including pet location alerts, but we cannot guarantee that:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>location data will be precise,</li>
            <li>signals will be uninterrupted, or</li>
            <li>third-party map data will be accurate.</li>
          </ul>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mt-4">
            Location accuracy may vary due to environmental, technical, or network factors.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 13 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            13. Errors, Inaccuracies, and Omissions
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            Occasionally, information on our website, app, or services may contain:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>typographical errors</li>
            <li>inaccuracies</li>
            <li>missing information</li>
            <li>incorrect pricing</li>
            <li>outdated details</li>
            <li>errors in product descriptions</li>
            <li>incorrect promotions or availability</li>
          </ul>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mt-4">
            We reserve the right to correct or update any such issues at any time and without notice, including after an order or subscription is placed.
          </p>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mt-2">
            Except where required by law, we have no obligation to update or clarify any information.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 14 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            14. Disclaimer of Warranties
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>Our services, website, app, and products are provided "as is" and "as available."</li>
            <li>We do not guarantee that the services will be error-free, uninterrupted, secure, or accurate.</li>
            <li>We do not guarantee the accuracy of any data, notifications, or alerts generated by the service.</li>
            <li>We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.</li>
          </ul>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mt-4">
            You use our services at your own risk.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 15 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            15. Limitation of Liability
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            Where permitted by applicable law, Digital Tails shall not be liable for:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>indirect, incidental, special, punitive, or consequential damages</li>
            <li>loss of data, loss of revenue, or lost profits</li>
            <li>any harm resulting from inaccurate alerts, device malfunction, network failures, or user misuse</li>
          </ul>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mt-4">
            Our maximum liability to you shall not exceed the amount paid for your subscription during the preceding 12 months.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 16 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            16. Indemnification
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            You agree to indemnify and hold harmless Digital Tails from any claims, losses, liabilities, damages, or costs arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li>your misuse of the services,</li>
            <li>violation of these Terms,</li>
            <li>violation of any law,</li>
            <li>infringement of any rights of a third party.</li>
          </ul>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 17 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            17. Termination
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-2">
            We may suspend or terminate your account at any time for violations of these Terms or misuse of the services.
          </p>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            You may terminate your account at any time by deleting it through your customer dashboard.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 18 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            18. Governing Law
          </h2>
          <ul className="list-disc pl-6 space-y-2 font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <li><strong>UK users:</strong> These Terms are governed by the laws of England and Wales.</li>
            <li><strong>USA users:</strong> These Terms are governed by the laws of your state and U.S. federal law.</li>
            <li><strong>Canadian users:</strong> These Terms are governed by the laws of your province and Canadian federal law.</li>
          </ul>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 19 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            19. Changes to Terms
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            We may update or modify these Terms at any time. Changes become effective once posted on our website. Continued use of our services signifies acceptance of any updated Terms.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 20 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            20. Pricing Changes
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            We reserve the right to modify the pricing of our subscriptions, lifetime plans, or any other paid services at any time. Any price changes will be made to reflect increases in the costs associated with operating our platform, including but not limited to software, technology, security systems, hosting services, and other tools we use to keep your pet safe and maintain the quality of our services.
          </p>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            If we change the price of your active subscription, we will notify you at least 14 days (2 weeks) in advance via email before the new price takes effect. The updated pricing will automatically apply to your next billing cycle unless you choose to cancel your subscription before the renewal date.
          </p>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
            We may also adjust the pricing of our lifetime plan from time to time. Any changes will apply only to new purchases unless otherwise stated. Existing lifetime plan holders will not be charged additional fees after purchase, unless required by law or explicitly agreed to by the customer.
          </p>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            Continued use of our services after a pricing change takes effect constitutes your acceptance of the new pricing.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 21 */}
        <section ref={addToRefs} className="mb-8 section-item">
          <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[100%] text-black mb-4">
            21. Contact Information
          </h2>
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            For questions or requests regarding these Terms, please contact us via our contact form on our website.
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsConditions
