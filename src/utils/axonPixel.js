// Safe wrappers around the AppLovin Axon pixel (window.axon, installed in index.html).
// Every call is wrapped so a tracking failure (pixel blocked, script not yet
// loaded, unexpected shape) can never throw into or interrupt the real
// checkout flow — at worst an event silently doesn't get recorded.
const track = (eventName, data) => {
    try {
        if (typeof window !== 'undefined' && typeof window.axon === 'function') {
            window.axon('track', eventName, data)
        }
    } catch (error) {
        console.error(`Axon pixel "${eventName}" tracking failed:`, error)
    }
}

// One "item" per physical tag being ordered, matching the colors array.
const buildTagItems = (tagColors, quantity, totalValue) => {
    const colors = (tagColors && tagColors.length > 0) ? tagColors : Array(quantity || 1).fill('blue')
    const unitPrice = quantity > 0 ? (Number(totalValue) || 0) / quantity : 0
    return colors.map((color) => {
        const safeColor = color || 'blue'
        return {
            item_id: `pet-tag-${safeColor}`,
            item_name: `Pet Tag (${safeColor.charAt(0).toUpperCase() + safeColor.slice(1)})`,
            price: Number(unitPrice.toFixed(2)),
            quantity: 1,
            item_category_id: 1,
        }
    })
}

export const trackViewItem = ({ tagColors, quantity, value, currency } = {}) => {
    track('view_item', {
        currency: (currency || 'GBP').toUpperCase(),
        value: Number(value) || undefined,
        items: buildTagItems(tagColors, quantity, value),
    })
}

export const trackAddToCart = ({ tagColors, quantity, value, currency }) => {
    track('add_to_cart', {
        currency: (currency || 'GBP').toUpperCase(),
        value: Number(value) || 0,
        items: buildTagItems(tagColors, quantity, value),
    })
}

export const trackBeginCheckout = ({ tagColors, quantity, value, currency }) => {
    track('begin_checkout', {
        currency: (currency || 'GBP').toUpperCase(),
        value: Number(value) || 0,
        items: buildTagItems(tagColors, quantity, value),
    })
}

export const trackPurchase = ({ orderId, email, tagColors, quantity, value, currency, isNewCustomer }) => {
    track('purchase', {
        currency: (currency || 'GBP').toUpperCase(),
        value: Number(value) || 0,
        shipping: 0,
        tax: 0,
        transaction_id: orderId,
        is_new_customer: Boolean(isNewCustomer),
        items: buildTagItems(tagColors, quantity, value),
        user_data: {
            email: email || undefined,
        },
    })
}
