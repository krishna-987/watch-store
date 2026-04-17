import "./Accessories.css";
import { useCart } from "../Context/CartContext";
import { useFavorite } from "../Context/FavoriteContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function Accessories() {
  const { addToCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavorite();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/store/products/")
    .then((res) => res.json())
    .then((data) => {
      const acc = data.filter(
        (p) =>
          p.category_name &&
          p.category_name.toLowerCase() === "accessories"
      );

      setItems(acc); // ✅ MUST USE
    })
    .catch((err) => console.error(err));
}, []);

  // ✅ PAGINATION LOGIC
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="watches-page">
      <h2 className="title">ACCESSORIES</h2>

      <div className="watch-grid">
        {currentItems.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found</p>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="watch-card"
              onClick={() => navigate(`/accessory/${item.id}`)}
            >
              {/* ❤️ Favorite */}
              <FaHeart
                className={isFavorite(item.id) ? "heart active" : "heart"}
                onClick={(e) => {
                  e.stopPropagation();
                  isFavorite(item.id)
                    ? removeFromFavorite(item.id)
                    : addToFavorite(item);
                }}
              />

              {/* 🖼 Image */}
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `http://127.0.0.1:8000${item.image}`
                }
                alt={item.name}
                className="watch-img"
                onError={(e) => (e.target.style.display = "none")}
              />

              {/* 📦 Details */}
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              {/* 🛒 Add to cart */}
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

      {/* ✅ PAGINATION */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Accessories;