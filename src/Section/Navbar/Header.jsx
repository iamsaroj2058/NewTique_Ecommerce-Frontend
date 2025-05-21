import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Typography, Input, Badge, Button } from "antd";
import {
  ShoppingCartOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Search } = Input;

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onSearch = (value) => {
    if (value.trim()) {
      navigate(`/shop-now?query=${encodeURIComponent(value.trim())}`);
    }
  };
  const updateCartCount = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const cartKey = `cart_${currentUser?.email}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartCount(cartItems.length);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
    updateCartCount();

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
      updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const menuItems = [
    {
      key: "home",
      label: (
        <Link to="/">
          <Text strong className="text-base md:text-lg">
            Home
          </Text>
        </Link>
      ),
    },
    {
      key: "about",
      label: (
        <Link to="/about">
          <Text strong className="text-base md:text-lg">
            About
          </Text>
        </Link>
      ),
    },
    {
      key: "contact",
      label: (
        <Link to="/contact">
          <Text strong className="text-base md:text-lg">
            Contact
          </Text>
        </Link>
      ),
    },
    // 👇 Only show Sign Up if not logged in
    // ...(!user
    //   ? [
    //       {
    //         key: "signup",
    //         label: (
    //           <Link to="/signup">
    //             <Text strong className="text-base md:text-lg">
    //               Sign Up
    //             </Text>
    //           </Link>
    //         ),
    //       },
    //     ]
    //   : []),
  ];

  return (
    <nav className="bg-white shadow-md w-full px-6 md:px-10 mb-[16px]">
      <div className="ml-[60px] mr-[60px]">
        <div className="w-full grid grid-cols-12 items-center h-16">
          <div className="col-span-4 flex items-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-12 rounded-full"
            />
          </div>

          <div className="col-span-8 flex items-end">
            <Menu mode="horizontal" items={menuItems} className="w-full" />

            <div className="flex items-center w-full space-x-6">
              <Search
                placeholder="What are you looking for...?"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                className="w-3xs"
              />

              {/* ✅ Right-side Icons */}
              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <Link to="/cartcontex">
                      <Badge count={cartCount} size="small">
                        <ShoppingCartOutlined style={{ fontSize: "22px" }} />
                      </Badge>
                    </Link>
                    <Link to="/Profile">
                      <UserOutlined style={{ fontSize: "22px" }} />
                    </Link>
                  </>
                ) : (
                  <>
                    <Button type="primary" onClick={() => navigate("/login")}>
                      Login
                    </Button>
                    <Button type="default" onClick={() => navigate("/signup")}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
