import { Card, Rate, Button, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export function CardFirst(props) {
  const {
    productName,
    price,
    average_rating = 0,
    reviews_count = 0,
    productImage,
    id,
  } = props;

  const navigate = useNavigate();

  const displayName = productName?.length > 20 
    ? `${productName.slice(0, 20)}...` 
    : productName;

  const formattedPrice = price?.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });

  return (
    <Card
      hoverable
      className="
        w-full h-full flex flex-col
        rounded-lg border border-gray-200
        bg-white shadow-sm
        transition-all duration-200
        hover:shadow-md
      "
      bodyStyle={{ 
        padding: "12px 12px 16px", 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column' 
      }}
      cover={
        <div className="h-[200px] w-full overflow-hidden bg-gray-50">
          <img
            alt={productName}
            src={productImage || "https://via.placeholder.com/300x300?text=Product+Image"}
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
            }}
          />
        </div>
      }
    >
      {/* Product Name */}
      <Tooltip title={productName} placement="top">
        <h3 className="
          font-bold text-gray-800 text-center
          line-clamp-2 mb-1 leading-tight
          min-h-[48px] flex items-center justify-center
          px-1
        ">
          {displayName} 
        </h3>
      </Tooltip>

      {/* Rating Section */}
      <div className="flex justify-center items-center mb-2">
        <Rate
          disabled
          allowHalf
          value={parseFloat(average_rating)}
          className="text-sm text-yellow-500"
        />
        <span className="ml-2 text-gray-600 text-sm">
          ({reviews_count || 0})
        </span>
      </div>

      {/* Price */}
      <p className="
        text-center font-bold text-orange-500
        text-lg mb-3
      ">
        Rs - {formattedPrice || "N/A"}
      </p>

      {/* View Details Button */}
      <Button
        type="primary"
        className="
          bg-orange-500 hover:bg-orange-600
          text-white font-medium
          h-9 text-sm border-0
          mt-auto
        "
        block
        onClick={() => navigate(`/product-details/${id}`)}
      >
        View Details
      </Button>
    </Card>
  );
}