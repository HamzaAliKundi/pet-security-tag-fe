import Order from "../../components/common/order";
import Banner from "../../components/faqs/banner";
import Delivery from "../../components/faqs/Delivery";
import Faqs from "../../components/faqs/faqs";
import Replacements from "../../components/faqs/Replacements";
import Subscription from './../../components/faqs/Subscription';

const FaqsPage = () => {
  return (
    <>
      <Banner />
      <Faqs />
      <Delivery />
      <Replacements />
      <Subscription />
      <Order />
    </>
  );
};

export default FaqsPage;
