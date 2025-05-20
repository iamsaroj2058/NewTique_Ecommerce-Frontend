import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Breadcrumb, Button, Rate, Modal } from "antd";
import { TruckOutlined, ReloadOutlined } from "@ant-design/icons";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sliderRef = useRef();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoginPromptVisible, setIsLoginPromptVisible] = useState(false);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/store/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setSelectedColor(res.data.colors?.[0] || "");
        setSelectedSize(res.data.sizes?.[0] || "");
        if (res.data.reviews) setReviews(res.data.reviews);
      })
      .catch((err) => {
        console.error("Failed to load product", err);
      });
  }, [id]);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const subtotal = product ? product.price * quantity : 0;

  const isUserLoggedIn = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return !!(user && user.email);
    } catch {
      return false;
    }
  };

  const showLoginPrompt = () => {
    setIsLoginPromptVisible(true);
  };

  const handleAddToCart = () => {
    if (!isUserLoggedIn()) {
      showLoginPrompt();
      return;
    }

    const cartItem = {
      id: product.id,
      image: product.images?.[0] || product.image,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const cartKey = `cart_${user.email}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingIndex = existingCart.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.color === cartItem.color &&
        item.size === cartItem.size
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
      existingCart[existingIndex].subtotal =
        existingCart[existingIndex].quantity *
        existingCart[existingIndex].price;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage")); // Update header cart count
    alert("✅ Item added to cart!");
  };

  const handleBuyNow = () => {
    if (!isUserLoggedIn()) {
      showLoginPrompt();
      return;
    }

    const item = {
      id: product.id,
      image: product.images?.[0] || product.image,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
    };
    localStorage.setItem("buyNowItem", JSON.stringify(item));
    navigate("/checkout");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    setIsLoginPromptVisible(false);
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
    setIsLoginPromptVisible(false);
  };

  const handleCloseModal = () => {
    setIsLoginPromptVisible(false);
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsLoginPromptVisible(false);
    }
  }, []);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Breadcrumb items={[{ title: "Home" }, { title: "Product Details" }]} />

        <div className="max-w-7xl mx-auto px-6 py-6 bg-white rounded-2xl shadow-md mt-8 grid md:grid-cols-2 gap-10">
          {/* Image Carousel */}
          <div className="w-full">
            <div className="p-2 border rounded-xl bg-gray-100">
              {product.images?.length > 0 ? (
                <Slider ref={sliderRef} {...carouselSettings}>
                  {product.images.map((img, i) => (
                    <div key={i} className="flex justify-center">
                      <img
                        src={img}
                        alt={`Product ${i + 1}`}
                        className="rounded-xl h-[300px] md:h-[500px] object-contain"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex justify-center">
                  <img
                    src={product.image}
                    alt="Product"
                    className="rounded-xl h-[300px] md:h-[500px] object-contain"
                  />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-4 flex-wrap">
              {(product.images?.length > 0
                ? product.images
                : [product.image]
              ).map((img, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    sliderRef.current?.slickGoTo(index);
                  }}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? "border-blue-500 scale-105"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${index}`}
                    className="h-20 w-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>

            <div
              className={`text-xl font-bold mt-2 ${
                product.stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </div>

            <p className="mt-4 text-2xl text-orange-500 font-bold">
              Rs. {product.price}
              <sub className="text-gray-500 line-through text-base ml-2">
                Rs. 2100
              </sub>
            </p>

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Color:</p>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
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
            )}

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Size:</p>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
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
            )}

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center space-x-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border rounded px-3 py-1">
                <button
                  onClick={decreaseQuantity}
                  className="text-xl px-2 font-bold"
                >
                  −
                </button>
                <span className="mx-3">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="text-xl px-2 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <p className="mt-4 text-lg font-semibold">
              Subtotal: <span className="text-green-600">Rs. {subtotal}</span>
            </p>

            {/* Action Buttons */}
            <div className="mt-6">
              <Button
                type="primary"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </Button>
              <Button
                type="default"
                className="ml-4"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </div>

            {/* Info Icons */}
            <div className="border-2 rounded-md mt-4 p-6 bg-white">
              <div className="flex items-start gap-4">
                <TruckOutlined className="text-2xl text-blue-500 mt-1" />
                <div>
                  <h1 className="text-lg font-semibold">Free Delivery</h1>
                  <p className="text-gray-600">Available in select regions</p>
                </div>
              </div>

              <div className="border-t-2 my-4"></div>

              <div className="flex items-start gap-4">
                <ReloadOutlined className="text-2xl text-green-500 mt-1" />
                <div>
                  <h1 className="text-lg font-semibold">Easy Return</h1>
                  <p className="text-gray-600">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-10 max-w-7xl mx-auto px-6 py-6">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border p-4 rounded shadow-sm bg-gray-50"
                >
                  <p className="font-semibold">{review.user}</p>
                  <Rate disabled defaultValue={review.rating} />
                  <p className="text-gray-700 mt-1">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      <Modal
        open={isLoginPromptVisible}
        onCancel={handleCloseModal}
        footer={null}
        closable={true}
        maskClosable={true}
        title={<div className="text-center font-semibold">Please Login</div>}
      >
        <div className="flex justify-center gap-4">
          <Button onClick={handleLoginRedirect} type="primary">
            Login
          </Button>
          <Button onClick={handleSignupRedirect} type="default">
            Sign Up
          </Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default ProductDetails;
