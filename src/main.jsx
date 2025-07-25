import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "rgb(255,167,36)",
              colorPrimaryHover: "rgb(124,92,43)",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>

  </StrictMode>
);
