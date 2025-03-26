import React from "react";
import { Card, Row, Col, Statistic, Button, Typography } from "antd";

const { Countdown } = Statistic;
const { Title, Text } = Typography;

const FlashSale = () => {
  // Set an end time for the countdown (e.g., 1 hour from now)
  const deadline = Date.now() + 60 * 60 * 1000; // 1 hour from now

  // Sample products (Make sure these images exist in /public/images/)
  const products = [
    { id: 1, name: "New T-shirt", price: "$299", img: "/images/Tshirt.png" },
    { id: 2, name: "Hat", price: "$99", img: "/images/Hat.png" },
    { id: 3, name: "Hoodie", price: "$899", img: "/images/Hoody.png" },
    { id: 4, name: "Sweatshirt", price: "$199", img: "/images/ssweathirt.png" },
  ];

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      {/* Flash Sale Header */}
      <Title level={2} style={{ fontWeight: "bold", color: "#ff4d4f" }}>
        🔥 Flash Sale! Limited Time Offers 🔥
      </Title>

      {/* Countdown Timer */}
      <Countdown title={<Text strong>Time Left:</Text>} value={deadline} format="HH:mm:ss" />

      {/* Product Grid */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={6} key={product.id}>
            <Card
              hoverable
              bordered={false}
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              cover={
                <img
                  alt={product.name}
                  src={product.img}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
              }
            >
              <Title level={4}>{product.name}</Title>
              <Text strong style={{ fontSize: "18px", color: "#ff4d4f" }}>
                {product.price}
              </Text>
              <br />
              <Button type="primary" block style={{ marginTop: 10 }}>
                Buy Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FlashSale;
