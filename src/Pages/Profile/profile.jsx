import React, { useState, useEffect } from "react";
import Header from "../../Section/Navbar/Header";
import Topheader from "../../Section/Navbar/Topheader";
import Footer from "../../Section/Footer/footer";
import axios from "axios";

import {
  Breadcrumb,
  Button,
  Table,
  Descriptions,
  Modal,
  Form,
  Input,
  Layout,
  Menu,
  Typography,
} from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;
const { Link } = Typography;

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeMenu, setActiveMenu] = useState("userInfo");
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const handleOk = () => setIsModalVisible(false);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderModalVisible(true);
  };

  const handleOrderModalCancel = () => setIsOrderModalVisible(false);

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const handlePasswordChange = async (values) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Please login to change your password.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/change-password/",
        {
          current_password: values.currentPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully!");
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        navigate("/login");
      } else {
        alert(
          error.response?.data?.error ||
            "Failed to change password. Please check your current password."
        );
      }
    }
  };

  const [orderData, setOrderData] = useState([]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order",
      key: "id",
      render: (order) => `#${order.id}`,
    },
    {
      title: "Products",
      dataIndex: "product",
      key: "products",
      render: (product) => (
        <div className="flex items-center gap-2">
          <img src={product.image} className="h-8 w-8 rounded" />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "subtotal",
      render: (subtotal) => `Rs. ${subtotal}`,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span
          className={`capitalize ${
            status === "completed"
              ? "text-green-500"
              : status === "cancelled"
              ? "text-red-500"
              : "text-amber-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Button size="small" onClick={() => showOrderDetails(record.order)}>
          Details
        </Button>
      ),
    },
  ];
  const formattedOrders = orderData.map((order) => ({
    key: order.id, // Use order ID as key
    order, // Preserve full order data
    product: {
      image: order.items?.[0]?.product_image || "", // ✅ From first item
      name:
        order.items?.length > 1
          ? `${order.items[0].product_name} + ${order.items.length - 1} more`
          : order.items?.[0]?.product_name || "N/A",
    },
    payment_method: order.payment_method,
    quantity: order.items?.reduce((sum, item) => sum + item.quantity, 0), // ✅ Sum all items
    subtotal: order.total_price,
    date: new Date(order.created_at).toLocaleString(),
    status: order.status,
  }));

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   } else {
  //     navigate("/login"); // Redirect if not logged in
  //   }
  // }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));

      // Start timer to remove user after 1 minute
      const timeout = setTimeout(() => {
        localStorage.removeItem("user");
      }, 3600000);

      // Clean up the timeout on unmount
      return () => clearTimeout(timeout);
    } else {
      navigate("/login"); // Redirect if user is not logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8000/api/orders/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setOrderData(response.data); // Set backend data to state
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Topheader />
      <Header />
      <div className="mx-auto px-10 py-6 ml-[60px] mr-[60px]">
        <Breadcrumb items={[{ title: "Home" }, { title: "Profile" }]} />

        <Layout className="mt-6 bg-white shadow rounded-xl">
          <Sider width={250} className="bg-white border-r">
            <Menu
              mode="inline"
              defaultSelectedKeys={["userInfo"]}
              selectedKeys={[activeMenu]}
              onClick={(e) => {
                if (e.key === "Logout") {
                  showLogoutModal(); // ✅ Show confirm modal
                } else {
                  setActiveMenu(e.key);
                }
              }}
              className="h-full"
            >
              <Menu.Item key="userInfo" icon={<UserOutlined />}>
                User Info
              </Menu.Item>
              <Menu.Item key="orderHistory" icon={<UnorderedListOutlined />}>
                Order History
              </Menu.Item>
              <Menu.Item key="changePassword" icon={<LockOutlined />}>
                Change Password
              </Menu.Item>
              <Menu.Item key="Logout" icon={<LogoutOutlined />}>
                Logout
              </Menu.Item>
            </Menu>
          </Sider>

          <Content className="p-6">
            {activeMenu === "userInfo" && (
              <div>
                <Descriptions title="User Profile" bordered column={1}>
                  <Descriptions.Item label="Name">
                    {user?.name || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {user?.email || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {user?.phone || "N/A"}
                  </Descriptions.Item>
                </Descriptions>
                <Button type="primary" className="mt-4" onClick={showModal}>
                  Edit Profile
                </Button>

                <Modal
                  title="Edit Profile"
                  open={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Form layout="vertical">
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        {
                          type: "email",
                          message: "Please enter a valid email address",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                        {
                          pattern: /^[0-9]{10}$/,
                          message:
                            "Please enter a valid phone number (10 digits)",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your phone number" />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            )}

            {activeMenu === "orderHistory" && (
              <div>
                <Table
                  dataSource={formattedOrders} // ✅ Use formattedOrders here
                  columns={columns}
                  loading={orderData.length === 0} // Basic loading state
                  onRow={(record) => ({
                    onClick: () => showOrderDetails(record.order),
                  })}
                />

                <Modal
                  title={`Order #${selectedOrder?.id}`}
                  open={isOrderModalVisible}
                  onCancel={handleOrderModalCancel}
                  footer={
                    <Button onClick={handleOrderModalCancel}>Close</Button>
                  }
                  width={800}
                >
                  {selectedOrder && (
                    <>
                      <Descriptions bordered column={1}>
                        <Descriptions.Item label="Order ID">
                          {selectedOrder.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date">
                          {new Date(selectedOrder.created_at).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                          <span
                            className={`capitalize ${
                              selectedOrder.status === "completed"
                                ? "text-green-500"
                                : selectedOrder.status === "cancelled"
                                ? "text-red-500"
                                : "text-amber-500"
                            }`}
                          >
                            {selectedOrder.status}
                          </span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Amount">
                          Rs. {selectedOrder.total_price}
                        </Descriptions.Item>
                        <Descriptions.Item label="Delivery Address">
                          {selectedOrder.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Method">
                          {selectedOrder.payment_method}
                        </Descriptions.Item>
                      </Descriptions>

                      <h4 className="text-lg font-semibold mt-6 mb-2">
                        Products
                      </h4>
                      <Table
                        dataSource={selectedOrder.items?.map((item) => ({
                          // ✅ Use items
                          key: item.id,
                          product: (
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="h-12 w-12 object-cover"
                              />
                              <span>{item.product_name}</span>
                            </div>
                          ),
                          price: `Rs. ${item.price}`,
                          quantity: item.quantity,
                          subtotal: `Rs. ${item.price * item.quantity}`,
                        }))}
                        columns={[
                          {
                            title: "Product",
                            dataIndex: "product",
                            key: "product",
                          },
                          { title: "Price", dataIndex: "price", key: "price" },
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
                        ]}
                        pagination={false}
                        bordered
                      />
                    </>
                  )}
                </Modal>
              </div>
            )}

            {activeMenu === "changePassword" && (
              <div className="max-w-md">
                <Form layout="vertical" onFinish={handlePasswordChange}>
                  <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your current password",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Enter current password" />
                  </Form.Item>

                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your new password",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter new password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Confirm New Password"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm new password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Change Password
                  </Button>
                </Form>
              </div>
            )}

            {/* Logout Confirmation Modal */}
            <Modal
              title="Confirm Logout"
              open={logoutModalVisible}
              onOk={confirmLogout}
              onCancel={cancelLogout}
              okText="Yes, Logout"
              cancelText="Cancel"
            >
              <p>Are you sure you want to logout?</p>
            </Modal>
          </Content>
        </Layout>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
