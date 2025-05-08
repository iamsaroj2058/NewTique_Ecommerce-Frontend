import { Card, Rate, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export function CardFirst(props) {
  const { productName, price, rating, totalRatings, productImage, id } = props;
  const truncatedProductName =
    productName && productName.length > 20
      ? productName.slice(0, 20) + "..."
      : productName;
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105 w-full"
      bodyStyle={{ padding: "12px" }}
      cover={
        <img
          alt={productName}
          src={productImage || "https://via.placeholder.com/250x200"}
          className="h-[180px] w-full object-cover rounded-t-2xl"
        />
      }
    >
      <p className="font-semibold text-xl text-black text-center mb-3">
        {truncatedProductName}
      </p>
      <p className="text-center font-bold text-2xl text-orange-500 mb-3">
        Rs. {price}
      </p>
      <div className="text-center">
        <div className="text-left items-center mb-2">
          <Rate disabled allowHalf defaultValue={parseFloat(rating)} />
          <span className="ml-2 text-gray-600">({totalRatings})</span>
        </div>
        <Button
          type="primary"
          className="font-bold text-2xl bg-red text-orange-500"
          block
          onClick={() => navigate(`/product-details/${id}`)} // Correct route to Product Details
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
