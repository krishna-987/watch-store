import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Shop.css";

function Shop() {
  const { category } = useParams(); // ✅ get category from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/products/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Products:", data); // 🔍 debug
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ================= CATEGORY MAP =================
  const mapCategory = (cat) => {
    if (cat === "watches") return "Watch";
    if (cat === "eyewear") return "Eyewear";
    if (cat === "accessories") return "Accessory";
    return "";
  };

  const selectedCategory = mapCategory(category);

  // ================= FILTER =================
  const filteredProducts = products.filter(
    (p) => p.category_name === selectedCategory
  );

  console.log("URL category:", category);
  console.log("Mapped:", selectedCategory);

  // ================= UI =================
  return (
    <div className="shop-container">

      <h2 className="shop-title">
        {selectedCategory || "All Products"}
      </h2>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* EMPTY */}
      {!loading && filteredProducts.length === 0 && (
        <p className="no-products">No products found</p>
      )}

      {/* PRODUCTS */}
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <Link to={`/product/${p.id}`} key={p.id} className="product-card">

            <img
              src={`http://127.0.0.1:8000${p.image}`}
              alt={p.name}
            />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

          </Link>
        ))}
      </div>

    </div>
  );
}

export default Shop;