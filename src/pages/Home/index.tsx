import React from 'react'
import Hero from './../../components/home/hero';
import GetMoreInfo from '../../components/home/getMoreOnfo';
import Services from '../../components/home/services';
import Digital from '../../components/home/digital';
import Pricing from './../../components/home/pricing';
import Message from './../../components/home/message';
import ServicesInfo from '../../components/home/servicesInfo';
import Customers from '../../components/home/customer';
import GetStarted from '../../components/home/getStarted';
import Order from '../../components/home/order';

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
      <Customers />
      <GetStarted />
      <Order />
    </div>
  )
}

export default HomePage;
