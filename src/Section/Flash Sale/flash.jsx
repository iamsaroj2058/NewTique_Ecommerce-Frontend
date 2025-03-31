import React, { useState, useEffect } from "react";


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
    <div className="ml-[60px] flex justify-between items-center w-full">
      <div className=" mt-14">
        {/* Today's Section */}
        <div className="flex items-center gap-2 h-12">
          <span className="w-5 h-full bg-orange-400 rounded-md"></span>
          <h3 className="text-2xl font-semibold">Today's</h3>
        </div>
        {/* Flash Sales + Timer */}
        <div className="flex items-center gap-5 mt-3 h-16">
          <h1 className="text-5xl font-bold">Flash Sales</h1>
        </div>
      </div>
      <div className="flex items-center mr-[60px]">
        <span className="text-4xl font-bold text-red-500">
          {formatTime(timeLeft)}
        </span>
      </div>
      <div>
      </div>
    </div>
  );
};

export default App;
