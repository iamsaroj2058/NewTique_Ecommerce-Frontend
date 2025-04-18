import React from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Breadcrumb, } from "antd";

const Product_details = () => {
  // Define the cart items (products)
 

  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Breadcrumb
          items={[
            { title: "Home" },
            { title: "Product-Details" },
          ]}
        />
        <div>
          <img src="/images/" alt="Product Image" />
        </div>
       </div>
      <Footer />
    </div>
  );
};

export default Product_details;
