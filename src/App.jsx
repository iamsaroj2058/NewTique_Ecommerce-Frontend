import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './Components/Pages/Login/login'
import SignUp from './Components/Pages/SignUp/signup'
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Pages/Home/Home"



// import About from "./Pages/About"
// import Contact from "./Pages/Contact"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}


export default App
