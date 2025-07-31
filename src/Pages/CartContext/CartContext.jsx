import React, { useEffect, useState } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Table,
  Button,
  Popconfirm,
  message,
  InputNumber,
} from "antd";

const BACKEND_URL = "http://localhost:8000";

const CartContex = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch Cart Items from backend with token authentication
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("User not authenticated");

        const res = await fetch(`${BACKEND_URL}/api/cart/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();

        // Map cart items and fix image URL if needed
        const items = data.items.map((item) => ({
          id: item.productId,
          productId: item.product,
          name: item.product_name,
          image: item.product_image.startsWith("http")
            ? item.product_image
            : `${BACKEND_URL}${item.product_image}`,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.quantity * item.price,
          stock: item.stock ?? 99,
        }));

        setCartItems(items);
      } catch (err) {
        console.error("Failed to load cart", err);
        message.error("Failed to load cart. Please log in.");
      }
    };

    fetchCart();
  }, []);

  // Update quantity of cart item
  const handleQuantityChange = async (value, index) => {
    const updatedCart = [...cartItems];
    const item = updatedCart[index];

    if (value > item.stock) {
      message.warning(`Only ${item.stock} in stock.`);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("User not authenticated");

      const res = await fetch(`${BACKEND_URL}/api/cart/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          item_id: item.id,
          quantity: value,
        }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");

      item.quantity = value;
      item.subtotal = value * item.price;
      setCartItems(updatedCart);
      message.success("Quantity updated");
    } catch (err) {
      console.error("Quantity update failed", err);
      message.error("Failed to update quantity");
    }
  };

  const handleDelete = async (index) => {
    const item = cartItems[index];
    const token = localStorage.getItem("authToken");

    if (!token) {
      message.error("User not authenticated");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/cart/remove/?item_id=${item.productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete item");
      }

      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      message.success("Item removed from cart");
    } catch (err) {
      console.error("Delete failed:", err);
      message.error(`Failed to remove item: ${err.message}`);
    }
  };

  // Proceed to checkout after stock verification
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      message.warning("🛒 Your cart is empty.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("User not authenticated");

      const ids = cartItems.map((item) => item.productId).join(",");
      const res = await fetch(
        `${BACKEND_URL}/api/products/stocks/?ids=${ids}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to check stock");

      const data = await res.json();
      const stockMap = {};
      data.forEach((product) => {
        stockMap[product.id] = product.stock;
      });

      const invalidItems = cartItems.filter(
        (item) => item.quantity > (stockMap[item.productId] || 0)
      );

      if (invalidItems.length > 0) {
        invalidItems.forEach((item) => {
          const available = stockMap[item.productId] || 0;
          message.error(
            `❌ ${item.name}: Requested ${item.quantity}, but only ${available} in stock.`
          );
        });
        return;
      }

      // Save checkout items and navigate to checkout page
      localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
      navigate("/checkout");
    } catch (error) {
      console.error("Stock check failed:", error);
      message.error("❌ Failed to check stock. Try again.");
    }
  };

  // Table Columns
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
      render: (_, __, index) => (
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

  // Format data for Ant Design Table
  const dataSource = cartItems.map((item, index) => ({
    key: index,
    product: (
      <div className="flex items-center gap-3">
        <Link
          to={`/product-details/${item.productId}`}
          className="flex items-center gap-3"
        >
          <img src={item.image} alt={item.name} className="h-12 w-12" />
          <span className="hover:underline text-blue-600">{item.name}</span>
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
