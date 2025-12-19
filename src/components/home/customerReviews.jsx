import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Open modal with full review
  const handleViewFull = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
    setIsPaused(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    setTimeout(() => {
      setIsPaused(false);
    }, 300);
  };

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

  // Auto-scroll functionality
  useEffect(() => {
    if (isDragging || isPaused || reviews.length === 0 || !scrollContainerRef.current) return;

    // Calculate card width dynamically (use md breakpoint width as base)
    const getCardWidth = () => {
      const width = window.innerWidth;
      if (width >= 768) return 400; // md:w-[400px]
      if (width >= 640) return 380; // sm:w-[380px]
      return 350; // w-[350px]
    };

    const cardWidth = getCardWidth();
    const gap = 24; // gap-6 = 24px
    const cardTotalWidth = cardWidth + gap;
    const oneSetWidth = cardTotalWidth * reviews.length;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      if (scrollContainerRef.current && !isDragging && !isPaused) {
        const currentScroll = scrollContainerRef.current.scrollLeft;
        let newScroll = currentScroll + scrollSpeed;

        // Reset to beginning when we've scrolled through one set for seamless loop
        if (newScroll >= oneSetWidth) {
          newScroll = 0;
        }

        scrollContainerRef.current.scrollLeft = newScroll;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, isPaused, reviews.length]);

  // Handle mouse drag (for desktop)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      setIsPaused(false);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTimeout(() => {
      setIsPaused(false);
    }, 300);
  };

  // Handle touch drag (for mobile)
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      setIsPaused(false);
    }, 300);
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

        {/* Reviews Scrollable Container */}
        <div className="mt-8 overflow-hidden relative">
          <style>{`
            .reviews-scroll-container {
              cursor: grab;
              user-select: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              scroll-behavior: auto;
              -webkit-overflow-scrolling: touch;
            }
            .reviews-scroll-container.dragging {
              cursor: grabbing;
              scroll-behavior: auto;
            }
            .reviews-scroll-container:hover {
              cursor: grab;
            }
            .reviews-scroll-container::-webkit-scrollbar {
              display: none;
            }
            .reviews-scroll-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          
          <div
            ref={scrollContainerRef}
            className={`reviews-scroll-container flex gap-6 overflow-x-auto pb-4 ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-x' }}
          >
            {/* Duplicate reviews for seamless loop */}
            {[...reviews, ...reviews].map((review, idx) => (
              <div
                key={`${review._id}-${idx}`}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[350px] sm:w-[380px] md:w-[400px] flex flex-col"
              >
                {/* Rating */}
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Title - max 15 characters */}
                <h3 className="font-helvetica-neue font-bold text-[18px] sm:text-[20px] leading-[1.3] text-[#0F2137] mb-3">
                  {truncateText(review.title, 15)}
                </h3>

                {/* Description - fixed height, max 50 characters */}
                <div className="mb-4 flex-grow flex flex-col">
                  <p className="font-helvetica-neue font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#343D48] min-h-[72px]">
                    {truncateText(review.description, 50)}
                  </p>
                  {(review.description && review.description.length > 50) && (
                    <button
                      onClick={() => handleViewFull(review)}
                      className="mt-2 text-[#4CB2E2] font-helvetica-neue font-medium text-[14px] hover:underline self-start"
                    >
                      View Full
                    </button>
                  )}
                </div>

                {/* Reviewer Name & Date - Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
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

      {/* Full Review Modal */}
      {isModalOpen && selectedReview && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="float-right text-gray-400 hover:text-gray-600 text-2xl font-bold mb-4"
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="clear-both">
              {/* Rating */}
              <div className="mb-4">
                {renderStars(selectedReview.rating)}
              </div>

              {/* Title */}
              <h3 className="font-helvetica-neue font-bold text-[24px] md:text-[28px] leading-[1.3] text-[#0F2137] mb-4">
                {selectedReview.title}
              </h3>

              {/* Description */}
              <p className="font-helvetica-neue font-normal text-[16px] md:text-[18px] leading-[28px] text-[#343D48] mb-6">
                {selectedReview.description}
              </p>

              {/* Reviewer Name & Date */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="font-helvetica-neue font-semibold text-[16px] text-[#0F2137]">
                    {selectedReview.name}
                  </p>
                  <p className="font-helvetica-neue text-[14px] text-gray-500">
                    Verified Customer
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(selectedReview.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;

