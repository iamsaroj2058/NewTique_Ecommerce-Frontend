import React, { useEffect, useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { CardFirst } from "../../Components/Card/cardFirst";
import axios from "axios";

const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(true); // Change this if needed

  // ✅ Correctly place useEffect inside the component
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/store/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px] min-h-screen">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.slice(0, showAll ? products.length : 5).map((item) => (
            <div key={item.id} className="w-full">
              <CardFirst
                key={item.id}
                id={item.id}
                productName={item.name}
                price={item.price}
                productImage={item.image}
                rating={item.rating || 4.5}
                totalRatings={item.totalRatings || 100}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopNow;
