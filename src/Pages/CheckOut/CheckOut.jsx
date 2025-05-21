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
      const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
      if (!buyNowItem) {
        alert(
          "No item found for purchase. Please go back and select a product."
        );
        return;
      }

      const payload = {
        amount: buyNowItem.subtotal,
        product_id: buyNowItem.id,
        product_name: buyNowItem.name,
        buyer_name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.billingAddress,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/esewa/initiate/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // eSewa v2: Create and submit the payment form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = response.data.esewa_url;

      const fields = {
        amount: response.data.amount,
        tax_amount: response.data.tax_amount,
        total_amount: response.data.total_amount,
        transaction_uuid: response.data.transaction_uuid,
        product_code: response.data.product_code,
        product_service_charge: response.data.product_service_charge,
        product_delivery_charge: response.data.product_delivery_charge,
        success_url: response.data.success_url,
        failure_url: response.data.failure_url,
        signed_field_names: response.data.signed_field_names,
        signature: response.data.signature,
      };

      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
      } else {
        alert("Payment failed. Please try again.");
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
