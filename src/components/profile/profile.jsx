import React, { useState } from 'react';
import { useGetPetProfileQuery } from '../../apis/petProfile';
import LocationShareModal from './LocationShareModal';

const Profile = ({ id }) => {
  const { data: petData, isLoading, error } = useGetPetProfileQuery(id, { 
    skip: !id 
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleShareLocation = () => {
    setIsLocationModalOpen(true);
  };

  const handleCallOwner = () => {
    alert('This would initiate a call to the pet owner. Feature coming soon!');
  };

  // Helper function to get geolocation with iOS Safari fixes
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      const options = {
        enableHighAccuracy: false,
        timeout: isIOS && isSafari ? 15000 : 10000,
        maximumAge: isIOS && isSafari ? 60000 : 300000
      };

      console.log('🌍 Requesting location...', { isIOS, isSafari });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('✅ Location obtained:', position.coords);
          resolve(position);
        },
        (error) => {
          console.error('❌ Geolocation error:', error);
          reject(error);
        },
        options
      );
    });
  };

  const handleWhatsApp = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      console.log('💬 Starting WhatsApp flow...');
      
      // CRITICAL: Open a blank window immediately to preserve user gesture
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      let whatsappWindow = null;
      
      if (!isIOS) {
        // For non-iOS, open window immediately
        whatsappWindow = window.open('', '_blank');
        if (whatsappWindow) {
          whatsappWindow.document.write('<html><body><h2>Loading WhatsApp...</h2><p>Please wait...</p></body></html>');
        }
      }
      
      // Get location
      let position;
      try {
        position = await getLocation();
      } catch (error) {
        console.error('❌ Geolocation error:', error);
        if (whatsappWindow) whatsappWindow.close();
        
        if (error.code === 1) {
          alert('❌ Location permission denied. Please enable location access in Settings > Safari > Location Services.');
        } else if (error.code === 2) {
          alert('❌ Location unavailable. Please check your device settings and ensure Location Services are enabled.');
        } else if (error.code === 3) {
          alert('❌ Location request timeout. Please try again or check your internet connection.');
        } else {
          alert(`❌ Could not get location: ${error.message || 'Please enable location services and try again.'}`);
        }
        setIsProcessing(false);
        return;
      }

      const { latitude, longitude } = position.coords;
      const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

      console.log('📍 Getting owner phone number...');

      // Get owner's phone number from backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/qr/share-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId: id,
          method: 'get-phone',
          latitude,
          longitude,
          locationUrl,
          petName: petData?.pet?.petName
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.phoneNumber) {
        const cleanPhone = result.phoneNumber.replace(/[^0-9+]/g, '');
        const whatsappMessage = `Pet found alert 🚨\n\nGood news! Your pet has been located, and their tag was scanned at the location shown. Expect a call or message from the person who found them soon. 🐾\n\n📍 *GPS Location:* ${locationUrl}`;
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
        
        console.log('💬 Opening WhatsApp...');
        
        if (isIOS) {
          // For iOS, use direct navigation
          window.location.href = whatsappUrl;
        } else {
          // For non-iOS, update the window we opened earlier
          if (whatsappWindow && !whatsappWindow.closed) {
            whatsappWindow.location.href = whatsappUrl;
          } else {
            // Fallback if window was blocked
            window.open(whatsappUrl, '_blank');
          }
        }
      } else {
        if (whatsappWindow) whatsappWindow.close();
        alert(`❌ Failed to get owner's phone number: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error in WhatsApp share:', error);
      alert(`❌ Failed to share location: ${error.message || 'Please try again'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShareLocationMessage = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      console.log('📱 Starting SMS flow...');
      
      // Get location first
      let position;
      try {
        position = await getLocation();
      } catch (error) {
        console.error('❌ Geolocation error:', error);
        
        if (error.code === 1) {
          alert('❌ Location permission denied. Please enable location access in Settings > Safari > Location Services.');
        } else if (error.code === 2) {
          alert('❌ Location unavailable. Please check your device settings and ensure Location Services are enabled.');
        } else if (error.code === 3) {
          alert('❌ Location request timeout. Please try again or check your internet connection.');
        } else {
          alert(`❌ Could not get location: ${error.message || 'Please enable location services and try again.'}`);
        }
        setIsProcessing(false);
        return;
      }

      const { latitude, longitude } = position.coords;
      const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

      console.log('📤 Sending SMS through backend...');

      // Send SMS through backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/qr/share-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId: id,
          method: 'sms',
          latitude,
          longitude,
          locationUrl,
          petName: petData?.pet?.petName
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Location shared successfully via SMS!');
      } else {
        alert(`❌ Failed to share location: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error in SMS share:', error);
      alert(`❌ Failed to share location: ${error.message || 'Please try again'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[673px] mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pet profile...</p>
        </div>
      </div>
    );
  }

  if (error || !petData) {
    return (
      <div className="max-w-[673px] mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pet Not Found</h1>
          <p className="text-gray-600">
            This pet profile is not accessible or the subscription may have expired.
          </p>
        </div>
      </div>
    );
  }

  const pet = petData.pet;

  return (
    <div className="max-w-[673px] mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="font-helvetica-neue font-medium text-[24px] sm:text-[32px] md:text-[48px] leading-[100%] text-black text-center capitalize mb-8">
        Pet Profile Overview
      </h1>

      {/* Pet Image */}
      <div className="flex justify-center mb-8">
        <div className="w-[130px] h-[130px] rounded-full overflow-hidden">
          {pet.image ? (
            <img 
              src={pet.image} 
              alt={pet.petName} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/profile/profile.svg";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <img 
                src="/profile/profile.svg" 
                alt="Pet placeholder" 
                className="w-16 h-16 opacity-50"
              />
            </div>
          )}
        </div>
      </div>

      {/* Top Action Buttons */}
      <div className="flex justify-between gap-4 mb-4">
        <div className="w-[328.5px] h-[34px] bg-[#DBEEFF] rounded-[8px] px-4 py-2 flex items-center justify-center">
          <span className="font-afacad font-medium text-[12px] leading-[18px] text-[#0897FF] text-center">
            {pet.breed || 'Mixed Breed'}
          </span>
        </div>
        <div className="w-[328.5px] h-[34px] bg-[#DBEEFF] rounded-[8px] px-4 py-2 flex items-center justify-center">
          <span className="font-afacad font-medium text-[12px] leading-[18px] text-[#0897FF] text-center">
            {pet.age ? `${pet.age} years old` : 'Age unknown'}
          </span>
        </div>
      </div>

      {/* Share Location Buttons */}
      <div className="space-y-4 mb-4">
        <button 
          onClick={handleShareLocation}
          className="w-full h-[57px] bg-[#4CB2E2] rounded-[12px] text-white font-medium flex items-center justify-center gap-2"
        >
          <img src="/profile/location.svg" alt="Location icon" />
          Share Location
        </button>
        <button 
          onClick={handleCallOwner}
          className="w-full h-[57px] rounded-[12px] text-black font-medium flex items-center justify-center gap-2"
          style={{
            background: 'radial-gradient(58.93% 58.93% at 50% 77.68%, #FFD700 0%, #B89D0B 100%)'
          }}
        >
          <img src="/profile/call.svg" alt="Call icon" />
          Call Owner
        </button>
      </div>

      {/* Help Text */}
      <p className="font-afacad text-[15px] leading-[22.5px] text-[#4E4E4E] text-center mb-8">
        If you've found me, share location with my owner using the button above, or contact them using the details.
      </p>

      {/* Address Section */}
      <div className="w-full border border-gray-200 rounded-[8px] p-4 mb-8">
        <h2 className="font-afacad font-semibold text-[18px] leading-[25.2px] mb-4">
          Owner Information
        </h2>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-afacad font-semibold text-[18px] leading-[25.2px] mb-2">
            {pet.owner?.name || 'Pet Owner'}
          </h3>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">
            {pet.owner?.address?.street}
          </p>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">
            {pet.owner?.address?.city}
          </p>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">
            {pet.owner?.address?.state}
          </p>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">
            {pet.owner?.address?.zipCode}
          </p>
          <p className="font-afacad font-normal text-[16px] leading-[25.6px] text-[#666666]">
            {pet.owner?.address?.country}
          </p>
        </div>

        <hr className='mt-4' />
        <p className="text-sm text-gray-500 mt-4 italic ">
          The full address is hidden for privacy. Please contact the owner if you require it to return {pet.petName}.
        </p>
      </div>

      {/* Pet Information Section */}
      <div className="w-full border border-gray-200 rounded-[8px] p-4 mb-8">
        <h2 className="font-afacad font-semibold text-[18px] leading-[25.2px] mb-4">
          Pet Information
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-afacad font-semibold text-[16px]">Pet Name</h3>
            <p className="text-gray-700">{pet.petName}</p>
          </div>
          <div>
            <h3 className="font-afacad font-semibold text-[16px]">Notes</h3>
            <p className="text-gray-700">{pet.notes || 'None'}</p>
          </div>
          <div>
            <h3 className="font-afacad font-semibold text-[16px]">Allergies</h3>
            <p className="text-gray-700">{pet.allergies || 'None'}</p>
          </div>
          <div>
            <h3 className="font-afacad font-semibold text-[16px]">Medication</h3>
            <p className="text-gray-700">{pet.medication || 'None'}</p>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <button 
          onClick={handleWhatsApp}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 w-full md:w-[386px] h-[60px] md:h-[74px] bg-[#4CB2E2] text-white rounded-[100px] px-4 md:px-8 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src="/profile/wa.svg" alt="WhatsApp" className="w-5 h-5 md:w-6 md:h-6" />
          {isProcessing ? 'Processing...' : 'Whatsapp Conversation'}
        </button>
        <button 
          onClick={handleShareLocationMessage}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 w-full md:w-[386px] h-[60px] md:h-[74px] rounded-[100px] px-4 md:px-8 text-black text-sm md:text-base mt-3 md:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'radial-gradient(58.93% 58.93% at 50% 77.68%, #FFD700 0%, #B89D0B 100%)'
          }}
        >
          <img src="/profile/messanger.svg" alt="Location" className="w-5 h-5 md:w-6 md:h-6" />
          {isProcessing ? 'Processing...' : 'Share Location On Message'}
        </button>
      </div>

      {/* Location Share Modal */}
      <LocationShareModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        petId={id}
        petName={pet?.petName || 'Pet'}
      />
    </div>
  )
}

export default Profile