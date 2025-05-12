import React from 'react'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
      title: 'Keeping Your Cat Happy',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783',
      title: 'The Importance Of The Human-Animal Bond',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e',
      title: 'Veterinary Services On The Street',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
      title: 'Home To Home And Hurricane Ian',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987',
      title: 'Training Your Puppy: First Steps',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7',
      title: 'Cat Nutrition: What You Need to Know',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
      title: 'Dog Breeds for Small Apartments',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803',
      title: 'Caring for Senior Cats',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b',
      title: 'Pet-Friendly Travel Destinations',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5',
      title: 'Understanding Your Cat\'s Body Language',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48',
      title: 'How to Introduce a New Pet to Your Home',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    },
    {
      id: 12,
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce',
      title: 'Pet Safety During Natural Disasters',
      description: 'Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="font-helvetica-neue font-medium text-3xl sm:text-4xl md:text-[48px] leading-[100%] text-[#313131] capitalize text-center mb-4 sm:mb-6">
          Blog
        </h1>
        <p className="w-full max-w-[700px] font-helvetica-neue font-normal text-sm sm:text-base leading-[130%] sm:leading-[100%] tracking-[4%] text-[#313131] capitalize text-center">
          Lorem ipsum dolor sit amet consectetur. Habitasse egestas scelerisque rutrum quis amet mi. Facilisis gravida scelerisque nisi adipiscing vitae adipiscing proin morbi ut. Cursus in dapibus vitae nullam a dolor ut sapien.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
        {blogPosts.map((post) => (
          <div key={post.id} className="w-full max-w-[285px] flex flex-col gap-3 sm:gap-4 mb-6 h-full">
            {/* Blog Image */}
            <div className="w-full h-[200px] sm:h-[240px] md:h-[285px] overflow-hidden rounded-[16px]">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
                onError={(e) => e.target.src = '/resuable/logo.svg' ? e.target.src = '/resuable/logo.svg' : null}
              />
            </div>
            
            {/* Blog Content */}
            <div className="flex flex-col gap-2 h-[120px]">
              <h3 className="font-helvetica-neue font-medium text-xl sm:text-2xl md:text-[24px] leading-[100%] tracking-[4%] capitalize text-black line-clamp-2  md:h-[70px] lg:h-[80px]">
                {post.title ? post.title.length > 40 ? `${post.title.substring(0, 40)}...` : post.title : 'Blog Title'}
              </h3>
              <p className="font-helvetica-neue font-normal text-base leading-[111%] tracking-[4%] capitalize text-[#313131] line-clamp-3 h-[70px]">
                {post.description ? (
                  <>
                    {post.description.length > 80 ? (
                      <>
                        {post.description.substring(0, 80)} 
                        <span className="text-black cursor-pointer ml-1"> <u> Read more </u> </span>
                      </>
                    ) : post.description}
                  </>
                ) : 'No description available'}
              </p>
            </div>  
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
