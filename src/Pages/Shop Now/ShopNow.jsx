import React, { useEffect, useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { CardFirst } from "../../Components/Card/cardFirst";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Get search term from query string
  const query =
    new URLSearchParams(location.search).get("query")?.toLowerCase() || "";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/store/products/")
      .then((res) => {
        // Map the response data to include average_rating and reviews_count
        const productsWithReviews = res.data.map(product => ({
          ...product,
          average_rating: product.average_rating || 0,
          reviews_count: product.reviews_count || 0
        }));
        setProducts(productsWithReviews);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products by search query (by name)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px] min-h-screen">
        {query && (
          <h2 className="text-xl font-semibold mb-4">
            Search Results for: <span className="text-blue-600">{query}</span>
          </h2>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((item) => (
              <div key={item.id} className="w-full">
                <CardFirst
                  id={item.id}
                  productName={item.name}
                  price={item.price}
                  productImage={item.image}
                  average_rating={item.average_rating}  // Use average_rating from API
                  reviews_count={item.reviews_count}    // Use reviews_count from API
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShopNow;