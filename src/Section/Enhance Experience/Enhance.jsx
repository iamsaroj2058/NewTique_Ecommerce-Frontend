import React from "react";
import { Card } from "antd";

const Enhance = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/Enhance Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 0",
        display: "flex", 
        justifyContent: "center",
        minHeight: "500px",
      }}
    >
      <Card
        hoverable
        style={{
          width: 300,
          textAlign: "center",
          borderRadius: 10,
          overflow: "hidden",
        }}
        cover={
          <img
            alt="Clothing Item"
            src="https://via.placeholder.com/250"
            style={{ borderRadius: "10px 10px 0 0", width: "100%" }}
          />
        }
      >
        <h3>Stylish Jacket</h3>
        <p>A trendy and comfortable jacket perfect for winter.</p>
      </Card>
    </div>
  );
};

export default Enhance;
