import React, { useState } from 'react'

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Form Container */}
      <div className="max-w-[834px] mx-auto bg-[#CAE8F7]/70 rounded-2xl p-8 sm:p-12">
        {/* Form Title */}
        <h2 className="font-helvetica-neue font-normal text-[20px] sm:text-[24px] leading-[100%] tracking-[-0.02em] text-center text-black mb-12 max-w-[650px] mx-auto">
        If you have any questions or concerns, feel free to reach out to us. We’ll get back to you as soon as possible.
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-[650px] mx-auto space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              First & Last Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-[56px] rounded-[4px] border border-gray-200 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-[56px] rounded-[4px] border border-gray-200 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400"
              placeholder="Enter your email address"
            />
          </div>

          {/* Purpose Input */}
          <div className="space-y-2">
            <label 
              htmlFor="purpose" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              Purpose Inquiry
            </label>
            <input
              type="text"
              id="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full h-[56px] rounded-[4px] border border-gray-200 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400"
              placeholder="Enter purpose of inquiry"
            />
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label 
              htmlFor="message" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full h-[160px] rounded-[4px] border border-gray-200 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400 resize-none"
              placeholder="How can we help you?"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full h-[56px] rounded-[8px] font-bold text-black
              hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200
              shadow-lg hover:shadow-xl active:shadow-md"
            style={{
              background: 'radial-gradient(58.93% 58.93% at 50% 77.68%, #FFD700 0%, #B89D0B 100%)'
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
