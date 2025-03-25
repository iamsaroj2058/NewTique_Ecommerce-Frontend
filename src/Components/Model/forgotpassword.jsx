// ForgotPassword.jsx
import React, { useState } from "react";
import { Modal, Button, Input } from "antd";

const ForgotPassword = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle the reset password process
  const handleResetPassword = () => {
    console.log("Password reset request for:", email);
    // You can replace this with an API call to reset the password
    onClose(); // Close modal after submitting
  };

  return (
    <Modal
      title="Reset Password"
      visible={visible}
      onCancel={onClose}
      onOk={handleResetPassword}
      okText="Reset Password"
      cancelText="Cancel"
    >
      <Input
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        type="email"
      />
    </Modal>
  );
};

export default ForgotPassword;
