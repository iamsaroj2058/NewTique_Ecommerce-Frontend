import React from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";

const AboutUs = () => {
  return (
    <div>
      <Topheader />
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to our store! We’re a passionate team dedicated to bringing you the best quality
          clothing and lifestyle products that blend comfort, style, and affordability.
        </p>

        <p className="text-gray-700 mt-4 text-lg leading-relaxed">
          Our journey started with a mission to make everyday fashion accessible to everyone. We work
          closely with local manufacturers and designers to bring you unique styles and designs that
          resonate with today’s youth.
        </p>

        <p className="text-gray-700 mt-4 text-lg leading-relaxed">
          Thank you for choosing us. We’re committed to offering excellent service, fast delivery, and
          easy returns—because your satisfaction is our priority.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
