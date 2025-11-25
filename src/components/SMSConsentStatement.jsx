import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const SMSConsentStatement = () => {
  const sectionsRef = useRef([]);

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
            SMS Consent Statement
          </h1>
        </div>

        {/* Main Content */}
        <section ref={addToRefs} className="mb-8 section-item">
          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-6">
            By creating an account, subscribing, or providing your mobile number, you agree to receive SMS text messages from Digital Tails. These messages may include pet alerts, account notifications, service updates, subscription reminders, and important information related to your pet's safety and the use of our services.
          </p>

          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-6">
            Message frequency may vary. Standard messaging and data rates may apply depending on your mobile carrier.
          </p>

          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-6">
            You can opt out of SMS messages at any time by contacting us directly or by deleting your account through your Customer Dashboard in the Account Settings area. Opting out will not affect your ability to use the core features of your account, except that you will no longer receive SMS alerts.
          </p>

          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333] mb-6">
            By providing your consent, you confirm that the phone number you provide is your own and that you are authorised to receive messages at that number.
          </p>

          <p className="font-helvetica-neue font-normal text-base sm:text-lg leading-relaxed text-[#333333]">
            <strong>Contact us:</strong> if you have any questions please contact us via our <Link to="/contact" className="text-[#4CB2E2] hover:underline">contact us page</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}

export default SMSConsentStatement

