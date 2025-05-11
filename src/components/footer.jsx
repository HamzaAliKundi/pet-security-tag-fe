import React from 'react'

const Footer = () => {
  const footerLinks = {
    menu: {
      title: 'Menu',
      links: ['Order Your Tag', 'Blog', 'Pricing', 'Refer A Friend']
    },
    company: {
      title: 'Company',
      links: ['About Us', 'Contact Us', 'Support']
    },
    support: {
      title: 'Support',
      links: ['Shipping Policy', 'Cancellation Policy', 'Privacy Policy']
    }
  }

  const socialIcons = [
    { name: 'Instagram', icon: '/home/instagram.svg' },
    { name: 'Facebook', icon: '/home/facebook.svg' },
    { name: 'TikTok', icon: '/home/tiktok.svg' },
    { name: 'YouTube', icon: '/home/youtube.svg' }
  ]

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
                  href={`#${social.name.toLowerCase()}`}
                  className="w-10 h-10 flex items-center justify-center"
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
              className={`flex flex-col items-start ${index === 0 ? 'ml-4 ml-0 md:ml-8' : ''}`}
            >
              <h3 className="font-helvetica-neue font-bold text-[16px] leading-[24px] mb-6">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="font-helvetica-neue font-normal text-[16px] leading-[24px] text-[#6E6E6E] hover:text-[#333333] transition-colors"
                    >
                      {link}
                    </a>
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
