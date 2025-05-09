import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/login";
import SignUp from "./Pages/SignUp/signup";
import Home from "./Pages/Home/Home";
import Product_details from "./Pages/Product Details/product_details";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Addcart from "./Pages/Add to Cart/addcart";
import Profile from "./Pages/Profile/profile";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Product Routes */}
        <Route path="/product-details/:id" element={<Product_details />} />

        {/* Cart & Checkout */}
        <Route path="/add-to-cart" element={<Addcart />} />
        <Route path="/checkout" element={<CheckOut />} />

        {/* Profile Route */}
        <Route path="/profile" element={<Profile />} />

        {/* Category Page Route */}
        <Route path="/category/:id" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
