import React, { useState } from 'react'
import { useSubmitContactMutation } from '../../apis/contact'
import { toast } from 'react-hot-toast'

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    purpose: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  const [submitContact, { isLoading }] = useSubmitContactMutation()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.purpose) {
      newErrors.purpose = 'Purpose is required'
    }
    
    if (!formData.message) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly')
      return
    }

    try {
      const result = await submitContact(formData).unwrap()
      toast.success('Message sent successfully!')
      console.log('Contact submitted:', result)
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        purpose: '',
        message: ''
      })
      
    } catch (error) {
      console.error('Error submitting contact:', error)
      toast.error(error?.data?.message || 'Failed to send message')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Direct Contact Info */}
      <div className="max-w-[834px] mx-auto mb-8 text-center space-y-2">
        <p className="font-helvetica-neue font-semibold text-[18px] sm:text-[20px] text-black">
          Prefer to reach out directly?
        </p>
        <div className="font-helvetica-neue text-[16px] sm:text-[18px] text-[#0F2137] space-y-1">
          <p>
            Email:{' '}
            <a
              href="mailto:info@digitaltails.com"
              className="text-[#4CB2E2] hover:underline"
            >
              info@digitaltails.com
            </a>
          </p>
          <p>
            WhatsApp No:{' '}
            <a
              href="https://wa.me/447377518902"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4CB2E2] hover:underline"
            >
              +44 7572 797141
            </a>
          </p>
        </div>
      </div>

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
              htmlFor="fullName" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              First & Last Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full h-[56px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName}</span>
            )}
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
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full h-[56px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
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
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className={`w-full h-[56px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400 ${
                  errors.purpose ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter purpose of inquiry"
            />
            {errors.purpose && (
              <span className="text-red-500 text-sm">{errors.purpose}</span>
            )}
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
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full h-[160px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400 resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="How can we help you?"
            />
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full h-[56px] rounded-[8px] font-bold text-black
              hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200
              shadow-lg hover:shadow-xl active:shadow-md ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            style={{
              background: 'radial-gradient(58.93% 58.93% at 50% 77.68%, #FFD700 0%, #B89D0B 100%)'
            }}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
