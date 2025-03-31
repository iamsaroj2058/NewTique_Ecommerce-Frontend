import { Card } from 'antd'
import React from 'react'

export function CardFirst(props){
  const {productName, price} = props;
  return (
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <div>
      <p className='font-semibold text-xl text-black'>{productName}</p>
      <p className='font-bold text-2xl'>Price : {price}</p>
    </div>
  </Card>
  )
}


