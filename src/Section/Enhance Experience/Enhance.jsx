import React from "react";
import { Button } from "antd";

const Enhance = () => {
  return (
    <div
      className="w-full h-[500px] bg-cover bg-center flex justify-center items-center mt-12"
      style={{ backgroundImage: "url('/images/Enhance Background.png')" }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-center bg-opacity-90 p-6 w-full h-full max-w-7xl gap-10">
        {/* Text & Button Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left gap-4 px-4">
          <h1 className="text-4xl font-bold text-[#FFA724]">Enhance Your <br/>Clothing Experience</h1>
          <p className="text-[#FFA724] text-lg">
            A trendy and comfortable jacket perfect for winter.
          </p>
          <Button
            type="primary"
            size="large"
            className="underline p-0 w-fit text-[#FFA724] "
          >
            Shop Now
          </Button>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2 flex justify-center px-4">
          <img
            src="/images/Hoody.png"
            alt="Stylish Jacket"
            className="w-full max-w-[450px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Enhance;
