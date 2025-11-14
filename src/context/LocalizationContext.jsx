import React, { createContext, useContext, useEffect, useState } from 'react'

const COUNTRY_TO_CURRENCY = {
  GB: { code: 'GBP', symbol: '£', label: 'United Kingdom' },
  US: { code: 'USD', symbol: '$', label: 'United States' },
  CA: { code: 'CAD', symbol: '$', label: 'Canada' },
}

const BASE_CURRENCIES = {
  EUR: { code: 'EUR', symbol: '€' },
  GBP: { code: 'GBP', symbol: '£' },
}

// Shipping prices by country
const SHIPPING_PRICES = {
  US: { amount: 9.19, currency: 'USD', symbol: '$' },
  CA: { amount: 15.09, currency: 'CAD', symbol: '$' },
  // European countries
  GB: { amount: 2.90, currency: 'GBP', symbol: '£' },
  DE: { amount: 2.90, currency: 'GBP', symbol: '£' },
  FR: { amount: 2.90, currency: 'GBP', symbol: '£' },
  IT: { amount: 2.90, currency: 'GBP', symbol: '£' },
  ES: { amount: 2.90, currency: 'GBP', symbol: '£' },
  NL: { amount: 2.90, currency: 'GBP', symbol: '£' },
  BE: { amount: 2.90, currency: 'GBP', symbol: '£' },
  AT: { amount: 2.90, currency: 'GBP', symbol: '£' },
  CH: { amount: 2.90, currency: 'GBP', symbol: '£' },
  SE: { amount: 2.90, currency: 'GBP', symbol: '£' },
  NO: { amount: 2.90, currency: 'GBP', symbol: '£' },
  DK: { amount: 2.90, currency: 'GBP', symbol: '£' },
  FI: { amount: 2.90, currency: 'GBP', symbol: '£' },
  IE: { amount: 2.90, currency: 'GBP', symbol: '£' },
  PT: { amount: 2.90, currency: 'GBP', symbol: '£' },
  PL: { amount: 2.90, currency: 'GBP', symbol: '£' },
  GR: { amount: 2.90, currency: 'GBP', symbol: '£' },
  CZ: { amount: 2.90, currency: 'GBP', symbol: '£' },
  HU: { amount: 2.90, currency: 'GBP', symbol: '£' },
  RO: { amount: 2.90, currency: 'GBP', symbol: '£' },
  BG: { amount: 2.90, currency: 'GBP', symbol: '£' },
  HR: { amount: 2.90, currency: 'GBP', symbol: '£' },
  SK: { amount: 2.90, currency: 'GBP', symbol: '£' },
  SI: { amount: 2.90, currency: 'GBP', symbol: '£' },
  EE: { amount: 2.90, currency: 'GBP', symbol: '£' },
  LV: { amount: 2.90, currency: 'GBP', symbol: '£' },
  LT: { amount: 2.90, currency: 'GBP', symbol: '£' },
  LU: { amount: 2.90, currency: 'GBP', symbol: '£' },
  MT: { amount: 2.90, currency: 'GBP', symbol: '£' },
  CY: { amount: 2.90, currency: 'GBP', symbol: '£' },
}

// Default shipping price (GBP)
const DEFAULT_SHIPPING = { amount: 2.90, currency: 'GBP', symbol: '£' }

const LocalizationContext = createContext({
  targetCurrency: null,
  isLocalizing: false,
  message: '',
  userCountry: null,
  shippingPrice: DEFAULT_SHIPPING,
  convertAmount: (amount, baseCode) => ({
    amount,
    symbol: BASE_CURRENCIES[baseCode]?.symbol || '',
    code: baseCode,
    isConverted: false,
  }),
  getShippingPrice: () => DEFAULT_SHIPPING,
})

export const LocalizationProvider = ({ children }) => {
  const [targetCurrency, setTargetCurrency] = useState(null)
  const [isLocalizing, setIsLocalizing] = useState(false)
  const [message, setMessage] = useState('')
  const [userCountry, setUserCountry] = useState(null)
  const [shippingPrice, setShippingPrice] = useState(DEFAULT_SHIPPING)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let cancelled = false

    const detectCountryByIP = async () => {
      try {
        setIsLocalizing(true)
        
        // Use ipapi.co for IP-based geolocation (free tier, no API key needed)
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()

        if (cancelled) return

        const countryCode = data?.country_code?.toUpperCase() || null

        if (countryCode) {
          setUserCountry(countryCode)
          
          // Set shipping price based on country
          const shipping = SHIPPING_PRICES[countryCode] || DEFAULT_SHIPPING
          setShippingPrice(shipping)

          // Set currency for display
          if (COUNTRY_TO_CURRENCY[countryCode]) {
            const currency = COUNTRY_TO_CURRENCY[countryCode]
            setTargetCurrency(currency)
            setMessage(`Showing prices in ${currency.code}.`)
          } else {
            // For European countries not in COUNTRY_TO_CURRENCY, show GBP
            if (SHIPPING_PRICES[countryCode]) {
              setTargetCurrency({ code: 'GBP', symbol: '£', label: 'Europe' })
              setMessage('Showing prices in GBP.')
            } else {
              setTargetCurrency({ code: 'GBP', symbol: '£', label: 'Europe' })
              setMessage('Showing prices in GBP.')
            }
          }
        } else {
          // Fallback to default
          setShippingPrice(DEFAULT_SHIPPING)
          setTargetCurrency({ code: 'GBP', symbol: '£', label: 'Europe' })
          setMessage('Showing prices in GBP.')
        }
      } catch (error) {
        console.error('Failed to detect country by IP:', error)
        if (!cancelled) {
          setShippingPrice(DEFAULT_SHIPPING)
          setTargetCurrency({ code: 'GBP', symbol: '£', label: 'Europe' })
          setMessage('Showing prices in GBP.')
        }
      } finally {
        if (!cancelled) {
          setIsLocalizing(false)
        }
      }
    }

    detectCountryByIP()

    return () => {
      cancelled = true
    }
  }, [])

  const convertAmount = (amount, baseCode = 'GBP') => {
    const numericAmount = Number(amount)
    const baseCurrency =
      BASE_CURRENCIES[baseCode] || { code: baseCode, symbol: '' }

    if (!Number.isFinite(numericAmount)) {
      return {
        amount: 0,
        symbol: baseCurrency.symbol,
        code: baseCurrency.code,
        isConverted: false,
      }
    }

    if (!targetCurrency || targetCurrency.code === baseCurrency.code) {
      return {
        amount: Number(numericAmount.toFixed(2)),
        symbol: baseCurrency.symbol,
        code: baseCurrency.code,
        isConverted: false,
      }
    }

    // Since we're using fixed prices, just return the base currency amount
    return {
      amount: Number(numericAmount.toFixed(2)),
      symbol: baseCurrency.symbol,
      code: baseCurrency.code,
      isConverted: false,
    }
  }

  const getShippingPrice = () => {
    return shippingPrice
  }

  return (
    <LocalizationContext.Provider
      value={{
        targetCurrency,
        isLocalizing,
        message,
        userCountry,
        shippingPrice,
        convertAmount,
        getShippingPrice,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  )
}

export const useLocalization = () => useContext(LocalizationContext)

