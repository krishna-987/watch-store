import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // =========================
  // FETCH CART
  // =========================
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token, skipping cart fetch");
        return;
      }

      const res = await fetch("http://127.0.0.1:8000/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        console.log("Unauthorized - login required");
        return;
      }

      const data = await res.json();

      const formatted = (data.items || []).map((item) => ({
        id: item.product_id,
        cart_item_id: item.item_id,
        name: item.product,
        price: Number(item.price),
        qty: item.quantity,
        image: item.image || "",
      }));

      setCartItems(formatted);

    } catch (err) {
      console.log("FETCH CART ERROR:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        return;
      }

      const res = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          
        }),
      });

      if (res.ok) {
        fetchCart();
      }

    } catch (err) {
      console.log("ADD ERROR:", err);
    }
  };

  // =========================
  // REMOVE FROM CART
  // =========================
  const removeFromCart = async (cart_item_id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/api/cart/remove/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item_id: cart_item_id,
        }),
      });

      if (res.ok) {
        fetchCart();
      }

    } catch (err) {
      console.log("REMOVE ERROR:", err);
    }
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQty = async (cart_item_id, quantity) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/api/cart/update/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item_id: cart_item_id,
          quantity: quantity,
        }),
      });

      if (res.ok) {
        fetchCart();
      }

    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQty,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);