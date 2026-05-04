import React from 'react'

/**
 * Copy for the Loyalty / referral programme. Layout matches long-form pages
 * like About Us: max-width column, relaxed line height, simple list — no card chrome.
 */
const ReferAFriendSection = () => {
  return (
    <section id="refer-a-friend" className="scroll-mt-24" aria-labelledby="refer-a-friend-heading">
      <h1
        id="refer-a-friend-heading"
        className="font-helvetica-neue font-bold text-[28px] sm:text-[32px] md:text-[36px] leading-[1.15] text-[#333333] mb-6"
      >
        Refer a friend
      </h1>

      <div className="space-y-6 font-helvetica-neue text-base sm:text-lg leading-relaxed text-[#333333] max-w-3xl">
        <p>
          Once you become a customer and log in to your dashboard, you&apos;ll find a{' '}
          <span className="font-semibold">Loyalty</span> tab. Open it to see your unique shareable link.
          You can send that link to family and friends for every new customer who joins through your
          referral, you&apos;ll earn rewards, including prizes and gifts.
        </p>

        <div>
          <p className="font-semibold text-[#333333] mb-3">How it works</p>
          <ul className="list-disc space-y-2 pl-6 marker:text-[#6E6E6E]">
            <li>Log in to your Digital Tails dashboard.</li>
            <li>Go to the Loyalty tab and copy your personal referral link.</li>
            <li>Share the link when someone signs up as a new customer through it, you move closer to rewards.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ReferAFriendSection
