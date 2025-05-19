import React, { useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Input, Button, Form, Divider, Breadcrumb } from "antd";
import axios from "axios";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const amount = 1000; // Set this dynamically if needed

      // Call Django API to initiate payment
      const response = await axios.post(
        "http://localhost:8000/api/esewa/initiate/",
        {
          amount: amount,
        }
      );

      const form = document.createElement("form");
      form.method = "POST";
      form.action = response.data.esewa_url;

      const keys = [
        "amt",
        "pdc",
        "psc",
        "txAmt",
        "tAmt",
        "pid",
        "scd",
        "su",
        "fu",
      ];

      keys.forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = response.data[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Breadcrumb
          items={[
            { title: "Home" },
            { title: "Product Details" },
            { title: "Checkout" },
          ]}
        />
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
          <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>

          <Form layout="vertical" onFinish={onFinish}>
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Full Name is required" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Phone is required" }]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </div>

            {/* Billing Address */}
            <Divider orientation="left">Shipping Address</Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Street Address"
                name="billingAddress"
                rules={[
                  { required: true, message: "Street address is required" },
                ]}
              >
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
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="w-full"
              >
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
