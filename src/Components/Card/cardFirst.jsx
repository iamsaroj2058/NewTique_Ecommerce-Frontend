import { Card, Rate, Button } from "antd";
import React from "react";

export function CardFirst(props) {
  const { productName, price, rating, totalRatings, productImage } = props;
  console.log("Card Image URL:", productImage);
  const truncatedProductName =
  productName && productName.length > 20
    ?  "..." + productName.slice(0, 20) 
    : productName;
  return (
    <Card
      hoverable
      style={{
        width: 300,
        display: 'flex',
        flexDirection: 'column', // Ensures that content is stacked vertically
        justifyContent: 'space-between', // Ensures space between content and button
        // Makes sure the card stretches to fit the container height
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out', // Smooth hover effect
        position: 'relative', // To allow absolute positioning of button
      }}
      cover={
        <img
          alt={productName}
          src={productImage || "https://via.placeholder.com/300"}
          className="h-[200px] w-full object-cover"
        />
      }
    >
      <div className="">
        <div className="text-left items-center mb-2">
          <span className="ml-2 text-gray-600">({totalRatings})</span>
          <Rate disabled allowHalf defaultValue={parseFloat(rating)} />
        </div>

        <p className="text-center font-bold text-2xl text-orange-500 mb-3">
          Rs. {price}
        </p>
        <p className="font-semibold text-xl text-black text-center mb-3 " >
          {truncatedProductName }
        </p>


        {/*  Button */}
        <Button
          type="primary"
          className="font-bold text-2xl bg-red text-orange-500"
          block
          onClick={() => console.log("Go to details")}
        >
          Add to card
        </Button>
      </div>
    </Card>
  );
}

