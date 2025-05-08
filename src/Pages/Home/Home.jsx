import React, { useState, useEffect } from "react";
import { Button, Carousel, Row, Col } from "antd";
import FlashSale from "../../Section/Flash Sale/flash";
import NewArrival from "../../Section/NewArrival/newArrival";
import Enhance from "../../Section/Enhance Experience/Enhance";
import Footer from "../../Section/Footer/footer";
import Upper from "../../Section/Upper Footer/upper";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/store/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

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
      <Topheader />
      <Header />
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
        <Enhance />
        <NewArrival />
        <Upper />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
