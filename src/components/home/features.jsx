import React, { useEffect, useRef, useState } from 'react';

const Features = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const featuresRef = useRef(null);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Always-On Pet Identity',
      description: 'Your pet carries their identity everywhere, making it easy to reunite them anytime they’re found.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m12 14l-4-4m0 0l4-4m-4 4h7" />
        </svg>
      ),
      title: 'Prepared for Every Moment',
      description: 'Accidents happen fast. This ensures you’re ready before a small mistake turns into a big worry.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5-3m-6 5H2v-2a3 3 0 015-3m4-9a4 4 0 11-8 0 4 4 0 018 0zm6 3a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Help From Any Kind Stranger',
      description: 'Anyone with a smartphone can scan and access the details needed to help your pet get home.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4zM14 14h6v6h-6zM14 4h6v6h-6zM4 14h6v6H4z" />
        </svg>
      ),
      title: 'One Scan Closer to Home',
      description: 'One quick QR scan opens your pet’s profile with all the information that matters.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      ),
      title: 'No App, No Setup',
      description: 'Works instantly on any phone without downloads, signups, or technical steps.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.5-1.5A2 2 0 0118 14v-3a6 6 0 10-12 0v3a2 2 0 01-.5 1.5L4 17h5m6 0a3 3 0 01-6 0" />
        </svg>
      ),
      title: 'Instant Scan Notifications',
      description: 'Get alerted immediately with time and location details when your pet’s tag is scanned.'
    }
  ];
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger animation for each item
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              }, index * 150); // 150ms delay between each item
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-pink-50 via-blue-50 to-white py-16 sm:py-20 md:py-24" ref={featuresRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-helvetica-neue font-bold text-[32px] sm:text-[38px] md:text-[44px] leading-[1.2] tracking-[-1.45px] text-[#0F2137] mb-4">
            How It Works
          </h2>
          <p className="font-helvetica-neue text-[16px] sm:text-[18px] text-[#343D48] max-w-2xl mx-auto">
            Simple protection that works when it matters most
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              } hover:scale-105`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-blue-100 rounded-full flex items-center justify-center mb-5 text-[#4CB2E2] transform transition-transform duration-300 hover:rotate-12">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-helvetica-neue font-bold text-[20px] sm:text-[22px] leading-[1.3] text-[#4CB2E2] mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-helvetica-neue font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#343D48]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="font-helvetica-neue font-medium text-[18px] sm:text-[20px] text-[#343D48] max-w-3xl mx-auto">
            You don't need it every day. But when you do, you'll be grateful it's there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

