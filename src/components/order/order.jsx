import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCreateOrderMutation, useConfirmPaymentMutation, useCheckQRAvailabilityQuery, useValidateDiscountMutation } from '../../apis/orders'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, ExpressCheckoutElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useLocalization } from '../../context/LocalizationContext'

// Initialize Stripe using environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY || '')

// Check if Stripe key is configured
if (!import.meta.env.VITE_STRIPE_PUBLISH_KEY) {
  console.warn('VITE_STRIPE_PUBLISH_KEY is not set in environment variables')
}

// Wallet checkout (Apple Pay) rendered inside its own Elements instance.
//
// This deliberately does NOT share the Elements provider used by CardElement below.
// Wallets need Stripe's deferred-intent mode (mode/amount/currency known up front),
// which the legacy CardElement does not support, so the two run side by side and the
// existing card flow stays exactly as it was.
const WalletCheckoutInner = ({
    validateForm,
    buildOrderData,
    createOrder,
    confirmPayment,
    navigate,
    referralCode,
    isBusy,
    isOrderDisabled,
    setIsProcessing,
    onStatusChange,
}) => {
    const stripe = useStripe()
    const elements = useElements()

    // The wallet sheet only opens if we call resolve(), so validate the order form first.
    const handleClick = ({ resolve }) => {
        if (isOrderDisabled) {
            toast.error('Orders are currently unavailable')
            return
        }
        if (isBusy) return
        if (!validateForm()) {
            toast.error('Please fill in all required fields correctly')
            return
        }
        // Shipping/contact details are already collected by our own form above.
        resolve({
            emailRequired: false,
            phoneNumberRequired: false,
            shippingAddressRequired: false,
        })
    }

    const handleConfirm = async () => {
        if (!stripe || !elements) {
            toast.error('Stripe is not loaded')
            return
        }

        setIsProcessing(true)

        try {
            const { error: submitError } = await elements.submit()
            if (submitError) {
                toast.error(submitError.message || 'Payment details could not be validated')
                setIsProcessing(false)
                return
            }

            // Same order payload as the card flow. paymentMethodId is omitted because the
            // wallet credential is supplied at confirm time instead of before order creation.
            const result = await createOrder(buildOrderData(undefined)).unwrap()

            if (!result?.payment?.clientSecret) {
                toast.error('Payment intent creation failed')
                setIsProcessing(false)
                return
            }

            const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
                elements,
                clientSecret: result.payment.clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/order-summary`,
                },
                redirect: 'if_required',
            })

            if (confirmError) {
                toast.error(confirmError.message || 'Payment confirmation failed')
                setIsProcessing(false)
                return
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
                try {
                    const confirmResult = await confirmPayment({
                        orderId: result.order._id,
                        paymentIntentId: paymentIntent.id,
                        referralCode: referralCode || undefined
                    }).unwrap()

                    navigate('/order-summary', {
                        state: {
                            orderData: confirmResult,
                            confirmResult: confirmResult
                        }
                    })
                } catch (backendError) {
                    console.error('Backend payment confirmation failed:', backendError)
                    toast.error('Payment processed but account creation failed. Please contact support.')
                    setIsProcessing(false)
                }
            } else {
                toast.error('Payment not successful. Please try again.')
                setIsProcessing(false)
            }
        } catch (error) {
            console.error('Wallet payment failed:', error)
            toast.error(error?.data?.message || 'Payment failed. Please try again.')
            setIsProcessing(false)
        }
    }

    return (
        <ExpressCheckoutElement
            options={{
                // Apple Pay only for now — flip googlePay to 'auto' to add Google Pay.
                paymentMethods: {
                    applePay: 'auto',
                    googlePay: 'never',
                    klarna: 'never',
                    link: 'never',
                    paypal: 'never',
                    amazonPay: 'never',
                },
                buttonType: { applePay: 'buy' },
                buttonHeight: 44,
            }}
            onReady={({ availablePaymentMethods }) => {
                onStatusChange(availablePaymentMethods ? 'ready' : 'unavailable')
            }}
            onLoadError={() => onStatusChange('unavailable')}
            onClick={handleClick}
            onConfirm={handleConfirm}
            onCancel={() => setIsProcessing(false)}
        />
    )
}

const WalletCheckout = ({ amount, currency, ...rest }) => {
    // Stripe expects the smallest currency unit, matching the backend's Math.round(total * 100).
    const amountInMinorUnits = Math.round((Number(amount) || 0) * 100)

    if (amountInMinorUnits <= 0 || !currency) {
        return null
    }

    return (
        <Elements
            stripe={stripePromise}
            // Currency is not updatable in place, so remount when it changes.
            key={currency}
            options={{
                mode: 'payment',
                amount: amountInMinorUnits,
                currency: currency,
            }}
        >
            <WalletCheckoutInner {...rest} />
        </Elements>
    )
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
        petName: '', // Keep for backward compatibility
        petNames: [''], // Array to store names for each pet
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
    // 'loading' until Stripe reports back, then 'ready' (Apple Pay usable) or 'unavailable'
    const [walletStatus, setWalletStatus] = useState('loading')
    const [cardReady, setCardReady] = useState(false) // CardElement finished mounting
    const colorSelectorRef = useRef(null) // Ref for the color selector container

    const [createOrder, { isLoading }] = useCreateOrderMutation()
    const [confirmPayment] = useConfirmPaymentMutation()
    const [validateDiscount, { isLoading: isValidatingDiscount }] = useValidateDiscountMutation()
    const { data: qrAvailability, isLoading: isLoadingAvailability } = useCheckQRAvailabilityQuery()
    const stripe = useStripe()
    const elements = useElements()
    const { shippingPrice, isLocalizing: isLocalizingPrice, userCountry } = useLocalization()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const referralCode = searchParams.get('ref') // Get referral code from URL
    
    // Discount state
    const [discountCode, setDiscountCode] = useState('')
    const [isDiscountValid, setIsDiscountValid] = useState(false)
    const [discountError, setDiscountError] = useState('')
    const [isDiscountApplied, setIsDiscountApplied] = useState(false)
    
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
            // Add empty pet name for new tag
            setFormData(prev => ({
                ...prev,
                petNames: [...prev.petNames, '']
            }))
            return newQuantity
        })
    }
    const handleDecrement = () => {
        setQuantity(prev => {
            if (prev > 1) {
                const newQuantity = prev - 1
                // Remove last color
                setTagColors(prevColors => prevColors.slice(0, newQuantity))
                // Remove last pet name
                setFormData(prev => ({
                    ...prev,
                    petNames: prev.petNames.slice(0, newQuantity)
                }))
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
    // Use shipping price directly in user's currency (no conversion needed)
    // If discount is valid and applied, shipping is free (0)
    const totalCost = (isDiscountApplied && isDiscountValid) ? 0 : shippingPrice.amount

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

    const handlePetNameChange = (index, value) => {
        setFormData(prev => {
            const newPetNames = [...prev.petNames]
            newPetNames[index] = value
            return {
                ...prev,
                petNames: newPetNames,
                petName: quantity === 1 ? value : prev.petName // Keep petName for backward compatibility
            }
        })
        // Clear error when user starts typing
        if (errors[`petName_${index}`] || errors.petName) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[`petName_${index}`]
                delete newErrors.petName
                return newErrors
            })
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
        
        // Validate pet names - check each pet name in the array up to quantity
        if (quantity === 1) {
            if (!formData.petNames[0] || !formData.petNames[0].trim()) {
                newErrors.petName = 'Pet name is required'
            }
        } else {
            // For multiple pets, validate each name up to the quantity
            for (let index = 0; index < quantity; index++) {
                const petName = formData.petNames[index] || ''
                if (!petName || !petName.trim()) {
                    newErrors[`petName_${index}`] = `Pet ${index + 1} name is required`
                }
            }
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

    // Builds the create-order payload. Shared by the card and wallet flows so the two
    // can never drift apart.
    const buildOrderData = (paymentMethodId) => {
        const fullPhoneNumber = `${countryCode}${formData.phone}`

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

        // Prepare pet names - use petNames array if available, otherwise fallback to petName
        const petNamesArray = formData.petNames.filter(name => name && name.trim()).length > 0
            ? formData.petNames.map(name => name.trim()).filter(name => name)
            : (formData.petName ? [formData.petName.trim()] : [''])

        return {
            email: formData.email,
            name: formData.name,
            petName: quantity === 1 ? petNamesArray[0] : petNamesArray.join(', '), // Keep for backward compatibility
            petNames: petNamesArray, // Array of pet names
            quantity: quantity,
            subscriptionType: selectedPlan,
            tagColor: quantity === 1 ? selectedTagColor : undefined, // Keep for backward compatibility
            tagColors: finalTagColors, // Array of colors for each tag (exactly matching quantity)
            phone: fullPhoneNumber,
            shippingAddress: formData.shippingAddress,
            totalCostEuro: totalCost, // Keep same field name for backward compatibility (but now contains amount in user's currency)
            currency: shippingPrice.currency.toLowerCase(), // Send currency from LocalizationContext
            paymentMethodId: paymentMethodId,
            termsAccepted: termsAccepted,
            isDiscount: isDiscountApplied && isDiscountValid // Add discount flag
        }
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error('Please fill in all required fields correctly')
            return
        }

        // For free orders (discount applied), skip Stripe validation
        const isFreeOrder = totalCost === 0
        
        if (!isFreeOrder) {
            if (!stripe || !elements) {
                toast.error('Stripe is not loaded')
                return
            }
        }

        setIsProcessing(true)

        try {
            // Combine country code with phone number
            const fullPhoneNumber = `${countryCode}${formData.phone}`

            let paymentMethod = null;
            
            // Only get payment method if order is not free
            if (!isFreeOrder) {
                // Get the payment method from Stripe Elements
                const { error: paymentMethodError, paymentMethod: pm } = await stripe.createPaymentMethod({
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
                
                paymentMethod = pm
            }

            const orderData = buildOrderData(paymentMethod?.id)

            const result = await createOrder(orderData).unwrap()
            
            // Handle free orders (no payment required)
            if (result.isFreeOrder) {
                // Navigate to order summary page directly for free orders
                navigate('/order-summary', {
                    state: {
                        orderData: result,
                        confirmResult: result
                    }
                })
                return
            }
            
            // Handle paid orders with Stripe payment
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
                    // Confirm payment with backend to create user account (QR codes will be assigned when tags are scanned)
                    try {
                        const confirmResult = await confirmPayment({
                            orderId: result.order._id,
                            paymentIntentId: paymentIntent.id,
                            referralCode: referralCode || undefined // Pass referral code if present
                        }).unwrap()

                        // Navigate to order summary page with order data
                        navigate('/order-summary', {
                            state: {
                                orderData: confirmResult,
                                confirmResult: confirmResult
                            }
                        })
                    } catch (confirmError) {
                        console.error('Backend payment confirmation failed:', confirmError)
                        toast.error('Payment processed but account creation failed. Please contact support.')
                        setIsProcessing(false)
                    }
                } else {
                    toast.error('Payment not successful. Please try again.')
                    setIsProcessing(false)
                    return
                }
            } else {
                toast.error('Payment intent creation failed')
                setIsProcessing(false)
            }
            
        } catch (error) {
            console.error('Error creating order:', error)
            toast.error(error?.data?.message || 'Failed to create order')
            setIsProcessing(false)
        }
    }

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) {
            setDiscountError('Please enter a discount code')
            return
        }

        try {
            const result = await validateDiscount(discountCode.trim()).unwrap()
            
            if (result.valid) {
                setIsDiscountValid(true)
                setIsDiscountApplied(true)
                setDiscountError('')
                toast.success('Discount code applied successfully!')
            } else {
                setIsDiscountValid(false)
                setIsDiscountApplied(false)
                setDiscountError(result.message || 'Invalid discount code')
            }
        } catch (error) {
            setIsDiscountValid(false)
            setIsDiscountApplied(false)
            const errorMessage = error?.data?.message || 'Failed to validate discount code'
            setDiscountError(errorMessage)
            toast.error(errorMessage)
        }
    }

    const handleGoToPayment = () => {
        // Check if all pet names are filled up to the quantity
        let allPetNamesFilled = true
        for (let index = 0; index < quantity; index++) {
            const petName = formData.petNames[index] || ''
            if (!petName || !petName.trim()) {
                allPetNamesFilled = false
                // Set error for this specific pet name
                setErrors(prev => ({
                    ...prev,
                    [`petName_${index}`]: `Pet ${index + 1} name is required`
                }))
                break
            }
        }
        
        if (!formData.email || !formData.name || !allPetNamesFilled) {
            if (!allPetNamesFilled) {
                toast.error(`Please enter names for all ${quantity} pet(s)`)
            } else {
                toast.error('Please fill in all required fields first')
            }
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

                    {/* Tag Back Image */}
                    <div className="w-full mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                        <h3 className="font-helvetica-neue font-bold text-[16px] leading-[100%] capitalize mb-3 text-center">
                            Tag Back View
                        </h3>
                        <div className="flex justify-center items-center">
                            <img
                                src="/order/tag-back.png"
                                alt="Tag back view - Scan me I'm lost"
                                className="max-w-full h-auto object-contain"
                                style={{ maxHeight: '300px' }}
                            />
                        </div>
                        <p className="text-center font-helvetica-neue text-sm text-gray-600 mt-3">
                            Scan me I'm lost
                        </p>
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
                                    <span className={`font-helvetica-neue text-sm ${(isDiscountApplied && isDiscountValid) ? 'text-green-600' : ''}`}>
                                        {(isDiscountApplied && isDiscountValid) ? (
                                            <>Free</>
                                        ) : (
                                            <>
                                                {shippingPrice.symbol}
                                                {shippingPrice.amount.toFixed(2)} {shippingPrice.currency}
                                            </>
                                        )}
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
                <div className="w-full lg:w-[600px] xl:w-[650px] flex flex-col gap-3.5 sm:gap-4">
                    {/* Email + Name - side by side from tablet up */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-start">
                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                            Your Email Address*
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                     shadow-[0px_1px_2px_0px_#17191C0D] ${
                                       errors.email ? 'border-red-500' : 'border-[#D8DDE3]'
                                     }`}
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email}</span>
                        )}
                    </div>

                    {/* Name Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                            Your Name*
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                     shadow-[0px_1px_2px_0px_#17191C0D] ${
                                       errors.name ? 'border-red-500' : 'border-[#D8DDE3]'
                                     }`}
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-xs">{errors.name}</span>
                        )}
                    </div>
                    </div>

                    {/* Pet Name Input(s) - Dynamic based on quantity */}
                    {quantity === 1 ? (
                        <div className="flex flex-col gap-1.5">
                            <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                Your Pet Name*
                            </label>
                            <input
                                type="text"
                                value={formData.petNames[0] || ''}
                                onChange={(e) => handlePetNameChange(0, e.target.value)}
                                className={`w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                         shadow-[0px_1px_2px_0px_#17191C0D] ${
                                           errors.petName ? 'border-red-500' : 'border-[#D8DDE3]'
                                         }`}
                                placeholder="Enter pet name"
                            />
                            {errors.petName && (
                                <span className="text-red-500 text-xs">{errors.petName}</span>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                Pet Names* ({quantity} pets)
                            </label>
                            {Array.from({ length: quantity }).map((_, index) => (
                                <div key={index} className="flex flex-col gap-1.5">
                                    <label className="font-helvetica-neue font-normal text-xs sm:text-sm leading-[100%] tracking-[-2%] text-[#666666]">
                                        Pet {index + 1} Name*
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.petNames[index] || ''}
                                        onChange={(e) => handlePetNameChange(index, e.target.value)}
                                        className={`w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                                 shadow-[0px_1px_2px_0px_#17191C0D] ${
                                                   errors[`petName_${index}`] ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder={`Enter pet ${index + 1} name`}
                                    />
                                    {errors[`petName_${index}`] && (
                                        <span className="text-red-500 text-xs">{errors[`petName_${index}`]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Discount Code Input */}
                    <div className="w-full mt-4 sm:mt-6 flex flex-col gap-2">
                        <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                            Discount Code (Optional)
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => {
                                    setDiscountCode(e.target.value)
                                    setDiscountError('')
                                    setIsDiscountValid(false)
                                    setIsDiscountApplied(false)
                                }}
                                placeholder="Enter discount code"
                                className={`flex-1 h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                         shadow-[0px_1px_2px_0px_#17191C0D] ${
                                           discountError ? 'border-red-500' : isDiscountValid ? 'border-green-500' : 'border-[#D8DDE3]'
                                         }`}
                                disabled={isValidatingDiscount}
                            />
                            <button
                                type="button"
                                onClick={handleApplyDiscount}
                                disabled={!discountCode.trim() || isValidatingDiscount || isDiscountApplied}
                                className={`h-[42px] sm:h-[44px] px-5 rounded-[8px] font-helvetica-neue font-semibold text-[14px] sm:text-[15px] transition-colors shrink-0 ${
                                    !discountCode.trim() || isValidatingDiscount || isDiscountApplied
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-[#4CB2E2] text-white hover:bg-[#3da1d1]'
                                }`}
                            >
                                {isValidatingDiscount ? 'Checking...' : isDiscountApplied ? 'Applied' : 'Apply'}
                            </button>
                        </div>
                        {discountError && (
                            <span className="text-red-500 text-xs">{discountError}</span>
                        )}
                        {isDiscountValid && isDiscountApplied && (
                            <span className="text-green-600 text-sm">✓ Discount code applied successfully!</span>
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
                            By clicking this check box, you acknowledge & agree to our{' '}
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
                            <div className="flex flex-col gap-1.5">
                                <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                    Phone Number*
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        className={`dt-select h-[42px] sm:h-[44px] rounded-[8px] border bg-white pl-3.5 pr-9 font-helvetica-neue text-[14px] sm:text-[15px] text-[#05131D] shadow-[0px_1px_2px_0px_#17191C0D] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25 ${
                                            errors.phone ? 'border-red-500' : 'border-[#D8DDE3]'
                                        }`}
                                        style={{ width: '104px' }}
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
                                        className={`flex-1 h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                                 shadow-[0px_1px_2px_0px_#17191C0D] ${
                                                   errors.phone ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                {errors.phone && (
                                    <span className="text-red-500 text-xs">{errors.phone}</span>
                                )}
                            </div>

                            {/* Shipping Address */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                        Street Address*
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.shippingAddress.street}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                                 shadow-[0px_1px_2px_0px_#17191C0D] ${
                                                   errors.street ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter street address"
                                    />
                                    {errors.street && (
                                        <span className="text-red-500 text-xs">{errors.street}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                        City*
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.shippingAddress.city}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                                 shadow-[0px_1px_2px_0px_#17191C0D] ${
                                                   errors.city ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter city"
                                    />
                                    {errors.city && (
                                        <span className="text-red-500 text-xs">{errors.city}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                        State / County*
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.shippingAddress.state}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                                 shadow-[0px_1px_2px_0px_#17191C0D] ${
                                                   errors.state ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter state"
                                    />
                                    {errors.state && (
                                        <span className="text-red-500 text-xs">{errors.state}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                        Zip Code / Post code*
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.shippingAddress.zipCode}
                                        onChange={handleShippingAddressChange}
                                        className={`w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white px-3.5 text-[14px] sm:text-[15px] text-[#05131D] placeholder:text-[#9AA3AE] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                                 shadow-[0px_1px_2px_0px_#17191C0D] ${
                                                   errors.zipCode ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                        placeholder="Enter zip code"
                                    />
                                    {errors.zipCode && (
                                        <span className="text-red-500 text-xs">{errors.zipCode}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                        Country*
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.shippingAddress.country}
                                        onChange={handleShippingAddressChange}
                                        className={`dt-select w-full h-[42px] sm:h-[44px] rounded-[8px] border bg-white pl-3.5 pr-9 text-[14px] sm:text-[15px] text-[#05131D] outline-none transition duration-150 focus:border-[#FDD30F] focus:ring-[3px] focus:ring-[#FDD30F]/25
                                                 shadow-[0px_1px_2px_0px_#17191C0D] ${
                                                   errors.country ? 'border-red-500' : 'border-[#D8DDE3]'
                                                 }`}
                                    >
                                        <option value="" disabled selected>Select Country</option>
                                        <option value="United States">United States</option>
                                        <option value="UK">UK</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                    {errors.country && (
                                        <span className="text-red-500 text-xs">{errors.country}</span>
                                    )}
                                </div>
                            </div>

                            {/* Apple Pay - Only show if order is not free and the device supports it.
                                Kept mounted (not unmounted) while unavailable so Stripe can report
                                availability via onReady; hidden with CSS until then. */}
                            {!(isDiscountApplied && isDiscountValid) && (
                                <>
                                    {/* Placeholder while Stripe works out whether Apple Pay is usable.
                                        Replaced by the real button, or removed if unavailable. */}
                                    {walletStatus === 'loading' && Math.round((Number(totalCost) || 0) * 100) > 0 && (
                                        <div className="flex flex-col gap-3">
                                            <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                                Express Checkout
                                            </label>
                                            <div className="w-full h-[44px] rounded-[8px] bg-gray-100 animate-pulse flex items-center justify-center gap-2">
                                                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-xs text-gray-500">Checking available payment methods...</span>
                                            </div>
                                        </div>
                                    )}

                                {/* NOTE: never use `display: none` here. Stripe Elements cannot
                                    initialise inside a display:none container, so onReady would never
                                    fire and the section could never become visible. Clip it instead. */}
                                <div className={walletStatus === 'ready'
                                    ? 'flex flex-col gap-3'
                                    : 'flex flex-col gap-3 h-0 overflow-hidden opacity-0 pointer-events-none'}>
                                    <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                        Express Checkout
                                    </label>
                                    <WalletCheckout
                                        amount={totalCost}
                                        currency={shippingPrice.currency.toLowerCase()}
                                        validateForm={validateForm}
                                        buildOrderData={buildOrderData}
                                        createOrder={createOrder}
                                        confirmPayment={confirmPayment}
                                        navigate={navigate}
                                        referralCode={referralCode}
                                        isBusy={isLoading || isProcessing}
                                        isOrderDisabled={isOrderDisabled}
                                        setIsProcessing={setIsProcessing}
                                        onStatusChange={setWalletStatus}
                                    />
                                    <div className="flex items-center gap-3">
                                        <span className="h-px flex-1 bg-[#D8DDE3]" />
                                        <span className="font-helvetica-neue text-xs text-gray-500 uppercase tracking-wide">
                                            Or pay with card
                                        </span>
                                        <span className="h-px flex-1 bg-[#D8DDE3]" />
                                    </div>
                                </div>
                                </>
                            )}

                            {/* Stripe Card Element - Only show if order is not free (discount not applied) */}
                            {!(isDiscountApplied && isDiscountValid) && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-helvetica-neue font-medium text-[13px] sm:text-sm leading-[100%] tracking-[-1%] text-[#4B5563]">
                                        Card Details*
                                    </label>
                                    <div className="relative w-full h-[42px] sm:h-[44px] rounded-[8px] border border-[#D8DDE3] bg-white px-3.5 flex flex-col justify-center shadow-[0px_1px_2px_0px_#17191C0D] transition duration-150 focus-within:border-[#FDD30F] focus-within:ring-[3px] focus-within:ring-[#FDD30F]/25">
                                        {/* Overlay while Stripe.js loads; CardElement stays mounted underneath */}
                                        {!cardReady && (
                                            <div className="absolute inset-0 rounded-[8px] bg-gray-100 animate-pulse flex items-center gap-2 px-3.5">
                                                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-xs text-gray-500">Loading secure card field...</span>
                                            </div>
                                        )}
                                        <CardElement
                                            onReady={() => setCardReady(true)}
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '15px',
                                                        color: '#05131D',
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
                            )}
                            
                            {/* Free order message when discount is applied */}
                            {(isDiscountApplied && isDiscountValid) && (
                                <div className="flex flex-col gap-2 p-4 bg-green-50 border border-green-200 rounded-[4px]">
                                    <p className="font-helvetica-neue font-semibold text-sm text-green-800">
                                        ✓ Free Order - No payment required. Card information will be collected when you activate your subscription.
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            {/* Quantity Selector */}
                            <div className="mt-2">
                                <h3 className="font-helvetica-neue font-semibold text-[15px] sm:text-[16px] leading-[100%] capitalize mb-3 text-center text-[#05131D]">
                                    How Many Tags Do You Want To Order?
                                </h3>
                                <div className="flex w-full items-center justify-center">
                                    {/* Single joined control rather than three separate blocks */}
                                    <div className="inline-flex items-stretch rounded-[8px] border border-[#D8DDE3] bg-white overflow-hidden shadow-[0px_1px_2px_0px_#17191C0D]">
                                        <button
                                            type="button"
                                            aria-label="Decrease quantity"
                                            onClick={handleDecrement}
                                            disabled={quantity <= 1}
                                            className={`w-[42px] h-[42px] flex items-center justify-center text-xl leading-none transition-colors ${
                                                quantity <= 1
                                                    ? 'text-[#C4C9D1] cursor-not-allowed'
                                                    : 'text-[#4B5563] hover:bg-gray-50 active:bg-gray-100'
                                            }`}
                                        >
                                            &minus;
                                        </button>
                                        <span className="w-[56px] h-[42px] flex items-center justify-center border-x border-[#D8DDE3] text-[15px] font-semibold text-[#05131D] tabular-nums">
                                            {quantity}
                                        </span>
                                        <button
                                            type="button"
                                            aria-label="Increase quantity"
                                            onClick={handleIncrement}
                                            disabled={quantity >= 5}
                                            className={`w-[42px] h-[42px] flex items-center justify-center text-xl leading-none transition-colors ${
                                                quantity >= 5
                                                    ? 'text-[#C4C9D1] cursor-not-allowed'
                                                    : 'text-[#05131D] hover:bg-[#FDD30F]/20 active:bg-[#FDD30F]/30'
                                            }`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-2 text-center text-xs text-[#9AA3AE]">Maximum 5 tags per order</p>
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
                        className={`w-full h-[46px] sm:h-[48px] rounded-[8px] px-5 mt-5 sm:mt-6
                                     bg-gradient-to-r from-[#FFD700] to-[#B89D0B]
                                     font-helvetica-neue font-bold text-[15px] sm:text-[16px] leading-[100%] text-black
                                     shadow-[0px_1px_2px_0px_#17191C0D]
                                     ${(isLoading || isProcessing || !stripe || isOrderDisabled || !termsAccepted) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.995]'} transition-all duration-200`}
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
