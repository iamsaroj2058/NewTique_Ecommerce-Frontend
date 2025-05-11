import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardFirst } from '../../Components/Card/cardFirst';
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import Upper from "../../Section/Upper Footer/upper";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams(); // 👈 get category from URL
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!categoryName) return;

    fetch('http://127.0.0.1:8000/store/products/')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (product) =>
            product.category_name?.toLowerCase() === categoryName.toLowerCase()
        );
        setFilteredProducts(filtered);
      });
  }, [categoryName]);

  return (
    <div>
      <Topheader />
      <Header />

      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px] min-h-screen">
        {/* Breadcrumb Component */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{categoryName}</Breadcrumb.Item>
        </Breadcrumb>

        {/* <h2 className="text-2xl font-bold mb-6 text-center">
          Showing products in: <span className="text-blue-600 capitalize">{categoryName}</span>
        </h2> */}

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6 px-6">          {filteredProducts.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No products found for this category.</p>
          ) : (
            filteredProducts.map((product) => (
              <CardFirst
                key={product.id}
                id={product.id}
                productName={product.name}
                price={product.price}
                rating={product.rating}
                totalRatings={10}
                productImage={product.image}
              />
            ))
          )}
        </div>

        <Upper />
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
