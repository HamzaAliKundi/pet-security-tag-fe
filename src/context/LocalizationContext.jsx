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

const LocalizationContext = createContext({
  targetCurrency: null,
  isLocalizing: false,
  message: '',
  convertAmount: (amount, baseCode) => ({
    amount,
    symbol: BASE_CURRENCIES[baseCode]?.symbol || '',
    code: baseCode,
    isConverted: false,
  }),
})

export const LocalizationProvider = ({ children }) => {
  const [targetCurrency, setTargetCurrency] = useState(null)
  const [isLocalizing, setIsLocalizing] = useState(false)
  const [message, setMessage] = useState('')
  const [rates, setRates] = useState({})

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return
    }

    const geocodeKey = import.meta.env.VITE_OPENCAEGE_API_KEY
    const exchangeKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY

    if (!geocodeKey || !exchangeKey) {
      console.warn('Localization keys are missing. Skipping price localization.')
      return
    }

    let cancelled = false

    const handleLocalization = async (latitude, longitude) => {
      try {
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?key=${geocodeKey}&q=${encodeURIComponent(
          `${latitude},${longitude}`
        )}&no_annotations=1&limit=1`

        const geoResponse = await fetch(geocodeUrl)
        const geoData = await geoResponse.json()

        const countryCodeRaw =
          geoData?.results?.[0]?.components?.['ISO_3166-1_alpha-2']
        const countryCode = countryCodeRaw ? countryCodeRaw.toUpperCase() : null

        if (!countryCode || !COUNTRY_TO_CURRENCY[countryCode]) {
          if (!cancelled) {
            setTargetCurrency(null)
            setRates({})
            setMessage('Showing prices in GBP.')
          }
          return
        }

        const currency = COUNTRY_TO_CURRENCY[countryCode]

        if (currency.code === 'GBP') {
          if (!cancelled) {
            setTargetCurrency(currency)
            setRates({})
            setMessage('Showing prices in GBP.')
          }
          return
        }

        const [eurResponse, gbpResponse] = await Promise.all([
          fetch(`https://v6.exchangerate-api.com/v6/${exchangeKey}/latest/EUR`),
          fetch(`https://v6.exchangerate-api.com/v6/${exchangeKey}/latest/GBP`),
        ])

        const eurData = await eurResponse.json()
        const gbpData = await gbpResponse.json()

        const eurRate = eurData?.conversion_rates?.[currency.code]
        const gbpRate = gbpData?.conversion_rates?.[currency.code]

        if (!eurRate || !gbpRate) {
          throw new Error('Missing conversion rates for target currency.')
        }

        if (!cancelled) {
          setTargetCurrency(currency)
          setRates({
            EUR: { [currency.code]: eurRate },
            GBP: { [currency.code]: gbpRate },
          })
          setMessage(
            `Prices shown in ${currency.code}. Final charges are processed in GBP.`
          )
        }
      } catch (error) {
        console.error('Failed to localize pricing:', error)
        if (!cancelled) {
          setTargetCurrency(null)
          setRates({})
          setMessage('Could not localize pricing. Showing GBP.')
        }
      } finally {
        if (!cancelled) {
          setIsLocalizing(false)
        }
      }
    }

    setIsLocalizing(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        handleLocalization(latitude, longitude)
      },
      (error) => {
        console.warn('Geolocation error:', error)
        if (!cancelled) {
          setIsLocalizing(false)
          setTargetCurrency(null)
          setRates({})
          setMessage('Location access denied. Showing GBP.')
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    )

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

  return (
    <LocalizationContext.Provider
      value={{
        targetCurrency,
        isLocalizing,
        message,
        convertAmount,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  )
}

export const useLocalization = () => useContext(LocalizationContext)

