import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState, useEffect } from "react";
import "./EyewearDetails.css";

function EyewearDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);

  // ✅ FETCH ONLY EYEWEAR
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/eyewear/")
      .then((res) => res.json())
      .then((data) => {
        const product = data.find((p) => p.id === Number(id));
        setItem(product);
      })
      .catch((err) => console.error("ERROR:", err));
  }, [id]);

  // ⏳ Loading
  if (!item) {
    return <h2 className="not-found">Loading...</h2>;
  }

  return (
    <div className="product-page">
      <div className="container">

        {/* IMAGE */}
        <div className="left">
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
        <div className="right">
          <p className="brand">EYEWEAR</p>
          <h2>{item.name}</h2>
          <p className="price">₹{item.price}</p>

          <div className="buttons">
            <button onClick={() => addToCart(item)}>
              ADD TO CART
            </button>

            <button onClick={() => navigate("/checkout")}>
              BUY NOW
            </button>
          </div>

          <div className="info">
            <p>✔ Stylish Design</p>
            <p>✔ Premium Quality</p>
            <p>✔ Fast Delivery</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EyewearDetails;