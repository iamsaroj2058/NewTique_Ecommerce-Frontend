import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/login"
import SignUp from "./Pages/SignUp/signup";
import Home from "./Pages/Home/Home";
import Product_details from "./Pages/Product Details/product_details";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Addcart from "./Pages/Add to Cart/addcart";
import Profile from "./Pages/Profile/profile";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";



const App = () => {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Home/product-details" element ={<Product_details/>}/>
        <Route path="/Home/product-details/checkout" element ={<CheckOut/>}/>
        <Route path="/Home/add-to-cart" element={<Addcart />} />
        <Route path="/Profile" element ={<Profile/>}/>

      </Routes>
      {/* <Enhance /> */}

    </Router>
  );
};

export default App;
