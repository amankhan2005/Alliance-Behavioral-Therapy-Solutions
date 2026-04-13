import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    
    {/* Toast container */}
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "10px",
          padding: "12px",
          fontSize: "14px",
        },
      }}
    />
    
  </React.StrictMode>
);