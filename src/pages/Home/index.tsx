import React from 'react'
import Hero from './../../components/home/hero';
import GetMoreInfo from '../../components/home/getMoreOnfo';
import Services from '../../components/home/services';
import Digital from '../../components/home/digital';
import Pricing from './../../components/home/pricing';
import Message from './../../components/home/message';
import ServicesInfo from '../../components/home/servicesInfo';
const HomePage = () => {
  return (
    <div>
      <Hero />
      <Message />
      <Digital />
      <Pricing />
      <Services />
      <GetMoreInfo />
      <ServicesInfo />
    </div>
  )
}

export default HomePage;
