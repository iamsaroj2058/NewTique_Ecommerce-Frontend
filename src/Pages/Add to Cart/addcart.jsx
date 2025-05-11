import React from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Breadcrumb, Table } from "antd";


const Addcart = () => {
  const { cartItems } = useCart(); // ✅ Access global cart

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

  const dataSource = cartItems.map((item, index) => ({
    key: index,
    product: (
      <div className="flex items-center gap-3">
        <img src={item.image} alt={item.name} className="h-12 w-12" />
        <span>{item.name} ({item.color}/{item.size})</span>
      </div>
    ),
    price: `Rs. ${item.price}`,
    quantity: item.quantity,
    subtotal: `Rs. ${item.subtotal}`,
  }));

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
