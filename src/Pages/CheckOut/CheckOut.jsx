import React, { useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Input, Button, Form, Divider } from "antd";

const CheckOut = () => {
  const [sameAsBilling, setSameAsBilling] = useState(true);

  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
          <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>

          <Form layout="vertical">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Full Name" name="name">
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item label="Email Address" name="email">
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone">
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </div>

            {/* Billing Address */}
            <Divider orientation="left">Shipping Address</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Street Address" name="billingAddress">
                <Input />
              </Form.Item>
              <Form.Item label="City" name="billingCity">
                <Input />
              </Form.Item>
              <Form.Item label="State/Province" name="billingState">
                <Input />
              </Form.Item>
              <Form.Item label="Postal Code" name="billingZip">
                <Input />
              </Form.Item>
            </div>

            {/* Submit */}
            <Form.Item className="mt-6">
              <Button type="primary" size="large" className="w-full">
                Place Order
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
