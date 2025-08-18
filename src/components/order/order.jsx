import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useCreateOrderMutation } from '../../apis/orders'

const Order = () => {
    const [quantity, setQuantity] = useState(1)
    const [selectedPlan, setSelectedPlan] = useState('monthly')
    const [selectedTagColor, setSelectedTagColor] = useState('blue')
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        petName: '',
        phone: '',
        shippingAddress: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    })
    const [errors, setErrors] = useState({})
    const [showShippingForm, setShowShippingForm] = useState(false)

    const [createOrder, { isLoading }] = useCreateOrderMutation()

    const handleIncrement = () => setQuantity(prev => prev + 1)
    const handleDecrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

    // Calculate savings percentage
    const calculateSavings = () => {
        const monthlyYearly = 0.95 * 12 // £11.40
        const yearlyPrice = 8.95
        const savings = monthlyYearly - yearlyPrice // £2.45
        const savingsPercentage = Math.round((savings / monthlyYearly) * 100)
        return 20 // Force to show 20% as requested
    }

    const savingsPercentage = calculateSavings()

    // Tag color options
    const tagColors = [
        { id: 'blue', name: 'Blue', image: '/order/tag-blue.jpg' },
        { id: 'pink', name: 'Pink', image: '/order/tag-pink.jpg' },
        { id: 'yellow', name: 'Yellow', image: '/order/tag-yellow.jpg' }
    ]

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

    const handleShippingAddressChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            shippingAddress: {
                ...prev.shippingAddress,
                [name]: value
            }
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
        
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        
        if (!formData.name) {
            newErrors.name = 'Name is required'
        }
        
        if (!formData.petName) {
            newErrors.petName = 'Pet name is required'
        }

        if (showShippingForm) {
            if (!formData.phone) {
                newErrors.phone = 'Phone number is required'
            }
            
            if (!formData.shippingAddress.street) {
                newErrors.street = 'Street address is required'
            }
            
            if (!formData.shippingAddress.city) {
                newErrors.city = 'City is required'
            }
            
            if (!formData.shippingAddress.state) {
                newErrors.state = 'State is required'
            }
            
            if (!formData.shippingAddress.zipCode) {
                newErrors.zipCode = 'Zip code is required'
            }
            
            if (!formData.shippingAddress.country) {
                newErrors.country = 'Country is required'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error('Please fill in all required fields correctly')
            return
        }

        try {
            const orderData = {
                email: formData.email,
                name: formData.name,
                petName: formData.petName,
                quantity: quantity,
                subscriptionType: selectedPlan,
                tagColor: selectedTagColor,
                phone: formData.phone,
                shippingAddress: formData.shippingAddress
            }

            const result = await createOrder(orderData).unwrap()
            toast.success('Order created successfully!')
            console.log('Order created:', result)
            
            // Reset form
            setFormData({
                email: '',
                name: '',
                petName: '',
                phone: '',
                shippingAddress: {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: ''
                }
            })
            setQuantity(1)
            setSelectedPlan('monthly')
            setSelectedTagColor('blue')
            setShowShippingForm(false)
            
        } catch (error) {
            console.error('Error creating order:', error)
            toast.error(error?.data?.message || 'Failed to create order')
        }
    }

    const handleGoToPayment = () => {
        if (!formData.email || !formData.name || !formData.petName) {
            toast.error('Please fill in all required fields first')
            return
        }
        setShowShippingForm(true)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
            {/* Main Title */}
            <h1 className="font-helvetica-neue font-medium text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-[110%] md:leading-[100%] text-black text-center capitalize mb-6 sm:mb-8 md:mb-12 lg:mb-16 max-w-[300px] sm:max-w-[400px] md:max-w-[482px] mx-auto">
                Order Your PetSecure
                <br />
                Tag Today!
            </h1>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
                {/* Left Section - Tag Color Selection */}
                <div className="w-full lg:w-[400px] xl:w-[437px] flex flex-col items-center gap-6">
                    <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] leading-[110%] md:leading-[100%] text-black text-center uppercase">
                        CHOOSE YOUR TAG
                        <br />
                        COLOR
                    </h2>

                    {/* Tag Color Selection */}
                    <div className="w-full">
                        <h3 className="font-helvetica-neue font-bold text-[18px] leading-[100%] capitalize mb-6 text-center">
                            Select Tag Color
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {tagColors.map((color) => (
                                <div
                                    key={color.id}
                                    className={`cursor-pointer rounded-lg p-4 transition-all duration-200 border-2 ${
                                        selectedTagColor === color.id
                                            ? `${
                                                color.id === 'blue' ? 'border-blue-500 bg-blue-50' :
                                                color.id === 'pink' ? 'border-pink-500 bg-pink-50' :
                                                'border-yellow-500 bg-yellow-50'
                                              } shadow-lg`
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setSelectedTagColor(color.id)}
                                >
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                                        <img
                                            src={color.image}
                                            alt={`${color.name} tag`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <p className="text-center font-helvetica-neue font-semibold text-sm capitalize">
                                        {color.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Information */}
                    <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-helvetica-neue font-bold text-[18px] leading-[100%] capitalize mb-3">
                            Pricing Information
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-helvetica-neue text-sm">Monthly Plan:</span>
                                <span className="font-helvetica-neue font-bold text-sm">£0.95/month</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-helvetica-neue text-sm">Yearly Plan:</span>
                                <span className="font-helvetica-neue font-bold text-sm">£8.95/year</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span className="font-helvetica-neue text-sm">Yearly Savings:</span>
                                <span className="font-helvetica-neue font-bold text-sm">{savingsPercentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="w-full lg:w-[600px] xl:w-[650px] flex flex-col gap-4 sm:gap-6">
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                            Your Email Address*
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                     shadow-[0px_0px_4px_0px_#17191C0D] ${
                                       errors.email ? 'border-red-500' : 'border-[#D8DDE3]'
                                     }`}
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email}</span>
                        )}
                    </div>

                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                        <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                            Your Name*
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                     shadow-[0px_0px_4px_0px_#17191C0D] ${
                                       errors.name ? 'border-red-500' : 'border-[#D8DDE3]'
                                     }`}
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name}</span>
                        )}
                    </div>

                    {/* Pet Name Input */}
                    <div className="flex flex-col gap-2">
                        <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                            Your Pet Name*
                        </label>
                        <input
                            type="text"
                            name="petName"
                            value={formData.petName}
                            onChange={handleInputChange}
                            className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                     shadow-[0px_0px_4px_0px_#17191C0D] ${
                                       errors.petName ? 'border-red-500' : 'border-[#D8DDE3]'
                                     }`}
                            placeholder="Enter pet name"
                        />
                        {errors.petName && (
                            <span className="text-red-500 text-sm">{errors.petName}</span>
                        )}
                    </div>

                    {/* Shipping Information - Show when Go to Payment is clicked */}
                    {showShippingForm && (
                        <>
                            {/* Phone Input */}
                            <div className="flex flex-col gap-2">
                                <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                             shadow-[0px_0px_4px_0px_#17191C0D] ${
                                               errors.phone ? 'border-red-500' : 'border-[#D8DDE3]'
                                             }`}
                                    placeholder="Enter phone number"
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-sm">{errors.phone}</span>
                                )}
                            </div>

                            {/* Shipping Address */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                                        Street Address*
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.shippingAddress.street}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                                 shadow-[0px_0px_4px_0px_#17191C0D] ${
                                                   errors.street ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter street address"
                                    />
                                    {errors.street && (
                                        <span className="text-red-500 text-sm">{errors.street}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                                        City*
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.shippingAddress.city}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                                 shadow-[0px_0px_4px_0px_#17191C0D] ${
                                                   errors.city ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter city"
                                    />
                                    {errors.city && (
                                        <span className="text-red-500 text-sm">{errors.city}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                                        State*
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.shippingAddress.state}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                                 shadow-[0px_0px_4px_0px_#17191C0D] ${
                                                   errors.state ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter state"
                                    />
                                    {errors.state && (
                                        <span className="text-red-500 text-sm">{errors.state}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                                        Zip Code*
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.shippingAddress.zipCode}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                                 shadow-[0px_0px_4px_0px_#17191C0D] ${
                                                   errors.zipCode ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter zip code"
                                    />
                                    {errors.zipCode && (
                                        <span className="text-red-500 text-sm">{errors.zipCode}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                                        Country*
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.shippingAddress.country}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                                 shadow-[0px_0px_4px_0px_#17191C0D] ${
                                                   errors.country ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter country"
                                    />
                                    {errors.country && (
                                        <span className="text-red-500 text-sm">{errors.country}</span>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            {/* Quantity Selector */}
                            <div className="mt-6">
                                <h3 className="font-helvetica-neue font-bold text-[16px] sm:text-[18px] leading-[100%] capitalize mb-4 text-center">
                                    How Many Tags Do You Want To Order?
                                </h3>
                                <div className="flex w-full items-center justify-center gap-4 mt-6 sm:mt-8">
                                    <div className='flex items-center gap-4'>
                                    <button
                                        onClick={handleDecrement}
                                        className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-[8px] border border-[#8E96A4] bg-[#8E96A4] 
                                         flex items-center justify-center text-xl sm:text-2xl text-white hover:bg-[#7A8290] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-[48px] sm:w-[56px] text-center text-lg sm:text-xl font-bold">{quantity}</span>
                                    <button
                                        onClick={handleIncrement}
                                        className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-[8px] bg-[#FDD30F]
                                         flex items-center justify-center text-xl sm:text-2xl hover:bg-[#E6BE0E] transition-colors"
                                    >
                                        +
                                    </button>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Selection */}
                            <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2 flex-1">
                                        <label className="font-helvetica-neue font-bold text-[14px] sm:text-[16px] leading-[100%] capitalize">
                                            Monthly
                                        </label>
                                    </div>
                                    <span className="font-helvetica-neue font-bold text-[18px] sm:text-[20px] leading-[100%] text-[#2D2D2D] mx-3 sm:mx-4">
                                        £0.95
                                    </span>
                                    <input
                                        type="radio"
                                        id="monthly"
                                        checked={selectedPlan === 'monthly'}
                                        onChange={() => setSelectedPlan('monthly')}
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                    />
                                </div>

                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2 flex-1">
                                        <label className="font-helvetica-neue font-bold text-[14px] sm:text-[16px] leading-[100%] capitalize">
                                            Yearly - {savingsPercentage}% Saving
                                        </label>
                                    </div>
                                    <span className="font-helvetica-neue font-bold text-[18px] sm:text-[20px] leading-[100%] text-[#2D2D2D] mx-3 sm:mx-4">
                                        £8.95
                                    </span>
                                    <input
                                        type="radio"
                                        id="yearly"
                                        checked={selectedPlan === 'yearly'}
                                        onChange={() => setSelectedPlan('yearly')}
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button 
                        onClick={showShippingForm ? handleSubmit : handleGoToPayment}
                        disabled={isLoading}
                        className={`w-full h-[48px] sm:h-[56px] rounded-[8px] px-4 sm:px-6 py-2 sm:py-2.5 mt-6 sm:mt-8
                                     bg-gradient-to-r from-[#FFD700] to-[#B89D0B]
                                     font-helvetica-neue font-bold text-[16px] sm:text-[18px] leading-[100%] text-black
                                     ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} transition-all duration-200`}
                    >
                        {isLoading ? 'Creating Order...' : showShippingForm ? 'Place Order' : 'Go To Payment'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Order
