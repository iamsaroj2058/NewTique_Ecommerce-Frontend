
import { Card, Rate } from 'antd';
import React from 'react';

export function CardFirst(props) {
  const { productName, price, rating, totalRatings } = props;

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <div>
        <p className='font-semibold text-xl text-black'>{productName}</p>
        <p className='font-bold text-2xl'>Price: {price}</p>
        
        <div className="flex items-center">
          <Rate disabled allowHalf defaultValue={rating} />
          <span className="ml-2 text-gray-600">({totalRatings})</span>
        </div>
      </div>
    </Card>
  );
}

