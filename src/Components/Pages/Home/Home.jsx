import React from "react";
import { Button, Carousel, Row, Col } from "antd";

const slideImages = [
  "/images/Slider1.png",
  "/images/Slider2.png",
  "/images/Slider3.png",
  "/images/Slider4.png",
  "/images/Slider5.png",
];

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  width: "892px",
  textAlign: 'center',
  background: '#364d79',
};

const Home = () => {
  return (
    <div
      style={{
        width: "1170px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      
      }}
    >
      {/* Category Buttons */}
      <div style={{ marginTop: "40px"}}>
        <Button type="text">Woman’s Fashion</Button>
        <br />
        <Button type="text">Men’s Fashion</Button>
        <br />
        <Button type="text">Electronics</Button>
        <br />
        <Button type="text">Home & Lifestyle</Button>
        <br />
        <Button type="text">Medicine</Button>
        <br />
      </div>

        {/* Vertical Line */}
        <Col xs={0} md={1} className='hidden md:block'>
          <div className='h-full w-px bg-gray-300'></div>
        </Col>

      {/* Carousel Section */}
      <Carousel autoplay style={{ width: "892px", margin: "0 auto", marginTop:"40px" }}>
        {slideImages.map((image, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "400px", objectFit: "cover",contentStyle }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
