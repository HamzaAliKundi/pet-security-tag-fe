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
  GB: { amount: 2.90, currency: 'EUR', symbol: '€' },
  DE: { amount: 2.90, currency: 'EUR', symbol: '€' },
  FR: { amount: 2.90, currency: 'EUR', symbol: '€' },
  IT: { amount: 2.90, currency: 'EUR', symbol: '€' },
  ES: { amount: 2.90, currency: 'EUR', symbol: '€' },
  NL: { amount: 2.90, currency: 'EUR', symbol: '€' },
  BE: { amount: 2.90, currency: 'EUR', symbol: '€' },
  AT: { amount: 2.90, currency: 'EUR', symbol: '€' },
  CH: { amount: 2.90, currency: 'EUR', symbol: '€' },
  SE: { amount: 2.90, currency: 'EUR', symbol: '€' },
  NO: { amount: 2.90, currency: 'EUR', symbol: '€' },
  DK: { amount: 2.90, currency: 'EUR', symbol: '€' },
  FI: { amount: 2.90, currency: 'EUR', symbol: '€' },
  IE: { amount: 2.90, currency: 'EUR', symbol: '€' },
  PT: { amount: 2.90, currency: 'EUR', symbol: '€' },
  PL: { amount: 2.90, currency: 'EUR', symbol: '€' },
  GR: { amount: 2.90, currency: 'EUR', symbol: '€' },
  CZ: { amount: 2.90, currency: 'EUR', symbol: '€' },
  HU: { amount: 2.90, currency: 'EUR', symbol: '€' },
  RO: { amount: 2.90, currency: 'EUR', symbol: '€' },
  BG: { amount: 2.90, currency: 'EUR', symbol: '€' },
  HR: { amount: 2.90, currency: 'EUR', symbol: '€' },
  SK: { amount: 2.90, currency: 'EUR', symbol: '€' },
  SI: { amount: 2.90, currency: 'EUR', symbol: '€' },
  EE: { amount: 2.90, currency: 'EUR', symbol: '€' },
  LV: { amount: 2.90, currency: 'EUR', symbol: '€' },
  LT: { amount: 2.90, currency: 'EUR', symbol: '€' },
  LU: { amount: 2.90, currency: 'EUR', symbol: '€' },
  MT: { amount: 2.90, currency: 'EUR', symbol: '€' },
  CY: { amount: 2.90, currency: 'EUR', symbol: '€' },
}

// Default shipping price (EUR)
const DEFAULT_SHIPPING = { amount: 2.90, currency: 'EUR', symbol: '€' }

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
  const [rates, setRates] = useState({})
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
            // For European countries not in COUNTRY_TO_CURRENCY, show EUR
            if (SHIPPING_PRICES[countryCode]) {
              setTargetCurrency({ code: 'EUR', symbol: '€', label: 'Europe' })
              setMessage('Showing prices in EUR.')
            } else {
              setTargetCurrency({ code: 'EUR', symbol: '€', label: 'Europe' })
              setMessage('Showing prices in EUR.')
            }
          }
        } else {
          // Fallback to default
          setShippingPrice(DEFAULT_SHIPPING)
          setTargetCurrency({ code: 'EUR', symbol: '€', label: 'Europe' })
          setMessage('Showing prices in EUR.')
        }
      } catch (error) {
        console.error('Failed to detect country by IP:', error)
        if (!cancelled) {
          setShippingPrice(DEFAULT_SHIPPING)
          setTargetCurrency({ code: 'EUR', symbol: '€', label: 'Europe' })
          setMessage('Showing prices in EUR.')
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

    const rate = rates?.[baseCurrency.code]?.[targetCurrency.code]

    if (!rate) {
      return {
        amount: Number(numericAmount.toFixed(2)),
        symbol: baseCurrency.symbol,
        code: baseCurrency.code,
        isConverted: false,
      }
    }

    return {
      amount: Number((numericAmount * rate).toFixed(2)),
      symbol: targetCurrency.symbol,
      code: targetCurrency.code,
      isConverted: true,
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

