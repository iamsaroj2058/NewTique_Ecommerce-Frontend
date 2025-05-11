import React from "react";
import { Splitter, Button } from "antd";
import FlashSalesHeader from "../Flash Sale/flashSaleHeader";
import { useNavigate } from "react-router-dom";

function Section({ imgSrc, children ,onClick }) {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <div
      className="flex items-center justify-center h-full object-cover opacity-60"
      >
      <img
        src={imgSrc}
        alt=""
        className="h-full"
      />
      </div>
      <div className="absolute top-2/3 left-8 transform -translate-y-1/2 text-white text-left px-4">
        {children}
        <Button
          type="text"
          onClick={onClick}
          style={{
            color: "#FFA724",
            paddingLeft: "0",
            textDecoration: "underline",
            marginTop: "4px",
          }}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <FlashSalesHeader label="Feature" title="New Arrival" />
      <Splitter className="h-[600px]">
        {/* Left Panel */}
        <Splitter.Panel className="h-[600px] min-h-[600px] max-h-[600px] overflow-hidden flex items-center justify-center mr-2">
        <Section imgSrc="/images/newarrival_first.png"  onClick={() => navigate("/shop-now")}>
                <h1 className="text-xl font-semibold text-[#FFA724]">
                  Men's Collection
                </h1>
                <p className="text-[#FFA724] text-sm max-w-[300px]">
                  Discover the trendiest styles for men this season.
                </p>
                {/* <Button
                  type="text"
                  style={{
                    color: "#FFA724",
                    paddingLeft: "0",
                    textDecoration: "underline",
                    marginTop: "4px",
                  }}
                >
                  Shop Now
                </Button> */}
              </Section>
        </Splitter.Panel>

        {/* Right Panel */}
        <Splitter.Panel className="h-[600px]">
          <Splitter layout="vertical">
            {/* Top Right */}
            <Splitter.Panel>
              <Section imgSrc="/images/womens.png" onClick={() => navigate("/shop-now")}>
                <h1 className="text-xl font-semibold text-[#FFA724]">
                  Women's Collection
                </h1>
                <p className="text-[#FFA724] text-sm max-w-[300px]">
                  Discover the trendiest styles for women this season.
                </p>
                {/* <Button
                  type="text"
                  style={{
                    color: "#FFA724",
                    paddingLeft: "0",
                    textDecoration: "underline",
                    marginTop: "4px",
                  }}
                >
                  Shop Now
                </Button> */}
              </Section>
            </Splitter.Panel>

            {/* Bottom Right */}
            <Splitter.Panel className="mt-2">
              <Splitter>
                <Splitter.Panel>
                  <Section imgSrc="/images/popular.png" onClick={() => navigate("/shop-now")}>
                    <h1 className="text-xl font-semibold text-[#FFA724]">
                      New Hat
                    </h1>
                    <p className="text-[#FFA724] text-sm max-w-[300px]">
                      Stylish headwear for every occasion.
                    </p>
                  </Section>
                </Splitter.Panel>
                <Splitter.Panel className="ml-2">
                  <Section imgSrc="/images/Hoody.png" onClick={() => navigate("/shop-now")}>
                    <h1 className="text-2xl font-bold text-[#FFA724]">
                      New Hoodie
                    </h1>
                    <p className="text-[#FFA724] text-sm max-w-[300px]">
                      Black and white version of the PS5 hoodie on sale. Perfect
                      for gaming enthusiasts!
                    </p>
                  </Section>
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>
          </Splitter>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}

export default App;
