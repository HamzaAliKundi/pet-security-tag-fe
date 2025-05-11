import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-[650px] space-y-6">
        {/* Header */}
        <div className="text-start space-y-4">
          <h1 className="font-helvetica-neue font-medium text-[32px] leading-[100%] text-[#05131D] capitalize">
            Register Form
          </h1>
          <p className="font-helvetica-neue font-normal text-base leading-[140%] tracking-[-0.02em] text-[#05131D] capitalize">
            Welcome to Digital Tails 🐾<br />
            Please create an account to manage your pet's profile. 🐶🐱
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-lg p-8 space-y-6">
          <h2 className="font-helvetica-neue font-medium text-2xl leading-[100%] text-center capitalize">
            Register
          </h2>

          <form className="space-y-6 mb-12">
            <div className="space-y-2">
              <label className="block font-helvetica-neue font-normal text-base leading-[100%] tracking-[-0.02em] text-[#05131D]">
                First Name*
              </label>
              <input
                type="text"
                className="w-full h-[56px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CB2E2]"
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-helvetica-neue font-normal text-base leading-[100%] tracking-[-0.02em] text-[#05131D]">
                Last Name*
              </label>
              <input
                type="text"
                className="w-full h-[56px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CB2E2]"
                placeholder="Enter your last name"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-helvetica-neue font-normal text-base leading-[100%] tracking-[-0.02em] text-[#05131D]">
                Email*
              </label>
              <input
                type="email"
                className="w-full h-[56px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CB2E2]"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-helvetica-neue font-normal text-base leading-[100%] tracking-[-0.02em] text-[#05131D]">
                Password*
              </label>
              <input
                type="password"
                className="w-full h-[56px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CB2E2]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full h-[56px] bg-[#4CB2E2] text-[#05131D] rounded-lg px-6 py-2.5 hover:bg-[#3da1d1] transition-colors font-bold"
            >
              Register
            </button>
          </form>

          <div className="text-center space-y-4">
            <p className="font-helvetica-neue font-normal text-base text-[#05131D] leading-[100%] tracking-[-0.02em] text-center">
            Already have an account? <Link to="/login">Log in here</Link>
            </p>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
