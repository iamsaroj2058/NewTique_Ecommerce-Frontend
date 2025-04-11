import React from 'react';

function FlashSalesHeader({label, title}) {
  return (
    <div className=" flex justify-between items-center w-full">
      <div className="mt-14">
        {/* Today's Section */}
        <div className="flex items-center gap-2 h-12">
          <span className="w-5 h-full bg-orange-400 rounded-md"></span>
          <h3 className="text-2xl font-semibold">{label}</h3>
        </div>

        {/* Flash Sales Title */}
        <div className="flex items-center gap-5 mt-3 h-16">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default FlashSalesHeader;
