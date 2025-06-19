import React, { useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Input, Button, Form, Divider, Breadcrumb, Radio, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    // Check for buy now item first
    const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
    const cartItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

    let products = [];

    if (buyNowItem) {
      products = [
        {
          id: buyNowItem.id,
          quantity: buyNowItem.quantity,
        },
      ];
    } else {
      products = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
    }

    if (products.length === 0) {
      message.error("No items to checkout");
      setLoading(false);
      return;
    }

    const orderData = {
      address: values.address,
      city: values.billingCity,
      state: values.billingState,
      zip_code: values.billingZip,
      payment_method: paymentMethod,
      buyer_name: values.name,
      email: values.email,
      phone: values.phone,
      products: products,
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.error("Authentication required");
        return;
      }

      if (paymentMethod === "cod") {
        const response = await axios.post(
          "http://localhost:8000/api/cash-on-delivery/",
          orderData,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        message.success("Order placed successfully!");
        localStorage.removeItem("buyNowItem");
        localStorage.removeItem("checkoutItems");
        navigate("/");
      } else {
        // ESewa payment flow
        const totalAmount = buyNowItem
          ? buyNowItem.subtotal
          : cartItems.reduce((sum, item) => sum + item.subtotal, 0);

        const esewaResponse = await axios.post(
          "http://localhost:8000/api/esewa/initiate/",
          { amount: totalAmount },
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        const esewaFields = {
          total_amount: esewaResponse.data.total_amount,
          amount: esewaResponse.data.amount,
          tax_amount: esewaResponse.data.tax_amount,
          product_service_charge: esewaResponse.data.product_service_charge,
          product_delivery_charge: esewaResponse.data.product_delivery_charge,
          transaction_uuid: esewaResponse.data.transaction_uuid,
          product_code: esewaResponse.data.product_code,
          merchant_code: esewaResponse.data.product_code,
          success_url: esewaResponse.data.success_url,
          failure_url: esewaResponse.data.failure_url,
          signed_field_names: esewaResponse.data.signed_field_names,
          signature: esewaResponse.data.signature,
        };

        const form = document.createElement("form");
        form.method = "POST";
        form.action = esewaResponse.data.esewa_url;

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
      message.error(error.response?.data?.error || "Failed to place order");
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
                name="address"
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
