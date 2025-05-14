import React, { useState } from "react";
import { Card, Input, Button, Space, Typography, Form, Checkbox } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ForgotPassword from "../../Components/Model/forgotpassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: values.email,
        password: values.password,
      });

      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      console.log("User logged in:", user);
      alert("🎉 Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      if (error.response) {
        const errorData = error.response.data;

        if (errorData.non_field_errors) {
          alert("❌ Incorrect email or password. Please try again.");
        } else if (errorData.detail === "Invalid credentials") {
          alert("❌ Invalid email or password.");
        } else if (errorData.email?.includes("not found")) {
          alert("📧 This email is not registered. Please sign up first.");
        } else if (errorData.password?.includes("incorrect")) {
          alert("🔐 Incorrect password. Please try again.");
        } else if (errorData && typeof errorData === "object") {
          const readableErrors = Object.entries(errorData)
            .map(([field, msgs]) => {
              const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
              const messageText = Array.isArray(msgs)
                ? msgs.join(", ")
                : typeof msgs === "string"
                ? msgs
                : "Invalid input";
              return `${fieldName}: ${messageText}`;
            })
            .join("\n");
          alert("⚠️ Please fix the following:\n" + readableErrors);
        } else {
          alert("❌ Login failed. Please check your input.");
        }
      } else if (error.request) {
        alert("🔌 Server not responding. Please try again later.");
      } else {
        alert("⚠️ Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const showModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 600, padding: "20px" }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Login
        </Typography.Title>

        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter Your Email" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter Your Password" />
          </Form.Item>

          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ marginBottom: "0" }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link onClick={showModal}>Forgot Password?</Link>
          </Space>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <Space
          style={{ width: "100%", justifyContent: "center", marginTop: "16px" }}
        >
          <Text>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Text>
        </Space>
      </Card>

      <ForgotPassword visible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default Login;
