import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Button ,Typography} from "antd";

const { Countdown } = Statistic;

const FlashSale = () => {
  // Set an end time for the countdown (e.g., 1 hour from now)
  const deadline = Date.now() + 60 * 60 * 1000; // 1 hour

  // Sample products
  const products = [
    { id: 1, name: "NewTshirt", price: "$299", img: "/images/Tshirt.png" },
    { id: 2, name: "Hat", price: "$99", img: "/images/Hat.png" },
    { id: 3, name: "Hoddy", price: "$899", img: "/images/Hoody.png" },
    { id: 4, name: "Sweatshirt", price: "$199", img: "/images/ssweathirt.png" },
  ];

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1 style={{ fontWeight: "bold" }}> Flash Sale! Limited Time Offers </h1>

      {/* Countdown Timer */}
      <Countdown title="Time Left:" value={deadline} format="HH:mm:ss" />

      {/* Product Grid */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={6} key={product.id}>
            <Card cover={<img alt={product.name} src={product.img} />} bordered={false}>
              <h3>{product.name}</h3>
              <p style={{ fontSize: 18, fontWeight: "bold" }}>{product.price}</p>
              <Button type="primary">Buy Now</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FlashSale;
