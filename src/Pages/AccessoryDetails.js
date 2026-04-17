import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState, useEffect } from "react";
import "./AccessoryDetails.css";

function AccessoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/products/")
      .then((res) => res.json())
      .then((data) => {
        const product = data.find((p) => p.id === Number(id)); // ✅ FIXED
        setItem(product);
      })
      .catch((err) => console.error("ERROR:", err));
  }, [id]);

  // ⏳ Loading state
  if (!item) {
    return <h2 className="not-found">Loading...</h2>;
  }

  return (
    <div className="product-page">

      <div className="product-container">

        {/* IMAGE */}
        <div className="product-left">
          <img
            src={
              item.image?.startsWith("http")
                ? item.image
                : `http://127.0.0.1:8000${item.image}`
            }
            alt={item.name}
          />
        </div>

        {/* DETAILS */}
        <div className="product-right">

          <p className="brand">SEVENFRIDAY INDIA</p>

          <h2 className="product-title">{item.name}</h2>

          <p className="price">₹{item.price}</p>

          {/* QTY */}
          <div className="qty">
            <label>Quantity:</label>
            <input
              type="number"
              value={qty}
              min="1"
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          {/* BUTTONS */}
          <div className="buttons">
            <button
              className="cart-btn"
              onClick={() => {
                for (let i = 0; i < qty; i++) {
                  addToCart(item);
                }
              }}
            >
              ADD TO CART
            </button>

            <button
              className="buy-btn"
              onClick={() => {
                for (let i = 0; i < qty; i++) {
                  addToCart(item);
                }
                navigate("/checkout");
              }}
            >
              BUY IT NOW
            </button>
          </div>

          {/* INFO */}
          <div className="info">
            <p>✔ Secure Payments</p>
            <p>✔ Free Express Shipping</p>
            <p>✔ Import Duties Included</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AccessoryDetails;