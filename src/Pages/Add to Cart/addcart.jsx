import React from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Breadcrumb, Table } from "antd";


const Addcart = () => {
  // Define the cart items (products)
  const dataSource = [
    {
      key: '1',
      product: 'T-shirt',
      price: '$20',
      quantity: 2,
      subtotal: '$40',
    },
    {
      key: '2',
      product: 'Hat',
      price: '$15',
      quantity: 1,
      subtotal: '$15',
    },
    {
      key: '3',
      product: 'Sweater',
      price: '$35',
      quantity: 1,
      subtotal: '$35',
    },
  ];

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
  ];



  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Breadcrumb
          items={[
            { title: "Home" },
            { title: "Add to Cart" },
          ]}
        />
        
        {/* Cart Table */}
        <div className="mt-6 max-w-7xl mx-auto px-6 py-6 ">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Addcart;
