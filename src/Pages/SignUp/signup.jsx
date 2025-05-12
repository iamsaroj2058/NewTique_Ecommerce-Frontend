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

const { Text, Link } = Typography;

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  // Define options for the Select component (Country Code)
  const options = [{ value: "+977", label: "+977" }];
  // const handleSubmit = (values) => {
  //   console.log("Form values:", values);
  // };
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        email: values.email,
        password: values.password,
        full_name: values.fullName,
        phone: values.phone,
        country_code: values.country_code
      });

      console.log("User registered:", response.data);
      alert("Registered successfully!");
    } catch (error) {
      if (error.response) {
        // Server responded with a non-2xx status
        console.error("Registration error:", error.response.data);
        alert("Registration failed: " + JSON.stringify(error.response.data));
      } else if (error.request) {
        // No response received
        console.error("No response from server:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        // Something else caused the error
        console.error("Error setting up the request:", error.message);
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // End loading when done
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

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
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
            Already have an account? <Link href="/Login">Login</Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default SignUp;
