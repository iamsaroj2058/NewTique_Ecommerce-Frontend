import React, { useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Input, Button, Form, Divider, Breadcrumb, Radio, message } from "antd";
import axios from "axios";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("esewa");

  const onFinish = async (values) => {
    setLoading(true);

    const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
    const token = localStorage.getItem("authToken");

    if (!buyNowItem || !token) {
      alert("Missing product or authentication. Please try again.");
      setLoading(false);
      return;
    }

    const orderPayload = {
      amount: buyNowItem.subtotal,
      product_id: buyNowItem.id,
      product_name: buyNowItem.name,
      buyer_name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.billingAddress,
      payment_method: paymentMethod,
    };

    try {
      if (paymentMethod === "cod") {
        const response = await axios.post(
          "http://localhost:8000/api/cash-on-delivery/",
          orderPayload,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        message.success("Order placed successfully with Cash on Delivery!");
        window.location.href = "/";
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/esewa/initiate/",
          orderPayload,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        const form = document.createElement("form");
        form.method = "POST";
        form.action = response.data.esewa_url;

        const esewaFields = {
          total_amount: response.data.total_amount,
          amount: response.data.amount,
          tax_amount: response.data.tax_amount,
          product_service_charge: response.data.product_service_charge,
          product_delivery_charge: response.data.product_delivery_charge,
          transaction_uuid: response.data.transaction_uuid,
          product_code: response.data.product_code,
          merchant_code: response.data.product_code,
          success_url: response.data.success_url,
          failure_url: response.data.failure_url,
          signed_field_names: response.data.signed_field_names,
          signature: response.data.signature,
        };

        for (const [key, value] of Object.entries(esewaFields)) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Order Error:", error);
      if (error.response?.data) {
        message.error(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        message.error("Something went wrong!");
      }
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

            <Divider orientation="left">Select Payment Method</Divider>
            <div className="mb-6">
              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
              >
                <Radio value="esewa">eSewa</Radio>
                <Radio value="cod">Cash on Delivery</Radio>
              </Radio.Group>
            </div>

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
