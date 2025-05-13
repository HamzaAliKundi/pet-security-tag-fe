import React from 'react'
import { Link } from 'react-router-dom'

const MoreBlogs = () => {
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
        }
      ]
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">

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
                        <Link to={`/blog-detail/${post.id}`} className="text-black cursor-pointer ml-1" onClick={() => window.scrollTo(0, 0)}> <u> Read more </u> </Link>
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

export default MoreBlogs
