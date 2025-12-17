import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const footerLinks = {
    menu: {
      title: 'Menu',
      links: [
        { name: 'Order Your Tag', path: '/order' },
        { name: 'Pricing', path: '/pricing' },
        // { name: 'Blog', path: '/blog' },
        { name: 'Refer A Friend', path: '#refer-a-friend' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Invest', path: '/invest' },
        { name: 'Partner Charities', path: '/partner-charities' },
        // { name: 'Support', path: '/contact' }
      ]
    },
    support: {
      title: 'Policies',
      links: [
        { name: 'Shipping Policy', path: '/shipping-policy' },
        { name: 'Refund & Cancellation Policy', path: '/refund-cancellation-policy' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms & Conditions', path: '/terms-conditions' },
        { name: 'SMS Consent Statement', path: '/sms-consent-statement' },
        { name: 'Cookie Policy', path: '/cookie-policy' },
      ]
    }
  }

  const socialIcons = [
    { name: 'Instagram', icon: '/home/instagram.svg', url: 'https://www.instagram.com/digital_tails?igsh=MTJ1cXhvZHZ3cXZmeQ%3D%3D&utm_source=qr' },
    { name: 'Facebook', icon: '/home/facebook.svg', url: 'https://www.facebook.com/share/1BbhyM3RVX/?mibextid=wwXIfr' },
    { name: 'TikTok', icon: '/home/tiktok.svg', url: 'https://www.tiktok.com/@digitaltails?_r=1&_t=ZN-911DZNbSD4Q' },
    { name: 'YouTube', icon: '/home/youtube.svg', url: 'https://youtube.com/@digitaltailspet?si=_WCRE3jvNgC95Ueo' }
  ]

  const handleLinkClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <footer className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Logo and Social Section */}
        <div className="lg:col-span-3">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/resuable/logo.svg" 
              alt="Digital Tails" 
              className="w-[197.56px] h-[50px]"
            />
          </div>

          {/* Company Name */}
          <h3 className="font-helvetica-neue font-bold text-[16px] leading-[24px] text-[#333333] mb-2">
            Digital Tails
          </h3>

          {/* Copyright */}
          <p className="font-helvetica-neue font-normal text-[16px] leading-[20px] text-[#6E6E6E] capitalize mb-6">
            ©Digital Tails 2025 All Rights Reserved
          </p>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-helvetica-neue font-bold text-[14px] leading-[20px]">
              Follow Digital Tails
            </h4>
            <div className="flex space-x-4">
              {socialIcons.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                  title={`Follow us on ${social.name}`}
                >
                  <img 
                    src={social.icon} 
                    alt={social.name} 
                    // className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links Sections */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([key, section], index) => (
            <div 
              key={key} 
              className={`flex flex-col items-start ${index === 0 ? ' ml-0 md:ml-8' : ''}`}
            >
              <h3 className="font-helvetica-neue font-bold text-[16px] leading-[24px] mb-6">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.path.startsWith('/') ? (
                      <Link 
                        to={link.path}
                        className="font-helvetica-neue font-normal text-[16px] leading-[24px] text-[#6E6E6E] hover:text-[#333333] transition-colors"
                        onClick={handleLinkClick}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.path}
                        className="font-helvetica-neue font-normal text-[16px] leading-[24px] text-[#6E6E6E] hover:text-[#333333] transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
