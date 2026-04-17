import { useFavorite } from "../Context/FavoriteContext";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
  const { favorites, removeFromFavorite, addToFavorite } = useFavorite();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const toggleFavorite = (item) => {
    const exists = favorites.find((f) => f.id === item.id);
    if (exists) {
      removeFromFavorite(item.id);
    } else {
      addToFavorite(item);
    }
  };

  return (
    <div className="fav-page">

      <h2 className="fav-title">MY FAVORITES</h2>

      {favorites.length === 0 ? (
        <div className="empty-box">
          <h3>No favorites yet ❤️</h3>
          <p>Save items you love to your wishlist.</p>

          <button onClick={() => navigate("/")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className="fav-grid">

          {favorites.map((item) => (
            <div className="fav-card" key={item.id}>

              {/* ❤️ TOGGLE */}
              <div
                className="heart"
                onClick={() => toggleFavorite(item)}
              >
                ❤️
              </div>

              {/* ✅ FIXED IMAGE */}
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `http://127.0.0.1:8000${item.image}`
                }
                alt={item.name}
                onClick={() => navigate(`/product/${item.id}`)}
              />

              <h4>{item.name}</h4>
              <p className="price">{item.price}</p>

              <div className="fav-actions">

                <button
                  className="cart-btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  View
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Favorites;