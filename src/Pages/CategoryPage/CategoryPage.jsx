import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Card, Spin, Breadcrumb } from "antd";

const { Meta } = Card;

const CategoryPage = () => {
  const { categoryName } = useParams(); // Extract category from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch all products
    axios
      .get("http://127.0.0.1:8000/store/products/")
      .then((res) => {
        // Filter products based on category_name
        const filteredProducts = res.data.filter(
          (product) => product.category_name === categoryName
        );
        setProducts(filteredProducts);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [categoryName]);

  return (
    <div>
      <Topheader />
      <Header />

      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Breadcrumb
          items={[
            { title: "Home", href: "/" },
            { title: categoryName || "Category" },
          ]}
        />

        <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-700">
          Products in "{categoryName}"
        </h2>

        {loading ? (
          <div className="text-center p-10">
            <Spin size="large" />
          </div>
        ) : products.length === 0 ? (
          <div>No products available in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    className="h-60 object-cover"
                  />
                }
                onClick={() =>
                  (window.location.href = `/product/${product.id}`)
                } // Navigate to product details page
              >
                <Meta
                  title={product.name}
                  description={`Rs. ${product.price}`}
                />
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
