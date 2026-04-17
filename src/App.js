import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔔 ADD THIS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// PAGES
import Home from "./Pages/Home";
import Watches from "./Pages/Watches";
import Accessories from "./Pages/Accessories";
import ProductDetails from "./Pages/ProductDetails";
import AccessoryDetails from "./Pages/AccessoryDetails";
import Checkout from "./Pages/Checkout";
import Eyewear from "./Pages/Eyewear";
import EyewearDetails from "./Pages/EyewearDetails";
import FAQ from "./Pages/FAQ";
import Stories from "./Pages/Stories";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import StorySingle from "./Pages/StorySingle";
import StoryDetails from "./Pages/StoryDetails";
import Favorites from "./Pages/Favorites";
import ForgotPassword from "./Pages/ForgotPassword";
import Register from "./Pages/Register";
import MonthlySales from "./Pages/MothlySales";
import SearchPage from "./Pages/SearchPage";
import OrderHistory from "./Pages/OrderHistory";
import AdminOrders from "./Pages/AdminOrders";

// COMPONENTS
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppDownload from "./Components/AppDownload";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/shop/watches" element={<Watches />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/shop/accessories" element={<Accessories />} />
        <Route path="/accessory/:id" element={<AccessoryDetails />} />

        <Route path="/shop/eyewear" element={<Eyewear />} />
        <Route path="/eyewear/:id" element={<EyewearDetails />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/story" element={<StorySingle />} />
        <Route path="/story/:id" element={<StoryDetails />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/app" element={<AppDownload />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<MonthlySales />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/admin-orders" element={<AdminOrders />} />

      </Routes>

      <Footer />

      {/* 🔔 VERY IMPORTANT (NOTIFICATIONS) */}
      <ToastContainer position="top-right" autoClose={2000} />

    </Router>
  );
}

export default App;