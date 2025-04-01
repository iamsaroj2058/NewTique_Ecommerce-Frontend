import React from "react";
import { Button, Carousel, Row, Col } from "antd";
import { CardFirst } from "../../Components/Card/cardFirst";
import FlashSale from "../../Section/Flash Sale/flash"

const slideImages = [
  "/images/Slider1.png",
  "/images/Slider2.png",
  "/images/Slider3.png",
  "/images/Slider4.png",
  "/images/Slider5.png",
];

const Home = () => {
  const data = [
    {"id": "1", "name": "Blue jeans", "price":"1200", "rating": "4.5", "totalRatings": "120" },
    {"id": "2", "name": "Red Hoodie", "price":"2200","rating": "4.5", "totalRatings": "120"},
    {"id": "3", "name": "Yellow Hat", "price":"3200","rating": "4.5", "totalRatings": "120"},
    {"id": "4", "name": "klsjfreen Tshirt", "price":"4200","rating": "4.5", "totalRatings": "120"},
    {"id": "5", "name": "klsjfreen Tshirt", "price":"4200","rating": "4.5", "totalRatings": "120"},
    {"id": "6", "name": "klsjfreen Tshirt", "price":"4200","rating": "4.5", "totalRatings": "120"},
    {"id": "6", "name": "klsjfreen Tshirt", "price":"4200","rating": "4.5", "totalRatings": "120"},
  ]


  return (
    <div className=" mx-auto px-10 py-6 ml-[60px] mr-[60px]">
      <Row gutter={[24, 24]} align="top" className="w-full">
        {/* Category Buttons */}
        <Col xs={24} md={3} className="text-lg">
          <div className="space-y-4">
            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Women's Fashion
              </Button>
            </div>

            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Men's Fashion
              </Button>
            </div>

            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Tshirt
              </Button>
            </div>

            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Hoddy
              </Button>
            </div>
          </div>
        </Col>

        {/* Vertical Line
        <Col xs={0} md={1} className='hidden md:flex justify-center'>
          <div className='h-full w-[2px] bg-gray-400'></div>
        </Col> */}

        {/* Carousel Section */}
        <Col xs={24} md={21}>
          <Carousel autoplay className="rounded-lg overflow-hidden shadow-lg">
            {slideImages.map((image, index) => (
              <div key={index} className="text-center">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[300px] md:h-[500px] object-cover"
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
      {/* flash sale  and  card */}
      {/* Flash Sale */}
      <FlashSale />


      {/* Card */}
      <div className="overflow-x-auto p-4" style={{ width: 'calc(300px * 5)', maxWidth: '100%' }}>
      <div className="flex gap-6">
            {
              data.map((item)=>(
                <CardFirst productName={item.name} price={item.price} key={item.id} rating={item.rating} totalRatings ={item.totalRatings} />
            ))
            }
      </div>
      </div>
    </div>
  );
};

export default Home;
