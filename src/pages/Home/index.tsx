import React from 'react'
import Hero from '../../components/home/hero';
import Message from '../../components/home/message';
import Digital from '../../components/home/digital';
import Pricing from '../../components/home/pricing';
import Services from '../../components/home/services';
import GetMoreInfo from '../../components/home/getMoreOnfo';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Message />
      <Digital />
      <Pricing />
      <Services />
      <GetMoreInfo />
    </div>
  )
}

export default HomePage;
