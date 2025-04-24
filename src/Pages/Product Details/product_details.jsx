import React, { useState, useRef } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Breadcrumb, Button, Rate } from "antd";
import { TruckOutlined, ReloadOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const unitPrice = 1500;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedSize, setSelectedSize] = useState("M");

  const navigate = useNavigate();
  const sliderRef = useRef();

  const productImages = [
    "/images/Hoody.png",
    "/images/Hoody.png",
    "/images/Hoody.png",
  ];

  const colors = ["Red", "Blue", "Black"];
  const sizes = ["S", "M", "L", "XL"];

  const reviews = [
    {
      name: "Ali Khan",
      comment: "Great quality and super comfortable!",
      rating: 5,
    },
    {
      name: "Sara Malik",
      comment: "Color was slightly different, but still happy.",
      rating: 4,
    },
  ];

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const subtotal = unitPrice * quantity;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setSelectedImage(newIndex),
  };

  return (
    <div>
      <Topheader />
      <Header />
      <div className=" mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Breadcrumb items={[{ title: "Home" }, { title: "Product Details" }]} />

        <div className=" max-w-7xl mx-auto px-6 py-6 bg-white p-6 rounded-2xl shadow-md mt-8 grid md:grid-cols-2 gap-10">
          {/* Image Carousel Section */}
          <div className="w-full">
            <div className="p-2 border rounded-xl bg-gray-100">
              <Slider ref={sliderRef} {...settings}>
                {productImages.map((img, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="rounded-xl h-[300px] md:h-[500px] object-contain"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-4 flex-wrap">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedImage === index
                      ? "border-blue-500 scale-105"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedImage(index);
                    sliderRef.current?.slickGoTo(index);
                  }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-20 w-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold">Hoodie Newly Added</h1>
            <p className="mt-2">
              This is one of the most popular products that has attracted lots of youth.
            </p>

            <div className="text-xl px-2 font-bold text-green-500 mt-2">In Stock</div>

            <p className="mt-4 text-2xl text-orange-500 font-bold">
              Rs. {unitPrice}
              <sub className="text-gray-500 line-through text-base ml-2">
                Rs. 2100
              </sub>
            </p>

            {/* Color Selection */}
            <div className="mt-4">
              <p className="font-semibold mb-2">Color:</p>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-1 rounded-full border ${
                      selectedColor === color
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-4">
              <p className="font-semibold mb-2">Size:</p>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 rounded border ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center space-x-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border rounded px-3 py-1">
                <button
                  onClick={decreaseQuantity}
                  className="text-xl px-2 font-bold hover:text-red-500"
                >
                  −
                </button>
                <span className="mx-3">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="text-xl px-2 font-bold hover:text-green-500"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <p className="mt-4 text-lg font-semibold">
              Subtotal: <span className="text-green-600">Rs. {subtotal}</span>
            </p>

            {/* Buttons */}
            <div className="mt-6">
              <Button type="primary" onClick={() => navigate("/Home/product-details/checkout")}>
                Buy Now
              </Button>
              <Button type="default" className="ml-4">Add to Cart</Button>
            </div>

            {/* Extra Info */}
            <div className="border-2 rounded-md mt-4 p-6 bg-white">
              <div className="flex items-start gap-4">
                <TruckOutlined className="text-2xl text-blue-500 mt-1" />
                <div>
                  <h1 className="text-lg font-semibold">Free Delivery</h1>
                  <p className="text-gray-600">This is text area</p>
                </div>
              </div>

              <div className="border-t-2 my-4"></div>

              <div className="flex items-start gap-4">
                <ReloadOutlined className="text-2xl text-green-500 mt-1" />
                <div>
                  <h1 className="text-lg font-semibold">Return Delivery</h1>
                  <p className="text-gray-600">This is text area</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-10 max-w-7xl mx-auto px-6 py-6">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="border p-4 rounded shadow-sm bg-gray-50">
                <p className="font-semibold">{review.name}</p>
                <Rate disabled defaultValue={review.rating} />
                <p className="text-gray-700 mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
