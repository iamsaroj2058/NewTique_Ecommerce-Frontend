
import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const App = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" ,margin: "120px"}}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span
        style={{
          width: "20px",
          height: "40px",
          borderRadius:"4px",
          backgroundColor: "#FFA724",
          display: "inline-block",
        }}
      ></span>
      <Title level={3} style={{ marginBottom: 0 }}>
        Today's
      </Title>
    </div>
    <Title>Flash Sales</Title>
  </div>
);

export default App;
