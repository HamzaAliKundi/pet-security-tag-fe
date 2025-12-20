import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import HomePage from './pages/Home/index';
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Footer from "./components/footer";
import ContactUsPage from "./pages/contact";
import FaqsPage from "./pages/faqs";
import PetTagPage from "./pages/tag";
import BlogPage from "./pages/blog";
import OrderPage from "./pages/order";
import OrderSummaryPage from "./pages/orderSummary";
import ProfilePage from "./pages/profile";
import BlogDetail from "./pages/blog-detail";
import GetInfo from "./components/get-info/get-info";
import QRScanner from "./components/qr/qrScanner";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import CookiePolicy from "./components/CookiePolicy";
import RefundCancellationPolicy from "./components/RefundCancellationPolicy";
import ShippingPolicy from "./components/ShippingPolicy";
import AboutUs from "./components/AboutUs";
import PricingPage from "./pages/pricing";
import SMSConsentStatement from "./components/SMSConsentStatement";
import InvestPage from "./pages/invest";
import PartnerCharitiesPage from "./pages/PartnerCharities";
import LatestOrdersNotification from "./components/common/latestOrdersNotification";

const AppRoutes = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);
  const showFooter = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/pet-tag" element={<PetTagPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-detail/:id" element={<BlogDetail />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-summary" element={<OrderSummaryPage />} />
        <Route path="/qr/:code" element={<QRScanner />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/get-info" element={<GetInfo />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/sms-consent-statement" element={<SMSConsentStatement />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/partner-charities" element={<PartnerCharitiesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {showFooter && <Footer />}
      {/* Latest Orders Notification Widget - Show on all pages except login/signup */}
      {showNavbar && <LatestOrdersNotification />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
