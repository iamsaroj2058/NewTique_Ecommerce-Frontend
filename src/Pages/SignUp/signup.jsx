import React from "react";
import {
  Card,
  Input,
  Button,
  Space,
  Select,
  Typography,
  Form,
  Checkbox,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // Define options for the Select component (Country Code)
  const options = [{ value: "+977", label: "+977" }];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        email: values.email,
        password: values.password,
        full_name: values.fullName,
        phone: values.phone,
        country_code: values.country_code,
      });

      console.log("User registered:", response.data);
      alert("🎉 Registered successfully!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;

        if (
          JSON.stringify(errorData).includes("phone") &&
          JSON.stringify(errorData).includes("already exists")
        ) {
          alert("📱 This mobile number is already in use. Try another number.");
        } else if (
          JSON.stringify(errorData).includes("email") &&
          JSON.stringify(errorData).includes("already exists")
        ) {
          alert("📧 This email is already registered. Try logging in.");
        } else if (errorData && typeof errorData === "object") {
          const readableErrors = Object.entries(errorData)
            .map(
              ([field, msgs]) =>
                `${field.charAt(0).toUpperCase() + field.slice(1)}: ${msgs.join(
                  ", "
                )}`
            )
            .join("\n");

          alert("Please correct the following:\n" + readableErrors);
        } else {
          alert("❌ Registration failed. Please check your input.");
        }
      } else if (error.request) {
        alert("🔌 No response from server. Please try again later.");
      } else {
        alert("⚠️ An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
          Sign Up
        </Typography.Title>

        <Form
          onFinish={handleSubmit} // Handle form submission
          layout="vertical"
        >
          {/* Full Name Field */}
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
          >
            <Input
              placeholder="Enter Your Full Name"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                pattern: /^[a-zA-Z][\w.-]*@[a-zA-Z\d.-]+\.(com)$/,
                message: "Email must start with a letter and end with '.com'",
              },
            ]}
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>

          {/* Phone Number Field */}
          <Form.Item label="Phone Number" required>
            <Space.Compact style={{ width: "100%" }}>
              <Form.Item name="country_code" noStyle initialValue="+977">
                <Select style={{ width: "30%" }} options={options} />
              </Form.Item>
              <Form.Item
                name="phone"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit number",
                  },
                ]}
              >
                <Input
                  style={{ width: "70%" }}
                  placeholder="Enter your phone number"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
              },
            ]}
          >
            <Input.Password
              placeholder="New password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Terms and Conditions Checkbox */}
          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("You must agree to the terms"),
              },
            ]}
          >
            <Checkbox>
              I agree to the <Link>Terms and Conditions</Link>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={loading}
          >
            Sign Up
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
          <Text>
            Already have an account? <Link href="/login">Login</Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default SignUp;
