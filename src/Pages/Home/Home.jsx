import React, { useState, useEffect } from "react";
import { Button, Carousel, Row, Col } from "antd";
import { CardFirst } from "../../Components/Card/cardFirst";
import FlashSale from "../../Section/Flash Sale/flash";
import NewArrival from "../../Section/NewArrival/newArrival";
import Enhance from "../../Section/Enhance Experience/Enhance";
import Footer from "../../Section/Footer/footer";
import Upper from "../../Section/Upper Footer/upper"
import axios from "axios";

const slideImages = [
  "/images/Slider1.png",
  "/images/Slider2.png",
  "/images/Slider3.png",
  "/images/Slider4.png",
  "/images/Slider5.png",
];

const Home = () => {
  // const data = [
  // {"id": "1", "name": "Blue jeans", "price":"1200", "rating": "4.5", "totalRatings": "120" },
  // {"id": "2", "name": "Red Hoodie", "price":"2200","rating": "4.5", "totalRatings": "120"},
  // {"id": "3", "name": "Yellow Hat", "price":"3200","rating": "4.5", "totalRatings": "120"},
  // {"id": "4", "name": "klsjfreen Tshirt", "price":"4200","rating": "4.5", "totalRatings": "120"},
  // {"id": "5", "name": "klsjfreen Tshirt", "price":"4200","rating": "4.5", "totalRatings": "120"},
  // {"id": "6", "name": "klsjfreen Tshirt", "price":"4200","rating": "4.5", "totalRatings": "120"},
  // {"id": "6", "name": "klsjfreen Tshirt", "price":"4200","rating": "4.5", "totalRatings": "120"},

  // ]
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Function to toggle showAll state
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
    <div className=" mx-auto px-10 py-6 ml-[60px] mr-[60px]">
      <Row gutter={[24, 24]} align="top" className="w-full">
        {/* Category Buttons */}
        <Col xs={24} md={3} className="text-lg">
          <div className="space-y-4">
            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Men's Wear
              </Button>
            </div>

            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Women's Wear
              </Button>
            </div>

            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Unisex Wear
              </Button>
            </div>

            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Streetwear
              </Button>
            </div>
            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Eco-Friendly Collection
              </Button>
            </div>
            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Sleepwear & Loungewear
              </Button>
            </div>
            <div className="text-lg hover:bg-[#FFA724] rounded-[4px]">
              <Button type="text" block>
                Plus Size Collection
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
      <div
        className="overflow-x-auto p-4"
        style={{ width: "100%", maxWidth: "100%" }}
      >
        <div className="flex gap-6 flex-wrap">
          {products.slice(0, showAll ? products.length : 5).map((item) => (
            <CardFirst
              key={item.id}
              productName={item.name}
              price={item.price}
              productImage={item.image} // Optional, if your backend provides it
              rating={item.rating || 4.5}
              totalRatings={item.totalRatings || 120}
            />
          ))}
        </div>

        <div className="flex justify-center mt-[40px]">
          <Button type="primary" onClick={toggleShowAll} className="w-auto">
            {showAll ? "Show Less" : "View More Products"}
          </Button>
        </div>
        
      </div>
      <Enhance/>
      <NewArrival/>
     <Upper/>
    </div>
      <Footer/>
      </div>
     
  );
};

export default Home;
