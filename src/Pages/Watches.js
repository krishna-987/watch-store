import "./Watches.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useFavorite } from "../Context/FavoriteContext";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";




function Watches() {
  const { addToCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavorite();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ FETCH DATA FROM BACKEND
  useEffect(() => {
fetch("https://watch-store-nc7y.onrender.com/api/store/products/")      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data); // debug

        // ✅ SAFE FILTER (handles "Watch", "Watches", etc.)
        const watches = data.filter(
          (p) =>
            p.category_name &&
            p.category_name.toLowerCase().includes("watch")
        );

        setItems(watches);
      })
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  // ✅ Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="watches-page">
      <h2 className="title">SEVENFRIDAY ESSENTIALS</h2>

      <div className="watch-grid">
        {currentItems.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found</p>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="watch-card"
              onClick={() => navigate(`/product/${item.id}`)}
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

              {/* 🖼 FIXED IMAGE */}
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    
                    : `https://watch-store-nc7y.onrender.com${item.image}`
                }
                alt={item.name}
                className="watch-img"
                onError={(e) => {
                  console.log("Image failed:", item.image);
                  e.target.style.display = "none";
                }}
              />

              {/* TEXT */}
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              {/* 🛒 CART */}
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
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              currentPage < totalPages &&
              setCurrentPage(currentPage + 1)
            }
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default Watches;