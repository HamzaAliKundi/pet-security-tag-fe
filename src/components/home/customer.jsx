import React from 'react'

const Customers = () => {
  const reviews = [
    {
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
      title: 'Great For Dogs',
      description: 'Easy To Set Up Works Well',
      thanx: 'Thanx',
      author: 'Hannah',
      rating: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
      title: 'Purrrfect For Cats',
      description: 'Easy To Set Up Works Well',
      thanx: 'Thanx',
      author: 'Hannah',
      rating: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
      title: 'Rachael H.',
      description: 'Easy To Set Up Works Well',
      thanx: 'Thanx',
      author: 'Hannah',
      rating: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
      title: 'Jeffry W.',
      description: 'Easy To Set Up Works Well',
      thanx: 'Thanx',
      author: 'Hannah',
      rating: 5
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12 md:py-16">
      {/* Title */}
      <h2 className="font-helvetica-neue font-bold text-[28px] sm:text-[32px] md:text-[38.71px] leading-[1.2] md:leading-[53.23px] tracking-[-1.45px] text-center align-middle text-[#0F2137] mb-8 sm:mb-12 md:mb-16">
        Our Customer Love It!
      </h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 justify-items-center">
        {reviews.map((review, index) => (
          <div key={index} className="relative group w-full max-w-[285px] h-[350px] sm:h-[380px] md:h-[420px]">
            {/* Image Container */}
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <img 
                src={review.image} 
                alt={review.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Review Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/55 p-3 sm:p-5 md:p-6 rounded-3xl mx-1 sm:mx-2 mb-1 sm:mb-2">
              <h3 className="font-helvetica-neue font-bold text-[18px] sm:text-[20px] md:text-[24px] leading-[100%] tracking-[-1.45px] text-[#0F2137] capitalize">
                {review.title}
              </h3>
              <p className="font-helvetica-neue font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[100%] tracking-[0px] text-[#343D48] mt-1 capitalize">
                {review.description}
              </p>
              <p className="font-helvetica-neue text-xs sm:text-sm text-gray-500 mt-1">
                {review.thanx}
              </p>
              <div className="mt-2">
                <p className="font-helvetica-neue font-bold text-[14px] sm:text-[15px] md:text-[16px] leading-[100%] tracking-[0px] text-black capitalize">{review.author}</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Customers
