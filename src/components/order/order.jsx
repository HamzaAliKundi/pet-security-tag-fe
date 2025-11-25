import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useCreateOrderMutation, useConfirmPaymentMutation, useCheckQRAvailabilityQuery } from '../../apis/orders'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useLocalization } from '../../context/LocalizationContext'

// Initialize Stripe using environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY || '')

// Check if Stripe key is configured
if (!import.meta.env.VITE_STRIPE_PUBLISH_KEY) {
  console.warn('VITE_STRIPE_PUBLISH_KEY is not set in environment variables')
}

const OrderForm = () => {
    const [quantity, setQuantity] = useState(1)
    const [selectedPlan, setSelectedPlan] = useState('monthly')
    const [selectedTagColor, setSelectedTagColor] = useState('blue')
    const [tagColors, setTagColors] = useState(['blue']) // Array to store color for each tag
    const [countryCode, setCountryCode] = useState('+44')
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
    const [isProcessing, setIsProcessing] = useState(false)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [activePreview, setActivePreview] = useState(null) // Track which color preview is active
    const colorSelectorRef = useRef(null) // Ref for the color selector container

    const [createOrder, { isLoading }] = useCreateOrderMutation()
    const [confirmPayment] = useConfirmPaymentMutation()
    const { data: qrAvailability, isLoading: isLoadingAvailability } = useCheckQRAvailabilityQuery()
    const stripe = useStripe()
    const elements = useElements()
    const { shippingPrice, isLocalizing: isLocalizingPrice, userCountry } = useLocalization()
    
    // Check if QR codes are available
    const isQRAvailable = qrAvailability?.isAvailable ?? true // Default to true if still loading
    const isOrderDisabled = !isQRAvailable || isLoadingAvailability
    
    // Check if device is mobile/touch
    const isMobileDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    
    // Close preview when clicking outside (mobile only)
    useEffect(() => {
        if (!isMobileDevice || !activePreview) return
        
        const handleClickOutside = (event) => {
            if (colorSelectorRef.current && !colorSelectorRef.current.contains(event.target)) {
                setActivePreview(null)
            }
        }
        
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
        
        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [activePreview, isMobileDevice])
    
    // Determine color spelling based on region (UK/Europe = "Colour", Others = "Color")
    const colorSpelling = (userCountry === 'GB' || (userCountry && ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'PL', 'GR', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SI', 'EE', 'LV', 'LT', 'LU', 'MT', 'CY'].includes(userCountry))) 
        ? 'Colour' 
        : 'Color'

    const shippingMessage = isLocalizingPrice
        ? 'Detecting local pricing…'
        : `Shipping price shown in ${shippingPrice.currency}.`

    const handleIncrement = () => {
        setQuantity(prev => {
            if (prev >= 5) {
                return prev // Maximum limit is 5
            }
            const newQuantity = prev + 1
            // Add default color for new tag
            setTagColors(prevColors => [...prevColors, 'blue'])
            return newQuantity
        })
    }
    const handleDecrement = () => {
        setQuantity(prev => {
            if (prev > 1) {
                const newQuantity = prev - 1
                // Remove last color
                setTagColors(prevColors => prevColors.slice(0, newQuantity))
                return newQuantity
            }
            return prev
        })
    }
    
    const handleTagColorChange = (index, color) => {
        setTagColors(prev => {
            const newColors = [...prev]
            newColors[index] = color
            return newColors
        })
    }

    // Calculate total cost (tag is free, just shipping)
    // Backend expects EUR, so we convert based on the shipping price
    // Note: The actual charge will be in the user's currency, but backend needs EUR for processing
    const totalCost = shippingPrice.currency === 'GBP' 
        ? shippingPrice.amount 
        : shippingPrice.currency === 'USD' 
            ? 2.90 // Convert $9.19 USD to GBP equivalent (backend will handle actual charge)
            : shippingPrice.currency === 'CAD'
                ? 2.90 // Convert CAD 15.09 to GBP equivalent (backend will handle actual charge)
                : 2.90 // Default GBP

    // Calculate total cost including shipping
    // Calculate total cost including shipping
    // const calculateTotalCost = () => {
    //     // const basePrice = selectedPlan === 'monthly' ? 0.95 : 8.95
    //     // const subtotal = basePrice * quantity
    //     // const shippingFee = 2.90
    //     // return (subtotal + shippingFee).toFixed(2)
    // }

    // Country code mapping function
    const getCountryCode = (countryName) => {
        const countryMap = {
            'pakistan': 'PK',
            'united states': 'US',
            'united kingdom': 'GB',
            'canada': 'CA',
            'australia': 'AU',
            'germany': 'DE',
            'france': 'FR',
            'italy': 'IT',
            'spain': 'ES',
            'netherlands': 'NL',
            'belgium': 'BE',
            'switzerland': 'CH',
            'austria': 'AT',
            'sweden': 'SE',
            'norway': 'NO',
            'denmark': 'DK',
            'finland': 'FI',
            'ireland': 'IE',
            'new zealand': 'NZ',
            'japan': 'JP',
            'south korea': 'KR',
            'singapore': 'SG',
            'india': 'IN',
            'china': 'CN',
            'brazil': 'BR',
            'mexico': 'MX',
            'argentina': 'AR',
            'chile': 'CL',
            'colombia': 'CO',
            'peru': 'PE',
            'venezuela': 'VE',
            'uruguay': 'UY',
            'paraguay': 'PY',
            'bolivia': 'BO',
            'ecuador': 'EC',
            'guyana': 'GY',
            'suriname': 'SR',
            'french guiana': 'GF'
        }
        return countryMap[countryName.toLowerCase()] || countryName
    }

    // Tag color options
    const availableTagColors = [
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

        if (!termsAccepted) {
            newErrors.termsAccepted = 'You must accept the Terms and Privacy policies to proceed'
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

        if (!stripe || !elements) {
            toast.error('Stripe is not loaded')
            return
        }

        setIsProcessing(true)

        try {
            // Combine country code with phone number
            const fullPhoneNumber = `${countryCode}${formData.phone}`

            // Get the payment method from Stripe Elements
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: formData.name,
                    email: formData.email,
                    phone: fullPhoneNumber,
                    address: {
                        line1: formData.shippingAddress.street,
                        city: formData.shippingAddress.city,
                        state: formData.shippingAddress.state,
                        postal_code: formData.shippingAddress.zipCode,
                        country: getCountryCode(formData.shippingAddress.country),
                    },
                },
            })

            if (paymentMethodError) {
                toast.error(paymentMethodError.message || 'Payment method creation failed')
                setIsProcessing(false)
                return
            }

            // Ensure tagColors array matches quantity exactly (trim if longer, pad if shorter)
            let finalTagColors;
            if (quantity === 1) {
                finalTagColors = [selectedTagColor];
            } else {
                // For multiple tags, ensure array matches quantity
                if (tagColors.length >= quantity) {
                    finalTagColors = tagColors.slice(0, quantity);
                } else {
                    // Pad with 'blue' if fewer colors than quantity
                    finalTagColors = [...tagColors, ...Array(quantity - tagColors.length).fill('blue')];
                }
            }

            const orderData = {
                email: formData.email,
                name: formData.name,
                petName: formData.petName,
                quantity: quantity,
                subscriptionType: selectedPlan,
                tagColor: quantity === 1 ? selectedTagColor : undefined, // Keep for backward compatibility
                tagColors: finalTagColors, // Array of colors for each tag (exactly matching quantity)
                phone: fullPhoneNumber,
                shippingAddress: formData.shippingAddress,
                totalCostEuro: totalCost,
                paymentMethodId: paymentMethod.id,
                termsAccepted: termsAccepted
            }

            const result = await createOrder(orderData).unwrap()
            
            if (result.payment && result.payment.clientSecret) {
                // Confirm the payment with Stripe
                const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(result.payment.clientSecret, {
                    payment_method: paymentMethod.id,
                })

                if (confirmError) {
                    toast.error(confirmError.message || 'Payment confirmation failed')
                    setIsProcessing(false)
                    return
                }

                if (paymentIntent && paymentIntent.status === 'succeeded') {
                    // Confirm payment with backend to create user account and assign QR code
                    try {
                        const confirmResult = await confirmPayment({
                            orderId: result.order._id,
                            paymentIntentId: paymentIntent.id
                        }).unwrap()

                        if (confirmResult.isNewUser) {
                            toast.success('Payment successful! Your account has been created and you will receive login credentials via email!')
                        } else {
                            toast.success('Payment successful! Order created successfully!')
                        }
                        
                        console.log('Order confirmed:', confirmResult)
                    } catch (confirmError) {
                        console.error('Backend payment confirmation failed:', confirmError)
                        toast.error('Payment processed but account creation failed. Please contact support.')
                    }
                } else {
                    toast.error('Payment not successful. Please try again.')
                    setIsProcessing(false)
                    return
                }
                
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
                setTagColors(['blue'])
                setCountryCode('+44')
                setShowShippingForm(false)
                setTermsAccepted(false)
                
                // Clear Stripe Elements
                elements.getElement(CardElement)?.clear()
            } else {
                toast.error('Payment intent creation failed')
            }
            
        } catch (error) {
            console.error('Error creating order:', error)
            toast.error(error?.data?.message || 'Failed to create order')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleGoToPayment = () => {
        if (!formData.email || !formData.name || !formData.petName) {
            toast.error('Please fill in all required fields first')
            return
        }
        if (!termsAccepted) {
            toast.error('You must accept the Terms and Privacy policies to proceed')
            setErrors(prev => ({
                ...prev,
                termsAccepted: 'You must accept the Terms and Privacy policies to proceed'
            }))
            return
        }
        setShowShippingForm(true)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
            {/* Main Title */}
            <h1 className="font-helvetica-neue font-medium text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-[110%] md:leading-[100%] text-black text-center capitalize mb-6 sm:mb-8 md:mb-12 lg:mb-16 max-w-[300px] sm:max-w-[400px] md:max-w-[482px] mx-auto">
                Order Your Digital Tails
                <br />
                Tag Today!
            </h1>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
                {/* Left Section - Tag Color Selection */}
                <div className="w-full lg:w-[400px] xl:w-[437px] flex flex-col items-center gap-6">
                    <h2 className="font-helvetica-neue font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] leading-[110%] md:leading-[100%] text-black text-center uppercase">
                        CHOOSE YOUR TAG
                    </h2>

                    {/* Tag Color Selection */}
                    <div className="w-full overflow-visible" ref={colorSelectorRef}>
                        <h3 className="font-helvetica-neue font-bold text-[18px] leading-[100%] capitalize mb-6 text-center">
                            {quantity === 1 ? `Select Tag ${colorSpelling}` : `Select ${colorSpelling} for Each Tag`}
                        </h3>
                        
                        {quantity === 1 ? (
                            // Single tag - show color selector
                            <div className="grid grid-cols-3 gap-4 overflow-visible">
                                {availableTagColors.map((color) => (
                                    <div
                                        key={color.id}
                                        className={`cursor-pointer rounded-lg p-4 transition-all duration-200 border-2 relative group overflow-visible touch-manipulation ${
                                            selectedTagColor === color.id
                                                ? `${
                                                    color.id === 'blue' ? 'border-blue-500 bg-blue-50' :
                                                    color.id === 'pink' ? 'border-pink-500 bg-pink-50' :
                                                    'border-yellow-500 bg-yellow-50'
                                                  } shadow-lg`
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTagColor(color.id);
                                            // Only set activePreview on mobile (touch devices)
                                            if (isMobileDevice) {
                                                setActivePreview(color.id);
                                            }
                                        }}
                                        onTouchStart={(e) => {
                                            e.stopPropagation();
                                            setSelectedTagColor(color.id);
                                            setActivePreview(color.id);
                                        }}
                                        onMouseLeave={() => {
                                            // Clear activePreview on desktop when mouse leaves
                                            if (!isMobileDevice) {
                                                setActivePreview(null);
                                            }
                                        }}
                                    >
                                        <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center relative overflow-visible">
                                            <img
                                                src={color.image}
                                                alt={`${color.name} tag`}
                                                className="w-full h-full object-contain pointer-events-none"
                                            />
                                            {/* Magnified preview - shows on hover (desktop) or when active (mobile) */}
                                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-300 ease-out pointer-events-none z-[100] transform origin-bottom ${
                                                // Desktop: show on hover only, Mobile: show when active
                                                activePreview === color.id 
                                                    ? 'opacity-100 scale-100 block md:hidden' 
                                                    : 'md:opacity-0 md:group-hover:opacity-100 md:block md:scale-75 md:group-hover:scale-100 hidden'
                                            }`}>
                                                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-xl shadow-2xl border-4 border-white overflow-hidden bg-white">
                                                    <img
                                                        src={color.image}
                                                        alt={`${color.name} tag enlarged`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                {/* Arrow pointer */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[14px] border-transparent border-t-white"></div>
                                            </div>
                                        </div>
                                        <p className="text-center font-helvetica-neue font-semibold text-sm capitalize pointer-events-none">
                                            {color.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Multiple tags - show color selector for each tag
                            <div className="space-y-6">
                                {Array.from({ length: quantity }).map((_, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-helvetica-neue font-semibold text-sm mb-3 text-center">
                                            Tag {index + 1} {colorSpelling}
                                        </h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            {availableTagColors.map((color) => (
                                                <div
                                                    key={color.id}
                                                    className={`cursor-pointer rounded-lg p-3 transition-all duration-200 border-2 relative group overflow-visible touch-manipulation ${
                                                        tagColors[index] === color.id
                                                            ? `${
                                                                color.id === 'blue' ? 'border-blue-500 bg-blue-50' :
                                                                color.id === 'pink' ? 'border-pink-500 bg-pink-50' :
                                                                'border-yellow-500 bg-yellow-50'
                                                              } shadow-lg`
                                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTagColorChange(index, color.id);
                                                        // Only set activePreview on mobile (touch devices)
                                                        if (isMobileDevice) {
                                                            setActivePreview(`${index}-${color.id}`);
                                                        }
                                                    }}
                                                    onTouchStart={(e) => {
                                                        e.stopPropagation();
                                                        handleTagColorChange(index, color.id);
                                                        setActivePreview(`${index}-${color.id}`);
                                                    }}
                                                    onMouseLeave={() => {
                                                        // Clear activePreview on desktop when mouse leaves
                                                        if (!isMobileDevice) {
                                                            setActivePreview(null);
                                                        }
                                                    }}
                                                >
                                                    <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center relative overflow-visible">
                                                        <img
                                                            src={color.image}
                                                            alt={`${color.name} tag`}
                                                            className="w-full h-full object-contain pointer-events-none"
                                                        />
                                                        {/* Magnified preview for multiple tags - shows on mobile when active */}
                                                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ease-out pointer-events-none z-[100] transform origin-bottom ${
                                                            activePreview === `${index}-${color.id}`
                                                                ? 'opacity-100 scale-100 block md:hidden'
                                                                : 'md:opacity-0 md:group-hover:opacity-100 md:block md:scale-75 md:group-hover:scale-100 hidden'
                                                        }`}>
                                                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl shadow-2xl border-4 border-white overflow-hidden bg-white">
                                                                <img
                                                                    src={color.image}
                                                                    alt={`${color.name} tag enlarged`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-white"></div>
                                                        </div>
                                                    </div>
                                                    <p className="text-center font-helvetica-neue font-semibold text-xs capitalize pointer-events-none">
                                                        {color.name}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pricing Information */}
                    <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-helvetica-neue font-bold text-[18px] leading-[100%] capitalize mb-3">
                            Pricing Information
                        </h3>
                        <div className="space-y-2">

                            {/* <div className="flex justify-between">
                                <span className="font-helvetica-neue text-sm">Monthly Plan:</span>
                                <span className="font-helvetica-neue font-bold text-sm">£2.75/month</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-helvetica-neue text-sm">Yearly Plan:</span>
                                <span className="font-helvetica-neue font-bold text-sm">£28.99/year</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span className="font-helvetica-neue text-sm">Yearly Savings:</span>
                                <span className="font-helvetica-neue font-bold text-sm">{savingsPercentage}%</span>
                            </div>
                            <div className="flex justify-between text-blue-600">
                                <span className="font-helvetica-neue text-sm">Shipping Fee:</span>
                                <span className="font-helvetica-neue font-bold text-sm">£2.90</span>
                            </div> */}

                            <div className="border-t pt-2">
                                <div className="flex justify-between font-bold">
                                    <span className="font-helvetica-neue text-sm">Shipping Fee:</span>
                                    <span className="font-helvetica-neue text-sm">
                                        {shippingPrice.symbol}
                                        {shippingPrice.amount.toFixed(2)} {shippingPrice.currency}
                                    </span>
                                </div>
                            </div>
                            {(isLocalizingPrice || shippingMessage) && (
                                <p className="text-xs text-gray-500 mt-2">
                                    {isLocalizingPrice ? 'Detecting local pricing…' : shippingMessage}
                                </p>
                            )}
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

                    {/* Terms and Privacy Checkbox */}
                    <div className="w-full mt-4 sm:mt-6 flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="terms-checkbox"
                            checked={termsAccepted}
                            onChange={(e) => {
                                setTermsAccepted(e.target.checked)
                                if (errors.termsAccepted) {
                                    setErrors(prev => ({
                                        ...prev,
                                        termsAccepted: ''
                                    }))
                                }
                            }}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-[#4CB2E2] focus:ring-[#4CB2E2] cursor-pointer flex-shrink-0"
                        />
                        <label htmlFor="terms-checkbox" className="font-helvetica-neue font-normal text-[14px] sm:text-[16px] leading-[140%] text-[#333333] cursor-pointer">
                            By clicking this check box, you acknowledge & agree our{' '}
                            <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-[#4CB2E2] hover:underline">
                                terms of service
                            </a>
                            {', '}
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#4CB2E2] hover:underline">
                                Privacy policy
                            </a>
                            {' '}&{' '}
                            <a href="/sms-consent-statement" target="_blank" rel="noopener noreferrer" className="text-[#4CB2E2] hover:underline">
                                sms consent statement
                            </a>
                            .
                        </label>
                    </div>
                    {errors.termsAccepted && (
                        <span className="text-red-500 text-sm mt-1">{errors.termsAccepted}</span>
                    )}

                    {/* Shipping Information - Show when Go to Payment is clicked */}
                    {showShippingForm && (
                        <>
                            {/* Phone Input */}
                            <div className="flex flex-col gap-2">
                                <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                                    Phone Number*
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        className={`rounded-[4px] border px-3 py-2 sm:py-3 font-helvetica-neue text-sm sm:text-base shadow-[0px_0px_4px_0px_#17191C0D] ${
                                            errors.phone ? 'border-red-500' : 'border-[#D8DDE3]'
                                        }`}
                                        style={{ width: '120px' }}
                                    >
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+1">+1 (USA)</option>
                                        <option value="+1">+1 (Canada)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`flex-1 h-[48px] sm:h-[56px] rounded-[4px] border px-3 sm:px-4 py-2 sm:py-3
                                                 shadow-[0px_0px_4px_0px_#17191C0D] ${
                                                   errors.phone ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter phone number"
                                    />
                                </div>
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
                                        placeholder="Enter country name (e.g., United States)"
                                    />
                                    {errors.country && (
                                        <span className="text-red-500 text-sm">{errors.country}</span>
                                    )}
                                </div>
                            </div>

                            {/* Stripe Card Element */}
                            <div className="flex flex-col gap-2">
                                <label className="font-helvetica-neue font-normal text-sm sm:text-base leading-[100%] tracking-[-2%] text-[#05131D]">
                                    Card Details*
                                </label>
                                <div className="w-full h-[48px] sm:h-[56px] rounded-[4px] border border-[#D8DDE3] px-3 sm:px-4 py-2 sm:py-3 shadow-[0px_0px_4px_0px_#17191C0D]">
                                    <CardElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#424770',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    Your card details are securely processed by Stripe
                                </p>
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
                                        disabled={quantity >= 5}
                                        className={`w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-[8px] 
                                         flex items-center justify-center text-xl sm:text-2xl transition-colors ${
                                            quantity >= 5 
                                                ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                                : 'bg-[#FDD30F] hover:bg-[#E6BE0E]'
                                         }`}
                                    >
                                        +
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Availability Message */}
                    {!isLoadingAvailability && !isQRAvailable && (
                        <div className="w-full mt-6 sm:mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-[8px]">
                            <p className="font-helvetica-neue font-semibold text-[14px] sm:text-[16px] text-yellow-800 text-center">
                                ⚠️ We're currently out of stock. New tags will be available soon. Please check back in a day or two.
                            </p>
                        </div>
                    )}

                    {/* Payment Button */}
                    <button 
                        onClick={showShippingForm ? handleSubmit : handleGoToPayment}
                        disabled={isLoading || isProcessing || !stripe || isOrderDisabled || !termsAccepted}
                        className={`w-full h-[48px] sm:h-[56px] rounded-[8px] px-4 sm:px-6 py-2 sm:py-2.5 mt-6 sm:mt-8
                                     bg-gradient-to-r from-[#FFD700] to-[#B89D0B]
                                     font-helvetica-neue font-bold text-[16px] sm:text-[18px] leading-[100%] text-black
                                     ${(isLoading || isProcessing || !stripe || isOrderDisabled || !termsAccepted) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} transition-all duration-200`}
                    >
                        {isLoading || isProcessing ? 'Processing...' : isOrderDisabled ? 'Out of Stock' : showShippingForm ? 'Place Order' : 'Go To Payment'}
                    </button>
                </div>
            </div>
        </div>
    )
}

const Order = () => {
    return (
        <Elements stripe={stripePromise}>
            <OrderForm />
        </Elements>
    )
}

export default Order
