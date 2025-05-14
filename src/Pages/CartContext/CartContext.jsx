import React, { useEffect, useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Breadcrumb, Table, Button, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";

const CartContex = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const cartKey = `cart_${user?.email}`;

  // Load cart on mount
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCartItems(storedCart);
    };

    loadCart();
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, [cartKey]);

  // Delete item from cart
  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage")); // notify others
    message.success("Item removed from cart");
  };

  // Proceed to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.warning("Your cart is empty.");
      return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    navigate("/checkout");
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Popconfirm
          title="Are you sure to remove this item?"
          onConfirm={() => handleDelete(index)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  const dataSource = cartItems.map((item, index) => ({
    key: index,
    product: (
      <div className="flex items-center gap-3">
        <img src={item.image} alt={item.name} className="h-12 w-12" />
        <span>
          {item.name} ({item.color}/{item.size})
        </span>
      </div>
    ),
    price: `Rs. ${item.price}`,
    quantity: item.quantity,
    subtotal: `Rs. ${item.subtotal}`,
  }));

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Breadcrumb items={[{ title: "Home" }, { title: "Add to Cart" }]} />
        <div className="mt-6 max-w-7xl mx-auto px-6 py-6 bg-white rounded shadow">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
          />

          {/* Total and Checkout */}
          <div className="text-right mt-6 flex justify-between items-center">
            <span className="text-xl font-bold">Total: Rs. {total}</span>
            <Button type="primary" onClick={handleCheckout}>
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartContex;
