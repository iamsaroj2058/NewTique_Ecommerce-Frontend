import React, { useEffect, useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Table,
  Button,
  Popconfirm,
  message,
  InputNumber,
} from "antd";
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
      const inStockItems = storedCart.filter((item) =>
        typeof item.stock === "number" ? item.stock > 0 : true
      );
      setCartItems(inStockItems);
    };

    loadCart();
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, [cartKey]);

  // Update quantity
  const handleQuantityChange = (value, index) => {
    const updatedCart = [...cartItems];
    const item = updatedCart[index];

    if (value > item.stock) {
      message.warning(`Only ${item.stock} in stock.`);
      return;
    }

    item.quantity = value;
    item.subtotal = value * item.price;

    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  // Delete item from cart
  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    message.success("Item removed from cart");
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      message.warning("🛒 Your cart is empty.");
      return;
    }

    try {
      const ids = cartItems.map((item) => item.id).join(",");
      const res = await fetch(
        `http://localhost:8000/api/products/stocks/?ids=${ids}`
      );
      const data = await res.json();
      const stockMap = {};
      data.forEach((product) => {
        stockMap[product.id] = product.stock;
      });

      const invalidItems = cartItems.filter((item) => {
        const latestStock = stockMap[item.id];
        return item.quantity > latestStock;
      });

      if (invalidItems.length > 0) {
        invalidItems.forEach((item) => {
          const available = stockMap[item.id] || 0;
          message.error(
            `❌ ${item.name} (${item.color}/${item.size}): Requested ${item.quantity}, but only ${available} in stock.`
          );
        });
        message.warning("⚠️ Please update your cart.");
        return;
      }

      // Only set checkout items, cart will be cleared after successful payment
      localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
      navigate("/checkout");
    } catch (error) {
      console.error("Failed to validate stock:", error);
      message.error("❌ Failed to check stock. Try again later.");
    }
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

  const dataSource = cartItems?.map((item, index) => ({
    key: index,
    product: (
      <div className="flex items-center gap-3">
        <Link
          to={`/product-details/${item.id}`}
          className="flex items-center gap-3"
        >
          <img src={item.image} alt={item.name} className="h-12 w-12" />
          <span className="hover:underline text-blue-600">
            {item.name}
            {Number(item.quantity) > Number(item.stock) && (
              <span className="text-red-500 ml-2">
                (Only {item.stock} in stock)
              </span>
            )}
          </span>
        </Link>
      </div>
    ),
    price: `Rs. ${item.price}`,
    quantity: (
      <InputNumber
        min={1}
        max={item.stock}
        value={item.quantity}
        onChange={(value) => handleQuantityChange(value, index)}
      />
    ),
    subtotal: `Rs. ${item.subtotal}`,
  }));

  // console.log(dataSource, "this is data");
  const total = cartItems.reduce((sum, item) => sum + Number(item.subtotal), 0);

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
