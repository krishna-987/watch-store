import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./Context/CartContext";
import { FavoriteProvider } from "./Context/FavoriteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CartProvider>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </CartProvider>
);