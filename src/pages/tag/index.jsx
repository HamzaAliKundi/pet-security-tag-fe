import React from 'react'
import Banner from '../../components/tag/banner'
import Customers from './../../components/common/customer';
import ServicesInfo from '../../components/common/servicesInfo';
import Gps from '../../components/tag/gps';
import GetStarted from '../../components/common/getStarted';
import Search from '../../components/common/search';
import Faqs from '../../components/common/faqs';
import SmartTag from '../../components/tag/smatTag';
const PetTagPage = () => {
  return (
    <div>
      <Banner />
      <ServicesInfo />
      <Gps />
      <Customers />
      <GetStarted />
      <Search />
      <Faqs />
      <SmartTag />
    </div>
  )
}

export default PetTagPage
