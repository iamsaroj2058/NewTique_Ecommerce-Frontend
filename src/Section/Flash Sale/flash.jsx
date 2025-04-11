import React, { useState, useEffect } from "react";
import FlashSalesHeader from "./flashSaleHeader";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="w-full px-[60px] py-10">
      <div className="flex justify-between items-center">
        {/* Left Side: Flash Sale Heading */}
        <FlashSalesHeader label="Today's" title="Flash Sale" />
      {/* Timer Section */}
      
      <span className="text-4xl font-bold text-red-500">
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
};

export default App;
