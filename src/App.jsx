import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/login"
import SignUp from "./Pages/SignUp/signup";
import Home from "./Pages/Home/Home";
import Product_details from "./Pages/Product Details/product_details";
import CheckOut from "./Pages/CheckOut/CheckOut";



const App = () => {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product-details" element ={<Product_details/>}/>
        <Route path="/checkout" element ={<CheckOut/>}/>
      </Routes>
      {/* <Enhance /> */}

    </Router>
  );
};

export default App;
