import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import {
  Breadcrumb,
  Button,
  Rate,
  Modal,
  Form,
  Input,
  Avatar,
  Card,
  message,
  Divider,
  Tag,
} from "antd";
import {
  TruckOutlined,
  ReloadOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { TextArea } = Input;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sliderRef = useRef();
  const [form] = Form.useForm();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoginPromptVisible, setIsLoginPromptVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Format date without moment.js
  const formatDate = (dateString) => {
    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return "Unknown date";
    }
  };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  // Fetch product data and reviews
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productRes = await axios.get(
          `http://127.0.0.1:8000/store/products/${id}/`
        );
        setProduct(productRes.data);
        setSelectedColor(productRes.data.colors?.[0] || "");
        setSelectedSize(productRes.data.sizes?.[0] || "");

        // Fetch reviews separately
        try {
          const reviewsRes = await axios.get(
            `http://127.0.0.1:8000/store/reviews/?product=${id}`
          );
          setReviews(reviewsRes.data);
        } catch (err) {
          console.log("Error fetching reviews", err);
          setReviews([]);
        }
      } catch (err) {
        console.error("Failed to load product", err);
        message.error("Failed to load product details");
      }
    };

    fetchProductData();
  }, [id]);

  // Quantity handlers
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Calculate subtotal
  const subtotal = product ? product.price * quantity : 0;

  // Check if user is logged in
  const isUserLoggedIn = () => {
    return !!localStorage.getItem("authToken");
  };

  // Cart handlers
  const handleAddToCart = async () => {
    if (!isUserLoggedIn()) {
      setIsLoginPromptVisible(true);
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/store/cart/add/",
        {
          product_id: product.id,
          quantity,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      message.success("✅ Item added to your cart.");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      if (error.response?.data?.error) {
        message.error(`❌ ${error.response.data.error}`);
      } else {
        message.error("❌ Failed to add item to cart. Please try again.");
      }
    }
  };

  const handleBuyNow = () => {
    if (!isUserLoggedIn()) {
      setIsLoginPromptVisible(true);
      return;
    }

    const item = {
      id: product.id,
      image: product.images?.[0] || product.image,
      name: product.name,
      price: product.price,
      quantity: quantity,
      subtotal: product.price * quantity,
      stock: product.stock,
    };

    const checkoutItems = [
      {
        id: product.id,
        quantity: quantity,
      },
    ];

    localStorage.setItem("buyNowItem", JSON.stringify(item));
    localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
    navigate("/checkout");
  };

  // Review handlers
  const handleSubmitReview = async (values) => {
    if (!isUserLoggedIn()) {
      setIsLoginPromptVisible(true);
      return;
    }

    setReviewLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://127.0.0.1:8000/store/reviews/`,
        {
          product: id,
          rating: values.rating,
          comment: values.comment,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setReviews([response.data, ...reviews]);
      message.success("Review submitted successfully!");
      form.resetFields();
      setIsReviewModalVisible(false);
    } catch (error) {
      console.error("Failed to submit review", error);
      if (error.response?.status === 400) {
        message.error("You've already reviewed this product");
      } else {
        message.error(error.response?.data?.error || "Failed to submit review");
      }
    } finally {
      setReviewLoading(false);
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Topheader />
      <Header />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        <Breadcrumb
          items={[
            { title: <a href="/">Home</a> },
            { title: product.category || "Product" },
            { title: product.name },
          ]}
          className="mb-6"
        />

        {/* Product Card */}
        <Card className="shadow-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="relative bg-white rounded-lg p-4">
                <Slider ref={sliderRef} {...carouselSettings}>
                  {(product.images?.length > 0
                    ? product.images
                    : [product.image]
                  ).map((img, i) => (
                    <div key={i} className="flex justify-center">
                      <img
                        src={img}
                        alt={`Product ${i + 1}`}
                        className="rounded-lg object-contain h-64 md:h-96 mx-auto"
                      />
                    </div>
                  ))}
                </Slider>

                {/* Thumbnails */}
                <div className="flex justify-center mt-4 space-x-2 overflow-x-auto py-2">
                  {(product.images?.length > 0
                    ? product.images
                    : [product.image]
                  ).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(index);
                        sliderRef.current?.slickGoTo(index);
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumb ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center mt-2">
                  <Rate
                    disabled
                    allowHalf
                    value={product.average_rating || 0}
                    className="text-sm text-yellow-500"
                  />
                  <span className="text-gray-600 text-sm">
                    ({reviews.length} reviews)
                  </span>
                </div>
                <p className="mt-3 text-gray-700">{product.description}</p>
              </div>

              {/* Price and Stock */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-orange-600">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.original_price && (
                    <span className="ml-2 text-gray-500 line-through">
                      Rs. {product.original_price.toLocaleString()}
                    </span>
                  )}
                </div>
                <div
                  className={`text-lg font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? (
                    <span>{product.stock} available in stock</span>
                  ) : (
                    <span>Out of stock</span>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 rounded-full border text-sm ${
                          selectedColor === color
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 text-gray-700"
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
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 rounded border text-sm ${
                          selectedSize === size
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 text-gray-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-2 flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 rounded-l border border-gray-300 flex items-center justify-center text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-r border border-gray-300 flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-lg font-bold text-green-600">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="primary"
                  size="large"
                  icon={<ThunderboltOutlined />}
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  Buy Now
                </Button>
                <Button
                  type="default"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
              </div>

              {/* Product Details */}
              <div className="pt-4 space-y-4">
                <div className="flex items-start gap-4">
                  <TruckOutlined className="text-xl text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Free Delivery</h4>
                    <p className="text-gray-600 text-sm">
                      Free standard shipping on all orders
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ReloadOutlined className="text-xl text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Easy Returns</h4>
                    <p className="text-gray-600 text-sm">
                      30-day hassle-free returns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Reviews Section */}
        <Card className="mt-8 shadow-sm rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Customer Reviews
            </h2>
            <Button
              type="primary"
              onClick={() => setIsReviewModalVisible(true)}
              disabled={!isUserLoggedIn()}
            >
              Write a Review
            </Button>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar size="large" icon={<UserOutlined />} />
                      <div>
                        <h4 className="font-medium">
                          {review.user_name || "Anonymous"}
                        </h4>
                        <Rate
                          disabled
                          value={review.rating}
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                  <div className="mt-3 pl-14">
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No reviews yet.{" "}
                {isUserLoggedIn()
                  ? "Be the first to review!"
                  : "Login to leave a review"}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Review Modal */}
      <Modal
        title="Write a Review"
        open={isReviewModalVisible}
        onCancel={() => setIsReviewModalVisible(false)}
        footer={null}
        centered
      >
        <Form form={form} onFinish={handleSubmitReview} layout="vertical">
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please rate the product" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Your Review"
            rules={[
              {
                required: true,
                message: "Please write your review",
                min: 10,
                message: "Review must be at least 10 characters",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Share your experience with this product..."
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={reviewLoading}
              block
              size="large"
            >
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Login Prompt Modal */}
      <Modal
        open={isLoginPromptVisible}
        onCancel={() => setIsLoginPromptVisible(false)}
        footer={null}
        centered
        title={<div className="text-center font-semibold">Login Required</div>}
      >
        <div className="text-center mb-6">
          <p>You need to login to continue this action.</p>
        </div>
        <div className="flex flex-col space-y-3">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            type="default"
            size="large"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default ProductDetails;
