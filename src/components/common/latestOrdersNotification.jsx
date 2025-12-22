import React, { useState, useEffect } from 'react';
import { useGetLatestOrdersQuery } from '../../apis/orders';

const LatestOrdersNotification = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { data, isLoading, refetch } = useGetLatestOrdersQuery(5);

  // Poll for new orders every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  // Auto-rotate through orders every 13000.5 seconds
  useEffect(() => {
    if (!data?.orders || data.orders.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.orders.length);
    }, 2500); // 3 seconds

    return () => clearInterval(interval);
  }, [data?.orders]);

  if (isLoading || !data?.orders || data.orders.length === 0) {
    return null;
  }

  const currentOrder = data.orders[currentIndex];

  const getCountryFlag = (countryName) => {
    if (!countryName) return null;
    
    const countryLower = countryName.toLowerCase().trim();
    
    // Check for United Kingdom variations
    if (countryLower === 'united kingdom' || 
        countryLower === 'uk' || 
        countryLower === 'united kingdom of great britain and northern ireland' ||
        countryLower.includes('united kingdom')) {
      return '🇬🇧';
    }
    
    // Check for Canada
    if (countryLower === 'canada') {
      return '🇨🇦';
    }
    
    // Check for USA variations
    if (countryLower === 'usa' || 
        countryLower === 'united states' || 
        countryLower === 'united states of america' ||
        countryLower === 'us' ||
        countryLower.includes('united states')) {
      return '🇺🇸';
    }
    
    return null;
  };

  const getLocation = () => {
    const countryFlag = getCountryFlag(currentOrder.country);
    
    if (currentOrder.city && currentOrder.country) {
      if (countryFlag) {
        return `${currentOrder.city} ${countryFlag}`;
      }
      return `${currentOrder.city}, ${currentOrder.country}`;
    }
    if (currentOrder.city) {
      return currentOrder.city;
    }
    if (currentOrder.country) {
      if (countryFlag) {
        return countryFlag;
      }
      return currentOrder.country;
    }
    return null;
  };

  const getTimeAgo = (date) => {
    try {
      const now = new Date();
      const orderDate = new Date(date);
      const diffInSeconds = Math.floor((now.getTime() - orderDate.getTime()) / 1000);

      if (diffInSeconds < 60) {
        return 'Just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
    } catch (error) {
      return 'Just now';
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 bg-[#4CB2E2] text-white rounded-full p-3 shadow-lg hover:bg-[#3da1d1] transition-colors"
        aria-label="Show notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100%-2rem)] sm:w-[320px] md:w-[380px] max-w-[380px] animate-slide-up">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#4CB2E2] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="font-semibold text-sm">Latest Orders</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close notification"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Notification Content */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#E6F7FF] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#4CB2E2]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#0F2137] text-sm mb-1 truncate">
                {currentOrder.name}
              </p>
              <p className="text-[#343D48] text-sm mb-2">
                Bought a smart pet tag
              </p>
              {getLocation() && (
                <p className="text-[#636363] text-xs mb-1 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {getLocation()}
                </p>
              )}
              <p className="text-[#636363] text-xs flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {getTimeAgo(currentOrder.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        {data.orders.length > 1 && (
          <div className="px-4 pb-3 flex gap-1 justify-center">
            {data.orders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#4CB2E2] w-6'
                    : 'bg-gray-300 w-1.5 hover:bg-gray-400'
                }`}
                aria-label={`Go to notification ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestOrdersNotification;

