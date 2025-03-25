import React from "react";
import { Card, Input, Button, Space, Typography, Form, Checkbox } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

const Login = () => {
  const handleSubmit = (values) => {
    console.log("Login form values:", values);
  };

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

        <Form
          onFinish={handleSubmit} // Handle form submission
          layout="vertical"
        >
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input placeholder="Enter Your Email" prefix={<UserOutlined />} />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password placeholder="Enter Your Password" />
          </Form.Item>

          {/* Remember Me Checkbox */}
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form>

        <Space
          style={{
            width: "100%",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "16px",
          }}
          direction="vertical"
        >
          {/* Forgot Password Link */}
          <Link href="#" style={{ marginBottom: "10px" }}>
            Forgot Password?
          </Link>

          {/* Sign Up Link */}
          <Text>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
