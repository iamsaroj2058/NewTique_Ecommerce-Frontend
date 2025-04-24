import React from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

const ContactUs = () => {
  return (
    <div>
      <Topheader />
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-6">
          We're here to help! Whether you have a question about your order, our products, or just want to give feedback,
          feel free to reach out.
        </p>

        <div className="space-y-6 text-gray-700 text-lg">
          <div className="flex items-start gap-4">
            <PhoneOutlined className="text-xl text-blue-500 mt-1" />
            <span>+977 9800000000</span>
          </div>

          <div className="flex items-start gap-4">
            <MailOutlined className="text-xl text-green-500 mt-1" />
            <span>support@ourshop.com</span>
          </div>

          <div className="flex items-start gap-4">
            <EnvironmentOutlined className="text-xl text-red-500 mt-1" />
            <span>Thamel, Kathmandu, Nepal</span>
          </div>
        </div>

        {/* (Optional) Contact Form can go here */}
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
