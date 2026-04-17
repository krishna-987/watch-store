import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useFavorite } from "../Context/FavoriteContext";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [search, setSearch] = useState("");
  const [isLogged, setIsLogged] = useState(false); // ✅ LOGIN STATE

  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const { favorites, removeFromFavorite } = useFavorite();

  // ✅ SCROLL
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ LOGIN CHECK
  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // 🔥 update UI
  };

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>

      {/* LEFT */}
      <div className="nav-left">
        <div className="nav-item">
          Shop ▾
          <div className="dropdown">
            <Link to="/shop/watches">Watches</Link>
            <Link to="/shop/eyewear">Eyewear</Link>
            <Link to="/shop/accessories">Accessories</Link>
          </div>
        </div>

        <Link to="/stories">Stories</Link>
        <Link to="/app">App</Link>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <Link to="/" className="logo">SEVENFRIDAY</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* ✅ LOGIN / LOGOUT */}
        {isLogged ? (
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        ) : (
          <Link to="/login">Account</Link>
        )}

        {/* ❤️ FAVORITES */}
        <div className="icon-box" onClick={() => setShowFav(!showFav)}>
          ❤️ ({favorites.length})

          {showFav && (
            <div className="dropdown-box">
              {favorites.length === 0 ? (
                <p>No favorites</p>
              ) : (
                favorites.map((item) => (
                  <div key={item.id} className="dropdown-item">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `http://127.0.0.1:8000${item.image}`
                      }
                      alt={item.name}
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromFavorite(item.id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
              <Link to="/favorites" className="view-btn">
                View Favorites
              </Link>
            </div>
          )}
        </div>

        {/* 🛒 CART */}
        <div className="icon-box" onClick={() => setShowCart(!showCart)}>
          🛒 ({cartItems.length})

          {showCart && (
            <div className="dropdown-box">
              {cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="dropdown-item">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `http://127.0.0.1:8000${item.image}`
                      }
                      alt={item.name}
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.cart_item_id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
              <Link to="/cart" className="view-btn">
                View Cart
              </Link>
            </div>
          )}
        </div>

        <Link to="/checkout">Checkout</Link>
        <Link to="/orders">Orders</Link>

        {/* 🔍 SEARCH */}


        
        <div className="search-line">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                navigate(`/search/${search}`);
              }
            }}
          />
          <span
            onClick={() => {
              if (search.trim()) {
                navigate(`/search/${search}`);
              }
            }}
          >
            🔍
          </span>
        </div>

      </div>
    </div>
  );
}

export default Navbar;