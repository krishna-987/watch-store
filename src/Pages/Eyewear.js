import "./Eyewear.css";
import { useCart } from "../Context/CartContext";
import { useFavorite } from "../Context/FavoriteContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";


function Eyewear() {
  const { addToCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavorite();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  // ✅ FETCH ONLY EYEWEAR
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/eyewear/")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  return (
    <div className="watches-page">
      <h2 className="title">EYEWEAR COLLECTION</h2>

      <div className="watch-grid">
        {items.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="watch-card"
              onClick={() => navigate(`/eyewear/${item.id}`)}
            >
              {/* ❤️ FAVORITE */}
              <FaHeart
                className={isFavorite(item.id) ? "heart active" : "heart"}
                onClick={(e) => {
                  e.stopPropagation();
                  isFavorite(item.id)
                    ? removeFromFavorite(item.id)
                    : addToFavorite(item);
                }}
              />

              {/* 🖼 IMAGE */}
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `http://127.0.0.1:8000${item.image}`
                }
                alt={item.name}
              />

              {/* TEXT */}
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              {/* CART */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Eyewear;