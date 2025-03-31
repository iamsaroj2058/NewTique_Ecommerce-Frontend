import React, { useState } from "react";
import { Button, Typography, ColorPicker } from "antd";

const { Text } = Typography;

const Topheader = () => {
  const [textColor, setTextColor] = useState("#FFA724");

  return (
    <div className="bg-black text-center h-12 w-full max-w-full mx-auto flex justify-center items-center px-4">
      <Text className="mr-4" style={{ color: textColor }}>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
      </Text>
      <Button type="link" className="font-bold underline" style={{ color: textColor }} hoverable>
        Shop Now
      </Button>
    </div>
  );
};

export default Topheader;
