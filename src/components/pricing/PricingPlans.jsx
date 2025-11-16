import React from 'react'
import { Link } from 'react-router-dom'
import { useLocalization } from '../../context/LocalizationContext'

const commonFeatures = [
  {
    icon: '💧',
    text: 'Waterproof Pet Tag, built to last through every adventure',
  },
  {
    icon: '🐾',
    text: 'Up to 5 Pet Accounts per owner',
  },
  {
    icon: '🌐',
    text: 'Online Pet Profile, access and update anytime, anywhere',
  },
  {
    icon: '🎁',
    text: 'Win Amazing Rewards by being part of our growing community',
  },
  {
    icon: '🏷️',
    text: 'Premium Quality Tag with sturdy metal ring & durable epoxy coating',
  },
  {
    icon: '📍',
    text: 'SMS Location Alerts when your pet’s tag is scanned',
  },
  {
    icon: '💬',
    text: 'Real Human Support, friendly, not AI-generated 🤖',
  },
  {
    icon: '📞',
    text: 'Phone Support for quick, personal assistance',
  },
  {
    icon: '🦴',
    text: 'Exclusive Discounts on pet food & insurance',
  },
  {
    icon: '🐶',
    text: 'Vet & Appointment Tracker to stay on top of your pet’s health',
  },
  {
    icon: '❤️',
    text: 'We Give Back, a percentage of all profits is donated to pet charities',
  },
  {
    icon: '🌟',
    text: 'Join the Best Pet Community Around!',
  },
]

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    cadence: 'per month',
    highlight: 'Flexible monthly billing',
    description: 'Perfect if you want to try Digital Tails without a long-term commitment.',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    cadence: 'per year',
    highlight: 'Save over 12% versus monthly',
    badge: 'Most Popular',
    description: 'All features included with a single annual payment for stress-free coverage.',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    cadence: 'one-time',
    highlight: 'Best long-term value',
    description: 'Pay once and enjoy peace of mind forever with all premium features included.',
  },
]

const PricingPlans = () => {
  const { subscriptionPrices, isLocalizing, message } = useLocalization()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <p className="uppercase tracking-[0.2em] text-[#4CB2E2] font-semibold text-sm sm:text-base">
          Plans & Pricing
        </p>
        <h1 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[110%] text-[#101828]">
          Simple pricing with every feature included
        </h1>
        <p className="font-helvetica-neue text-base sm:text-lg text-[#475467]">
          Every Digital Tails plan comes with full access to our smart safety tools,
          real human support, and a community that cares. Pick the option that fits
          your family, your pet’s protection never changes.
        </p>
        {(isLocalizing || message) && (
          <p className="font-helvetica-neue text-sm text-[#475467]">
            {isLocalizing ? 'Detecting local pricing…' : message}
          </p>
        )}
      </header>

      {/* Plans */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan) => {
          const priceInfo = subscriptionPrices[plan.id]
          const noteText = `Price shown in ${priceInfo.currency}.`

          return (
            <div
              key={plan.id}
              className={`border border-[#E4E7EC] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm ${
                plan.badge ? 'bg-[#F8FAFF] border-[#4CB2E2]' : 'bg-white'
              }`}
            >
              {plan.badge && (
                <span className="self-start bg-[#4CB2E2]/10 text-[#1B6EA7] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              <div className="space-y-2">
                <h2 className="font-helvetica-neue font-bold text-[24px] text-[#101828]">
                  {plan.name}
                </h2>
                <p className="font-helvetica-neue text-sm text-[#475467]">
                  {plan.description}
                </p>
              </div>

              <div>
                <p className="font-helvetica-neue font-bold text-[40px] text-[#101828]">
                  {isLocalizing ? '...' : `${priceInfo.symbol}${priceInfo.amount.toFixed(2)} ${priceInfo.currency}`}
                </p>
                <p className="font-helvetica-neue text-sm text-[#475467] capitalize">
                  {plan.cadence} • {plan.highlight}
                </p>
              </div>

              <Link
                to="/order"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center justify-center h-[52px] rounded-full bg-[#4CB2E2] text-[#05131D] font-bold text-sm uppercase tracking-wider hover:bg-[#3da1d1] transition-colors shadow-md"
              >
                Order Your Tag
              </Link>

              <p className="font-helvetica-neue text-xs text-[#667085]">{noteText}</p>
            </div>
          )
        })}
      </div>

      {/* Common Features */}
      <section className="mt-16 bg-[#F1F7FB] rounded-2xl p-6 sm:p-8 lg:p-12">
        <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] text-[#101828] mb-6 text-center">
          ✨ Features Included in Every Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {commonFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
            >
              <span className="text-lg sm:text-xl">{feature.icon}</span>
              <p className="font-helvetica-neue text-sm sm:text-base text-[#344054] leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 text-center space-y-4">
        <h3 className="font-helvetica-neue font-bold text-[24px] text-[#101828]">
          Ready to keep your best friend safe?
        </h3>
        <p className="font-helvetica-neue text-base text-[#475467]">
          Join thousands of pet parents choosing Digital Tails for smart, affordable protection.
        </p>
        <Link
          to="/order"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center justify-center h-[56px] px-8 rounded-full bg-gradient-to-r from-[#FFD700] to-[#B89D0B] text-black font-bold uppercase tracking-wide shadow-lg hover:opacity-90 transition"
        >
          Order Your Tag Today
        </Link>
      </div>
    </div>
  )
}

export default PricingPlans

