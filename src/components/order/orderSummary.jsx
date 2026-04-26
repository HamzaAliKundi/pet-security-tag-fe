import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Package, User, MapPin, Phone, Mail, Calendar, Tag } from 'lucide-react'

const OrderSummary = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const orderData = location.state?.orderData || location.state?.confirmResult

    // Scroll to top when page loads
    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    // If no order data, redirect back to order page
    React.useEffect(() => {
        if (!orderData) {
            navigate('/order')
        }
    }, [orderData, navigate])

    if (!orderData) {
        return null
    }

    const order = orderData.order || orderData
    const pets = orderData.pets || []
    const isNewUser = orderData.isNewUser || false

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Format currency
    const formatCurrency = (amount) => {
        return `£${parseFloat(amount || 0).toFixed(2)}`
    }

    // Get tag color display name
    const getColorName = (color) => {
        if (!color) return 'N/A'
        return color.charAt(0).toUpperCase() + color.slice(1)
    }

    // Get tag color image
    const getColorImage = (color) => {
        const colorMap = {
            blue: '/order/tag-blue.jpg',
            pink: '/order/tag-pink.jpg',
            yellow: '/order/tag-yellow.jpg'
        }
        return colorMap[color?.toLowerCase()] || colorMap.blue
    }

    // Get quantity first
    const quantity = order.quantity || 1
    
    // Handle tag colors (could be single string or array)
    // Ensure we have a proper array of colors matching the quantity
    let tagColors = []
    if (order.tagColors && Array.isArray(order.tagColors) && order.tagColors.length > 0) {
        // Use tagColors array if available
        tagColors = order.tagColors.length >= quantity 
            ? order.tagColors.slice(0, quantity) 
            : [...order.tagColors, ...Array(quantity - order.tagColors.length).fill('blue')]
    } else if (order.tagColor) {
        // Fallback to tagColor if tagColors not available
        tagColors = Array(quantity).fill(order.tagColor)
    } else {
        // Default to blue if nothing available
        tagColors = Array(quantity).fill('blue')
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Success Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-100 rounded-full p-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Your order has been confirmed! 
                    </h1>
                    {isNewUser && (
                        <p className="text-green-600 font-semibold mb-2">
                            🎉 Your account has been created! Check your email for login details.
                        </p>
                    )}
                    <p className="text-gray-600">
                        Thank you for your order. We'll send you an email confirmation shortly.
                    </p>
                </div>

                {/* Email Delivery Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-amber-900 text-sm font-medium">
                        Important: If you do not see our confirmation email in your inbox, please check your spam/junk folder as well.
                    </p>
                </div>

                {/* Order Details Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#4CB2E2]" />
                        Order Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Order ID</p>
                            <p className="font-semibold text-gray-900">{order._id || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Order Date</p>
                            <p className="font-semibold text-gray-900 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(order.createdAt)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Order Status</p>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {order.status || 'Confirmed'}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Paid
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tags Ordered */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-[#4CB2E2]" />
                        Tags Ordered ({quantity})
                    </h2>
                    <div className="space-y-4">
                        {Array.from({ length: quantity }).map((_, index) => {
                            // Get the color for this specific tag index - ensure it exists
                            const tagColor = (tagColors && tagColors[index] !== undefined && tagColors[index] !== null && tagColors[index] !== '') 
                                ? tagColors[index] 
                                : 'blue'
                            const pet = pets[index]
                            return (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <img 
                                            src={getColorImage(tagColor)} 
                                            alt={`${getColorName(tagColor)} tag`}
                                            className="w-20 h-20 object-contain rounded-lg border border-gray-200"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900">
                                                Tag {index + 1} - {getColorName(tagColor)}
                                            </h3>
                                        </div>
                                        {pet ? (
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Pet:</span> {pet.petName}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">
                                                Pet details will be updated when you scan the tag
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Customer Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#4CB2E2]" />
                        Customer Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-gray-900">{order.email || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium text-gray-900">{order.name || 'N/A'}</p>
                            </div>
                        </div>
                        {order.phone && (
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium text-gray-900">{order.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Shipping Address */}
                {(order.shippingAddress || order.street) && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#4CB2E2]" />
                            Shipping Address
                        </h2>
                        <div className="text-gray-700">
                            {order.shippingAddress ? (
                                <>
                                    <p className="font-medium">{order.shippingAddress.street || ''}</p>
                                    <p>{order.shippingAddress.city || ''}, {order.shippingAddress.state || ''}</p>
                                    <p>{order.shippingAddress.zipCode || ''}</p>
                                    <p className="font-medium mt-1">{order.shippingAddress.country || ''}</p>
                                </>
                            ) : (
                                <>
                                    <p className="font-medium">{order.street || ''}</p>
                                    <p>{order.city || ''}, {order.state || ''}</p>
                                    <p>{order.zipCode || ''}</p>
                                    <p className="font-medium mt-1">{order.country || ''}</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Order Summary / Pricing */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Number of Tags:</span>
                            <span className="font-medium">{quantity}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total Paid:</span>
                                <span className="text-[#4CB2E2]">{formatCurrency(order.totalCostEuro)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Important Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-blue-900 mb-2">📦 What's Next?</h3>
                    <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• You will receive an email confirmation with your order details</li>
                        <li>• Your physical tags will be shipped to the address provided</li>
                        <li>• Scan the QR code to activate your tag</li>
                        <li>• QR codes will be assigned when you scan your tags for the first time</li>
                        {isNewUser && (
                            <li>• Check your email for your account login details</li>
                        )}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-[#4CB2E2] text-white rounded-lg font-semibold hover:bg-[#3da1d1] transition-colors"
                    >
                        Back to Home
                    </button>
                    {isNewUser && (
                        <button
                            onClick={() => window.location.href = import.meta.env.VITE_DASHBOARD_URL || '#'}
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderSummary

