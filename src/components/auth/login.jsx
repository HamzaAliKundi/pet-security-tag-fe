import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-[650px] space-y-4">
        {/* Header */}
        <div className="text-start space-y-4">
          <h1 className="font-helvetica-neue font-medium text-[32px] leading-[100%] text-[#05131D] capitalize">
            Login Form
          </h1>
          <p className="font-helvetica-neue font-normal text-base leading-[140%] tracking-[-0.02em] text-[#05131D] capitalize">
            Welcome to Digital Tails 🐾<br />
            Please login or create an account to manage your pet's profile. 🐶🐱
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg px-2 m:px-8 py-4 md:py-8 space-y-4">
          <h2 className="font-helvetica-neue font-medium text-2xl leading-[100%] text-center capitalize">
            Login
          </h2>

          <form className="space-y-6 mb-12">
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

            <div className="text-right">
              <a href="#" className="font-helvetica-neue font-normal text-base leading-[100%] tracking-[-0.02em] text-[##05131D]">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-[56px] bg-[#4CB2E2] text-[#05131D] rounded-lg px-6 py-2.5 hover:bg-[#3da1d1] transition-colors font-bold"
            >
              Login
            </button>
          </form>

          <div className="text-center space-y-4 !mt-10">
            <p className="font-helvetica-neue font-[500] text-base leading-[100%] tracking-[0%] text-center capitalize">
              Don't have an account?
            </p>
            <div className="flex justify-center">
              <Link to="/signup" className="w-[198px] h-[56px] font-medium border border-[#4CB2E2] bg-[#4CB2E2] text-[#05131D] rounded-lg px-6 py-2.5 transition-colors flex items-center justify-center">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
