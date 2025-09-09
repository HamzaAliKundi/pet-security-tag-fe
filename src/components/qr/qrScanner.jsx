import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScanQRCodeQuery } from '../../apis/petProfile';

const QRScanner = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useScanQRCodeQuery(code, { 
    skip: !code 
  });

  useEffect(() => {
    if (data) {
      // Handle different QR scan results
      if (data.action === 'redirect_to_profile' && data.petId) {
        // QR is verified and has active subscription - show pet profile
        navigate(`/profile/${data.petId}`);
      } else if (data.action === 'redirect_to_verification') {
        // QR needs verification - redirect to user dashboard
        window.location.href = `${import.meta.env.VITE_DASHBOARD_URL}/qr/verify/${code}`;
      }
    }
  }, [data, navigate, code]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Scanning QR Code...</h2>
          <p className="text-gray-600">Please wait while we process your request</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid QR Code</h1>
            <p className="text-gray-600 mb-4">
              This QR code is not valid or has expired. Please check the code and try again.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback UI while waiting for redirect
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="text-4xl mb-4">🐾</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing QR Code...</h2>
          <p className="text-gray-600">Redirecting you to the appropriate page</p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;

