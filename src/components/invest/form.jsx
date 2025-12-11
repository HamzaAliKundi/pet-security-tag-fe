import React, { useState } from 'react'
import { useSubmitInvestmentMutation } from '../../apis/invest'
import { toast } from 'react-hot-toast'

const InvestForm = () => {
  const [formData, setFormData] = useState({
    capitalAvailable: '',
    investorType: '',
    name: '',
    company: '',
    email: '',
    mobileNumber: ''
  })
  const [errors, setErrors] = useState({})

  const [submitInvestment, { isLoading }] = useSubmitInvestmentMutation()

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
    
    if (!formData.capitalAvailable) {
      newErrors.capitalAvailable = 'Please select available capital'
    }
    
    if (!formData.investorType) {
      newErrors.investorType = 'Please select investor type'
    }
    
    if (!formData.name) {
      newErrors.name = 'Name is required'
    }
    
    // Company is required only for VC companies
    if (formData.investorType === 'vc-company' && !formData.company) {
      newErrors.company = 'Company name is required for VC companies'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required'
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
      const result = await submitInvestment(formData).unwrap()
      toast.success('Investment inquiry submitted successfully!')
      console.log('Investment submitted:', result)
      
      // Reset form
      setFormData({
        capitalAvailable: '',
        investorType: '',
        name: '',
        company: '',
        email: '',
        mobileNumber: ''
      })
      
    } catch (error) {
      console.error('Error submitting investment:', error)
      toast.error(error?.data?.message || 'Failed to submit investment inquiry')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Page Title */}
      <div className="max-w-[834px] mx-auto mb-8 text-center">
        <h1 className="font-helvetica-neue font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[110%] text-black mb-4">
          Invest in Digital Tails
        </h1>
        <p className="font-helvetica-neue text-[16px] sm:text-[18px] text-[#6E6E6E]">
          Join us in revolutionizing pet safety and security
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-[834px] mx-auto bg-[#CAE8F7]/70 rounded-2xl p-8 sm:p-12">
        {/* Form Title */}
        <h2 className="font-helvetica-neue font-normal text-[20px] sm:text-[24px] leading-[100%] tracking-[-0.02em] text-center text-black mb-12 max-w-[650px] mx-auto">
          Fill out the form below and we'll get back to you as soon as possible.
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-[650px] mx-auto space-y-6">
          {/* Capital Available Dropdown */}
          <div className="space-y-2">
            <label 
              htmlFor="capitalAvailable" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              How much capital do you have available to invest? *
            </label>
            <select
              id="capitalAvailable"
              name="capitalAvailable"
              value={formData.capitalAvailable}
              onChange={handleInputChange}
              className={`w-full h-[56px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue bg-white ${
                  errors.capitalAvailable ? 'border-red-500' : 'border-gray-200'
                }`}
            >
              <option value="">Select capital range</option>
              <option value="up-to-40000">Up to £40,000</option>
              <option value="up-to-100000">Up to £100,000</option>
              <option value="up-to-250000">Up to £250,000</option>
              <option value="over-250000">Over £250,000</option>
            </select>
            {errors.capitalAvailable && (
              <span className="text-red-500 text-sm">{errors.capitalAvailable}</span>
            )}
          </div>

          {/* Investor Type Dropdown */}
          <div className="space-y-2">
            <label 
              htmlFor="investorType" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              Are you an individual or VC company? *
            </label>
            <select
              id="investorType"
              name="investorType"
              value={formData.investorType}
              onChange={handleInputChange}
              className={`w-full h-[56px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue bg-white ${
                  errors.investorType ? 'border-red-500' : 'border-gray-200'
                }`}
            >
              <option value="">Select investor type</option>
              <option value="individual">Individual</option>
              <option value="vc-company">VC Company</option>
            </select>
            {errors.investorType && (
              <span className="text-red-500 text-sm">{errors.investorType}</span>
            )}
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full h-[56px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400 ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {/* Company Input (Optional) */}
          <div className="space-y-2">
            <label 
              htmlFor="company" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              Company {formData.investorType === 'vc-company' ? '*' : '(Optional)'}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`w-full h-[56px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400 ${
                  errors.company ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter company name"
            />
            {errors.company && (
              <span className="text-red-500 text-sm">{errors.company}</span>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              Email *
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

          {/* Mobile Number Input */}
          <div className="space-y-2">
            <label 
              htmlFor="mobileNumber" 
              className="block font-helvetica-neue font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-black"
            >
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className={`w-full h-[56px] rounded-[4px] border px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-[#4CB2E2] focus:border-transparent
                font-helvetica-neue placeholder:text-gray-400 ${
                  errors.mobileNumber ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter your mobile number"
            />
            {errors.mobileNumber && (
              <span className="text-red-500 text-sm">{errors.mobileNumber}</span>
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
            {isLoading ? 'Submitting...' : 'Submit Investment Inquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default InvestForm

