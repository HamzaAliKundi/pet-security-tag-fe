import React, { useState } from 'react'

const Order = () => {
    const [quantity, setQuantity] = useState(1)
    const [selectedPlan, setSelectedPlan] = useState('monthly')

    const handleIncrement = () => setQuantity(prev => prev + 1)
    const handleDecrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Main Title */}
            <h1 className="font-helvetica-neue font-medium text-[48px] leading-[100%] text-black text-center capitalize mb-16 max-w-[482px] mx-auto">
                Order Your PetSecure
                <br />
                Tag Today!
            </h1>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
                {/* Left Section - Image */}
                <div className="w-full lg:w-[437px] flex flex-col items-center gap-6">
                    <h2 className="font-helvetica-neue font-bold text-[40px] leading-[100%] text-black text-center uppercase h-[120px]">
                        ORDER YOUR SMART
                        <br />
                        TAG TODAY
                    </h2>

                    <div className="w-full aspect-square bg-[#4CB2E2] rounded-[24px] flex items-center justify-center p-8">
                        <img
                            src="/faqs/smart-tag.svg"
                            alt="PetSecure Smart Tag"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="w-full lg:w-[650px] flex flex-col gap-6">
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label className="font-helvetica-neue font-normal text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                            Your Email Address*
                        </label>
                        <input
                            type="email"
                            className="w-full h-[56px] rounded-[4px] border border-[#D8DDE3] px-4 py-3
                                     shadow-[0px_0px_4px_0px_#17191C0D]"
                            placeholder="Enter email address"
                        />
                    </div>

                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                        <label className="font-helvetica-neue font-normal text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                            Your Name*
                        </label>
                        <input
                            type="text"
                            className="w-full h-[56px] rounded-[4px] border border-[#D8DDE3] px-4 py-3
                                     shadow-[0px_0px_4px_0px_#17191C0D]"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Pet Name Input */}
                    <div className="flex flex-col gap-2">
                        <label className="font-helvetica-neue font-normal text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                            Your Pet Name*
                        </label>
                        <input
                            type="text"
                            className="w-full h-[56px] rounded-[4px] border border-[#D8DDE3] px-4 py-3
                                     shadow-[0px_0px_4px_0px_#17191C0D]"
                            placeholder="Enter pet name"
                        />
                    </div>

                    <div className="flex justify-center">
                        <div>
                            {/* Quantity Selector */}
                            <div className="mt-6">
                                <h3 className="font-helvetica-neue font-bold text-[18px] leading-[100%] capitalize mb-4">
                                    How Many Tags Do You Want To Order?
                                </h3>
                                <div className="flex w-full items-center justify-center gap-4 mt-12">
                                    <div className='flex items-center gap-2'>
                                    <button
                                        onClick={handleDecrement}
                                        className="w-[56px] h-[56px] rounded-[8px] border border-[#8E96A4] bg-[#8E96A4] 
                                         flex items-center justify-center text-2xl"
                                    >
                                        -
                                    </button>
                                    <span className="w-[56px] text-center text-xl">{quantity}</span>
                                    <button
                                        onClick={handleIncrement}
                                        className="w-[56px] h-[56px] rounded-[8px] bg-[#FDD30F]
                                         flex items-center justify-center text-2xl"
                                    >
                                        +
                                    </button>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Selection */}
                            <div className="flex flex-col gap-4 mt-12">
                                <div className="flex justify-between items-center w-[374px]">
                                    <div className="flex items-center gap-2 w-[200px]">

                                        <label className="font-helvetica-neue font-bold text-[18px] leading-[100%] capitalize">
                                            Monthly
                                        </label>
                                    </div>
                                    <span className="font-helvetica-neue font-bold text-[27.1px] leading-[100%] text-[#2D2D2D] w-[100px] text-right">
                                        1.49€
                                    </span>
                                    <input
                                        type="radio"
                                        id="monthly"
                                        checked={selectedPlan === 'monthly'}
                                        onChange={() => setSelectedPlan('monthly')}
                                        className="w-5 h-5"
                                    />
                                </div>

                                <div className="flex justify-between items-center w-[374px]">
                                    <div className="flex items-center gap-2 w-[200px]">

                                        <label className="font-helvetica-neue font-bold text-[18px] leading-[100%] capitalize">
                                            Yearly - 20% Saving
                                        </label>
                                    </div>
                                    <span className="font-helvetica-neue font-bold text-[27.1px] leading-[100%] text-[#2D2D2D] w-[100px] text-right">
                                        9.99€
                                    </span>
                                    <input
                                        type="radio"
                                        id="yearly"
                                        checked={selectedPlan === 'yearly'}
                                        onChange={() => setSelectedPlan('yearly')}
                                        className="w-5 h-5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button className="w-full h-[56px] rounded-[8px] px-6 py-2.5 mt-8
                                     bg-gradient-to-r from-[#FFD700] to-[#B89D0B]
                                     font-helvetica-neue font-bold text-[18px] leading-[100%] text-black">
                        Go To Payment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Order
