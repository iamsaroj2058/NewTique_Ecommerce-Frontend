import React, { useState, useEffect } from "react";
import FlashSalesHeader from "./flashSaleHeader";
import { CardFirst } from "../../Components/Card/cardFirst";
import { Button } from "antd";
import axios from "axios";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // Countdown timer
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Fetch products from Django store app
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/store/products/")
      .then((res) => {
        // Map the response data to include average_rating and reviews_count
        const productsWithReviews = res.data.map((product) => ({
          ...product,
          average_rating: product.average_rating || 0,
          reviews_count: product.reviews_count || 0,
        }));
        setProducts(productsWithReviews);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleShowAll = () => setShowAll(!showAll);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <FlashSalesHeader label="Today's" title="Flash Sale" />
        <span className="text-4xl font-bold text-red-500">
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.slice(0, showAll ? products.length : 5).map((item) => (
          <div key={item.id} className="w-full">
            <CardFirst
              key={item.id}
              id={item.id}
              productName={item.name}
              price={item.price}
              productImage={item.image}
              average_rating={item.average_rating} // Use average_rating from API
              reviews_count={item.reviews_count} // Use reviews_count from API
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button type="primary" onClick={toggleShowAll}>
          {showAll ? "Show Less" : "View More Products"}
        </Button>
      </div>
    </div>
  );
};

export default FlashSale;
