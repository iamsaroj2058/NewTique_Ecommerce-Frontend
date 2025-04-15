import { Card, Rate, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";


export function CardFirst(props) {
  const { productName, price, rating, totalRatings, productImage } = props;

  const truncatedProductName =
    productName && productName.length > 20
      ? productName.slice(0, 20) + "..."
      : productName;

  const navigate = useNavigate();
  return (
    <Card
      hoverable
      style={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        position: "relative",
      }}
      cover={
        <img
          alt={productName}
          src={productImage || "https://via.placeholder.com/300"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300";
          }}
          className="h-[200px] w-full object-cover"
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
          onClick={() => navigate("/addcart")}
        >
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
