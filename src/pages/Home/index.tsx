import React from 'react'
import Hero from './../../components/home/hero';
import GetMoreInfo from '../../components/home/getMoreOnfo';
import Services from '../../components/home/services';
import Digital from '../../components/home/digital';
import HowItWorksPoster from '../../components/home/HowItWorksPoster';
import Pricing from './../../components/home/pricing';
import Message from './../../components/home/message';
import ServicesInfo from '../../components/common/servicesInfo';
import Customers from '../../components/common/customer';
import Reviews from '../../components/home/reviews';
import Order from '../../components/common/order';
import Faqs from '../../components/common/faqs';
import GetStarted from '../../components/common/getStarted';
import Partnership from '../../components/home/partnership';
import Features from '../../components/home/features';
import CustomerReviews from '../../components/home/customerReviews';
import ConditionalPricing from '../../components/common/ConditionalPricing';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Message />
      <ConditionalPricing />
      <Digital />
      {/* <Pricing /> */}
      <Features />
      <Services />
      {/* <GetMoreInfo /> */}
      <ServicesInfo />
      {/* <Customers /> */}
      {/* <Reviews /> */}
      <CustomerReviews />
      <GetStarted />
      <Order />
      {/* Partner Charities */}
      <Partnership />
      {/* <Faqs /> */}
    </div>
  )
}

export default HomePage;
