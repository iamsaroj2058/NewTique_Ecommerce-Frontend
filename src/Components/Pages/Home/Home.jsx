import React from "react";
import { Button, Carousel, Row, Col } from "antd";

const slideImages = [
  "/images/Slider1.png",
  "/images/Slider2.png",
  "/images/Slider3.png",
  "/images/Slider4.png",
  "/images/Slider5.png",
];

const Home = () => {
  
  return (
    <div className=' mx-auto px-10 py-6'>
      <Row gutter={[24, 24]} align="top" className='w-full'>
        {/* Category Buttons */}
        <Col xs={24} md={5} className='text-lg'>
          <div className='space-y-4'>
            <Button type="text" block className='text-lg font-semibold'>Woman’s Fashion</Button>
            <Button type="text" block className='text-lg font-semibold'>Men’s Fashion</Button>
            <Button type="text" block className='text-lg font-semibold'>Electronics</Button>
            <Button type="text" block className='text-lg font-semibold'>Home & Lifestyle</Button>
            <Button type="text" block className='text-lg font-semibold'>Medicine</Button>
          </div>
        </Col>

        {/* Vertical Line
        <Col xs={0} md={1} className='hidden md:flex justify-center'>
          <div className='h-full w-[2px] bg-gray-400'></div>
        </Col> */}

        {/* Carousel Section */}
        <Col xs={24} md={19}>
          <Carousel autoplay className='rounded-lg overflow-hidden shadow-lg'>
            {slideImages.map((image, index) => (
              <div key={index} className='text-center'>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className='w-full h-[300px] md:h-[500px] object-cover'
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
