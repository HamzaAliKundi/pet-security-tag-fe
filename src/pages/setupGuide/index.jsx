import React from 'react';

const steps = [
  {
    emoji: '📧',
    title: 'Step 1: Check Your Email',
    body: [
      "Once you've placed your order, you'll receive an email containing your login details.",
      'Please keep this email safe. You\'ll need these details to access your account.'
    ]
  },
  {
    emoji: '🏷️',
    title: 'Step 2: Scan Your Tag',
    body: [
      'Once your tag arrives, log in to your account and scan your tag to activate it.',
      'Have more than one tag? No problem! Simply scan each individual tag to activate them.'
    ]
  },
  {
    emoji: '⭐',
    title: 'Step 3: Choose Your Subscription',
    body: [
      "Once your tag has been scanned, you'll be given the option to choose your subscription plan.",
      'Choose between: Monthly • Yearly • Lifetime',
      'Pick the plan that works best for you and your pet.'
    ]
  },
  {
    emoji: '🐶',
    title: 'Step 4: Add Your Details',
    body: [
      "Add your details and your pet's information to create their profile.",
      "Once everything is filled in, you're all set! 🎉"
    ]
  },
  {
    emoji: '📱',
    title: 'Step 5: See Your Pet\'s Profile',
    body: [
      "Finally, re scan your pet's tag to view their profile and see exactly what someone will see if they find your pet and scan their tag.",
      'This is a great way to make sure everything looks correct and your contact information is up to date.'
    ]
  }
];

const SetupGuidePage = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4CB2E2] to-[#3da1d1] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-helvetica-neue font-bold text-[36px] sm:text-[48px] md:text-[58px] leading-[1.2] text-white text-center mb-4">
            🐾 How to Set Up Your Digital Tails Pet Tag
          </h1>
          <p className="font-helvetica-neue text-[18px] sm:text-[20px] text-white/90 text-center max-w-3xl mx-auto">
            Setting up your Digital Tails pet tag is quick and easy! Just follow these 5 simple steps.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-8">
        {steps.map((step) => (
          <div key={step.title} className="bg-gray-50 rounded-2xl p-8 shadow-md">
            <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[1.2] text-[#0F2137] mb-4">
              {step.emoji} {step.title}
            </h2>
            {step.body.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-helvetica-neue font-normal text-[16px] sm:text-[18px] leading-[28px] text-[#343D48] mb-3 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        {/* You're All Set */}
        <div className="bg-gradient-to-br from-[#4CB2E2]/10 to-[#3da1d1]/10 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] leading-[1.2] text-[#0F2137] mb-4">
            🐾 You're All Set!
          </h3>
          <p className="font-helvetica-neue font-normal text-[16px] sm:text-[18px] leading-[28px] text-[#343D48] max-w-3xl mx-auto mb-2">
            Your Digital Tails pet tag is now ready to help keep your furry friend safe.
          </p>
          <p className="font-helvetica-neue font-normal text-[16px] sm:text-[18px] leading-[28px] text-[#343D48] max-w-3xl mx-auto">
            Don't forget to share Digital Tails with all your family and friends! ❤️
          </p>
          <p className="font-helvetica-neue font-semibold italic text-[15px] sm:text-[16px] leading-[26px] text-[#343D48] max-w-3xl mx-auto mt-6">
            🐶🐱 Digital Tails: Helping keep pets connected to the people who love them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupGuidePage;
