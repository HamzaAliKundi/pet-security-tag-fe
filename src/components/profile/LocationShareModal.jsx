import React, { useState } from 'react';

const LocationShareModal = ({ isOpen, onClose, petId, petName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [isLocationRequested, setIsLocationRequested] = useState(false);


  const handleShareLocation = async (method) => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    // Prevent multiple simultaneous requests
    if (isLocationRequested) {
      console.log('Location request already in progress, ignoring...');
      return;
    }

    setIsLoading(true);
    setSelectedMethod(method);
    setIsLocationRequested(true);

    let position = null;
    
    try {
      console.log('🌍 Requesting location...');
      
      // Use a different approach - get location with Promise race
      position = await new Promise((resolve, reject) => {
        let resolved = false;
        
        const successCallback = (pos) => {
          if (!resolved) {
            resolved = true;
            console.log('✅ Location obtained successfully:', pos);
            console.log('📍 Coordinates:', pos.coords.latitude, pos.coords.longitude);
            resolve(pos);
          }
        };
        
        const errorCallback = (error) => {
          console.error('❌ Geolocation error (might be ignored):', error);
          // Don't reject immediately, wait a bit to see if success callback fires
          setTimeout(() => {
            if (!resolved) {
              resolved = true;
              reject(error);
            }
          }, 100);
        };
        
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback,
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000 // Allow 5 minute old location
          }
        );
      });

      const { latitude, longitude } = position.coords;
      const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

      console.log('📍 Location coordinates:', { latitude, longitude });
      console.log('🔗 Location URL:', locationUrl);

      // Handle WhatsApp differently - open WhatsApp directly
      if (method === 'whatsapp') {
        console.log('💬 Opening WhatsApp...');
        
        // First, get the owner's phone number from backend
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/qr/share-location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            petId,
            method: 'get-phone', // Special method to just get phone number
            latitude,
            longitude,
            locationUrl,
            petName
          }),
        });

        const result = await response.json();
        
        if (response.ok && result.phoneNumber) {
          // Remove formatting from phone number (remove spaces, dashes, etc)
          const cleanPhone = result.phoneNumber.replace(/[^0-9+]/g, '');
          
          // Create WhatsApp message
          const whatsappMessage = `🐾 *Pet Found Alert!*\n\n*${petName}* has been found!\n\n📍 *GPS Location:* ${locationUrl}\n\nPlease contact the finder to arrange pickup. Thank you for using Digital Tails!`;
          
          // Open WhatsApp with pre-filled message
          const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
          
          console.log('📱 Opening WhatsApp URL:', whatsappUrl);
          window.open(whatsappUrl, '_blank');
          
          alert(`✅ Opening WhatsApp to share location with pet owner!`);
          onClose();
        } else {
          alert(`❌ Failed to get owner's phone number: ${result.message || 'Unknown error'}`);
        }
        
        setIsLoading(false);
        setIsLocationRequested(false);
        return;
      }

      // For SMS, send through backend
      console.log('📤 Sending SMS through backend...');

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/qr/share-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId,
          method,
          latitude,
          longitude,
          locationUrl,
          petName
        }),
      });

      console.log('📡 Backend response status:', response.status);
      
      const result = await response.json();
      console.log('📨 Backend response:', result);

      if (response.ok) {
        alert(`✅ Location shared successfully via ${method.toUpperCase()}!`);
        onClose();
      } else {
        alert(`❌ Failed to share location: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error in location sharing:', error);
      
      // If we got the position but there was an error, still try to send it
      if (position && position.coords) {
        console.log('🔄 Retrying with obtained position despite error...');
        try {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

          console.log('📍 Using location:', { latitude, longitude });

          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/qr/share-location`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              petId,
              method,
              latitude,
              longitude,
              locationUrl,
              petName
            }),
          });

          await response.json();
          
          if (response.ok) {
            alert(`✅ Location shared successfully via ${method.toUpperCase()}!`);
            onClose();
            return;
          }
        } catch (retryError) {
          console.error('❌ Retry failed:', retryError);
        }
      }
      
      if (error.code === 1) {
        alert('❌ Location access denied. Please refresh the page and allow location access.');
      } else if (error.code === 2) {
        alert('❌ Location unavailable. Please check your GPS settings.');
      } else if (error.code === 3) {
        alert('❌ Location request timed out. Please try again.');
      } else {
        alert('❌ Failed to get location. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSelectedMethod('');
      setIsLocationRequested(false);
    }
  };

  const handleManualLocationShare = async (method) => {
    if (!manualLocation.trim()) {
      alert('Please enter a location description.');
      return;
    }

    setIsLoading(true);
    setSelectedMethod(method);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/qr/share-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId,
          method,
          latitude: null,
          longitude: null,
          locationUrl: manualLocation,
          petName,
          isManualLocation: true
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Location shared successfully via ${method.toUpperCase()}!`);
        onClose();
      } else {
        alert(`❌ Failed to share location: ${result.message || 'Unknown error'}`);
      }
    } catch {
      alert('❌ Failed to share location. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedMethod('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Share Location for {petName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Choose how you want to share your location with the pet owner:
        </p>

        {!showManualLocation ? (
          <div className="space-y-4">
            <button
              onClick={() => handleShareLocation('sms')}
              disabled={isLoading}
              className={`w-full h-14 bg-green-600 text-white rounded-lg flex items-center justify-center gap-3 font-medium transition-colors ${
                isLoading && selectedMethod === 'sms'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-green-700'
              }`}
            >
              {isLoading && selectedMethod === 'sms' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <img src="/profile/messanger.svg" alt="SMS" className="w-6 h-6" />
              )}
              Send Location via SMS
            </button>

            <button
              onClick={() => handleShareLocation('whatsapp')}
              disabled={isLoading}
              className={`w-full h-14 bg-[#25D366] text-white rounded-lg flex items-center justify-center gap-3 font-medium transition-colors ${
                isLoading && selectedMethod === 'whatsapp'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#128C7E]'
              }`}
            >
              {isLoading && selectedMethod === 'whatsapp' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <img src="/profile/wa.svg" alt="WhatsApp" className="w-6 h-6" />
              )}
              Send Location via WhatsApp
            </button>


            {/* <button
              onClick={() => {
                if (isLocationRequested) {
                  console.log('Location request already in progress, ignoring test...');
                  return;
                }
                
                console.log('Testing geolocation...');
                setIsLocationRequested(true);
                
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    console.log('✅ Geolocation test successful:', position);
                    alert(`✅ GPS is working! Location: ${position.coords.latitude}, ${position.coords.longitude}`);
                    setIsLocationRequested(false);
                  },
                  (error) => {
                    console.error('❌ Geolocation test failed:', error);
                    alert(`❌ GPS test failed: ${error.message} (Code: ${error.code})`);
                    setIsLocationRequested(false);
                  },
                  { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
                );
              }}
              disabled={isLoading || isLocationRequested}
              className="w-full h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              🔍 Test GPS Location
            </button>

            <button
              onClick={() => {
                if (confirm('This will refresh the page to reset location permissions. Continue?')) {
                  window.location.reload();
                }
              }}
              disabled={isLoading}
              className="w-full h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-orange-600 transition-colors text-sm"
            >
              🔄 Refresh Page (Reset Permissions)
            </button> */}

            {/* <button
              onClick={() => setShowManualLocation(true)}
              disabled={isLoading}
              className="w-full h-12 bg-gray-500 text-white rounded-lg flex items-center justify-center gap-3 font-medium hover:bg-gray-600 transition-colors"
            >
              📝 Enter Location Manually
            </button> */}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Location Description
              </label>
              <textarea
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                placeholder="e.g., Near Central Park, 5th Avenue, New York"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleManualLocationShare('sms')}
                disabled={isLoading}
                className={`flex-1 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                  isLoading && selectedMethod === 'sms'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-green-700'
                }`}
              >
                {isLoading && selectedMethod === 'sms' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <img src="/profile/messanger.svg" alt="SMS" className="w-5 h-5" />
                )}
                SMS
              </button>

              <button
                onClick={() => handleManualLocationShare('whatsapp')}
                disabled={isLoading}
                className={`flex-1 h-12 bg-[#25D366] text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                  isLoading && selectedMethod === 'whatsapp'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#128C7E]'
                }`}
              >
                {isLoading && selectedMethod === 'whatsapp' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <img src="/profile/wa.svg" alt="WhatsApp" className="w-5 h-5" />
                )}
                WhatsApp
              </button>
            </div>

            <button
              onClick={() => setShowManualLocation(false)}
              disabled={isLoading}
              className="w-full h-10 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              ← Back to GPS Location
            </button>
          </div>
        )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your location will be sent to the pet owner's registered phone number.
                </p>
              </div>
      </div>
    </div>
  );
};

export default LocationShareModal;
