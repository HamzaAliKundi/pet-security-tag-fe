import Customers from "../../components/common/customer"
import Faqs from "../../components/common/faqs"
import GetStarted from "../../components/common/getStarted"
import Search from "../../components/common/search";
import Order from "../../components/order/order";

const OrderPage = () => {
  return (
    <div>
        <Order />
        <Customers />
        <GetStarted />
        <Search />
        <Faqs />
    </div>
  )
}

export default OrderPage
