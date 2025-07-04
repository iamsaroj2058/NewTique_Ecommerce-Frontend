import React, { useState, useEffect, useMemo } from "react";
import FlashSalesHeader from "./flashSaleHeader";
import { CardFirst } from "../../Components/Card/cardFirst";
import { Button, Spin } from "antd";
import axios from "axios";

// Format time function
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/store/products/");
        const productsWithReviews = res.data.map((product) => ({
          ...product,
          average_rating: product.average_rating || 0,
          reviews_count: product.reviews_count || 0,
        }));
        setProducts(productsWithReviews);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Log only once after products are fetched
  useEffect(() => {
    if (products.length > 0) {
      console.log("✅ Products fetched:", products);
    }
  }, [products]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  const displayedProducts = useMemo(
    () => (showAll ? products : products.slice(0, 5)),
    [products, showAll]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <FlashSalesHeader label="Today's" title="Flash Sale" />
        <span className="text-4xl font-bold text-red-500">
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayedProducts.map((item) => (
          <div key={item.id} className="w-full">
            <CardFirst
              id={item.id}
              productName={item.name}
              price={item.price}
              productImage={item.image}
              average_rating={item.average_rating}
              reviews_count={item.reviews_count}
            />
          </div>
        ))}
      </div>

      {products.length > 5 && (
        <div className="flex justify-center mt-10">
          <Button type="primary" onClick={toggleShowAll}>
            {showAll ? "Show Less" : "View More Products"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlashSale;
