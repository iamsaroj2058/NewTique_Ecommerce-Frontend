import { Card, Rate, Button } from 'antd';
import React from 'react';

export function CardFirst(props) {
  const { productName, price, rating, totalRatings, productImage } = props;
  console.log("Card Image URL:", productImage);
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt={productName}
          src={productImage || "https://via.placeholder.com/300"}
          className="h-[200px] w-full object-cover"
        />
      }
    >
      <div>
        <p className='font-semibold text-xl text-black'>{productName}</p>
        <p className='font-bold text-2xl text-orange-500'>Rs. {price}</p>

        <div className="flex items-center mb-2">
          <Rate disabled allowHalf defaultValue={parseFloat(rating)} />
          <span className="ml-2 text-gray-600">({totalRatings})</span>
        </div>

        {/* Optional: View Detail Button */}
        {/* <Button type="primary" block onClick={() => console.log("Go to details")}>
          View Details
        </Button> */}
      </div>
    </Card>
  );
}
