import React from 'react'
import Hero from '../../components/home/hero';
import Message from '../../components/home/message';
import Digital from '../../components/home/digital';
import Pricing from '../../components/home/pricing';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Message />
      <Digital />
      <Pricing />
    </div>
  )
}

export default HomePage;
