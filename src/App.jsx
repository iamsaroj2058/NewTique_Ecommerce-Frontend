import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/login"
import SignUp from "./Pages/SignUp/signup";

import Home from "./Pages/Home/Home";
import Addcart from "./Pages/Add to Card/addcart";



const App = () => {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addcart" element ={<Addcart/>}/>
      </Routes>
      {/* <Enhance /> */}

    </Router>
  );
};

export default App;
