import { Card, Rate, Button, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export function CardFirst(props) {
  const {
    productName,
    price,
    average_rating = 0,  // Default to 0 if not provided
    reviews_count = 0,   // Default to 0 if not provided
    productImage,
    id,
  } = props;

  const navigate = useNavigate();

  // Truncate long product names with tooltip for full name
  const displayName = productName?.length > 20 
    ? `${productName.slice(0, 20)}...` 
    : productName;

  // Format price with commas for Indian Rupees
  const formattedPrice = price?.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });

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
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/250x200";
          }}
        />
      }
    >
      {/* Product Name with Tooltip */}
      <Tooltip title={productName} placement="top">
        <p className="font-semibold text-xl text-black text-center mb-3 truncate">
          {displayName}
        </p>
      </Tooltip>

      {/* Price */}
      <p className="text-center font-bold text-2xl text-orange-500 mb-3">
        Rs. {formattedPrice || "N/A"}
      </p>

      {/* Rating Section */}
      <div className="flex flex-col items-center mb-3">
        <div className="flex items-center justify-center w-full mb-1">
          <Rate
            disabled
            allowHalf
            value={parseFloat(average_rating)}
            className="text-sm text-yellow-500"
          />
          <span className="ml-2 text-gray-600 text-sm">
            ({reviews_count} {reviews_count === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        {average_rating > 0 && (
          <span className="text-xs text-gray-500">
            {/* {parseFloat(average_rating).toFixed(1)} out of 5 */}
          </span>
        )}
      </div>

      {/* View Details Button */}
      <Button
        type="primary"
        className="font-bold bg-orange-500 hover:bg-orange-600 text-white h-10"
        block
        onClick={() => navigate(`/product-details/${id}`)}
      >
        View Details
      </Button>
    </Card>
  );
}