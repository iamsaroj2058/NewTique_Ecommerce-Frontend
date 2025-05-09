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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products
    axios
      .get("http://127.0.0.1:8000/store/products/")
      .then((res) => {
        setProducts(res.data);
        
        // Extract unique category names
        const categoryNames = [
          ...new Set(res.data.map((product) => product.category_name)),
        ];
        setCategories(categoryNames);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Row gutter={[24, 24]} align="top" className="w-full">
          {/* Categories Sidebar */}
          <Col xs={24} sm={6} className="text-lg">
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="hover:bg-[#FFA724] rounded-[4px]">
                  <Button
                    type="text"
                    block
                    onClick={() => navigate(`/category/${category}`)} // Navigate to category page
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </Col>

          {/* Carousel Section */}
          <Col xs={24} sm={18}>
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

        {/* Optional sections */}
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
