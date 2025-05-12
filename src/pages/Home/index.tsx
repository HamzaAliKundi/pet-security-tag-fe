import React from 'react'
import Hero from './../../components/home/hero';
import GetMoreInfo from '../../components/home/getMoreOnfo';
import Services from '../../components/home/services';
import Digital from '../../components/home/digital';
import Pricing from './../../components/home/pricing';
import Message from './../../components/home/message';
import ServicesInfo from '../../components/common/servicesInfo';
import Customers from '../../components/common/customer';
import Order from '../../components/common/order';
import Faqs from '../../components/common/faqs';
import GetStarted from '../../components/common/getStarted';

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
      <Faqs />
    </div>
  )
}

export default HomePage;
