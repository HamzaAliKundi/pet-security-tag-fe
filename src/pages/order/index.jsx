// import Customers from "../../components/common/customer"
import Faqs from "../../components/common/faqs"
// import GetStarted from "../../components/common/getStarted"
// import Search from "../../components/common/search";
import Order from "../../components/order/order";
import ConditionalPricing from "../../components/common/ConditionalPricing";
import HowItWorksPoster from "../../components/home/HowItWorksPoster";

const OrderPage = () => {
  return (
    <div>
        <Order />
        {/* <Customers /> */}
        {/* <GetStarted /> */}
        {/* <Search /> */}
        <HowItWorksPoster />
        {/* <Faqs /> */}
    </div>
  )
}

export default OrderPage
