import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/login"
import SignUp from "./Pages/SignUp/signup";
import Header from "./Section/Navbar/Header";
import Topheader from "./Section/Navbar/Topheader";
import Home from "./Pages/Home/Home";
// import Enhance from './Section/Enhance Experience/Enhance'

// import About from "./Pages/About"
// import Contact from "./Pages/Contact"

const App = () => {

  return (
    <Router>
      <Topheader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* <Enhance /> */}

    </Router>
  );
};

export default App;
