import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/reviews?limit=6`);
      const data = await response.json();
      if (data.status === 200) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            fill={star <= rating ? '#FFD700' : 'none'}
            stroke={star <= rating ? '#FFD700' : '#D1D5DB'}
            strokeWidth={2}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CB2E2] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show section if no reviews
  }

  return (
    <div className="w-full bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-helvetica-neue font-bold text-[32px] sm:text-[38px] md:text-[44px] leading-[1.2] tracking-[-1.45px] text-[#0F2137] mb-4">
            What Our Customers Say
          </h2>
          <p className="font-helvetica-neue text-[16px] sm:text-[18px] text-[#343D48] max-w-2xl mx-auto">
            Real experiences from pet owners who trust Digital Tails
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Rating */}
              <div className="mb-4">
                {renderStars(review.rating)}
              </div>

              {/* Title */}
              <h3 className="font-helvetica-neue font-bold text-[18px] sm:text-[20px] leading-[1.3] text-[#0F2137] mb-3">
                {review.title}
              </h3>

              {/* Description */}
              <p className="font-helvetica-neue font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#343D48] mb-4 line-clamp-4">
                {review.description}
              </p>

              {/* Reviewer Name & Date */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="font-helvetica-neue font-semibold text-[14px] text-[#0F2137]">
                    {review.name}
                  </p>
                  <p className="font-helvetica-neue text-[12px] text-gray-500">
                    Verified Customer
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {reviews.length >= 6 && (
          <div className="text-center mt-12">
            <p className="font-helvetica-neue text-[16px] text-[#343D48]">
              Join thousands of happy pet owners who trust Digital Tails
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;

