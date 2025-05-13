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
import ProfilePage from "./pages/profile";
import BlogDetail from "./pages/blog-detail";

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
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {showFooter && <Footer />}
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
