import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState, useEffect, useCallback } from "react";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);

  // ⭐ Reviews
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/products/")
      .then((res) => res.json())
      .then((data) => {
        const product = data.find((p) => p.id === Number(id));
        setItem(product);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // ================= FETCH REVIEWS =================
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/store/reviews/${id}/`
      );
      const data = await res.json();

      setReviews(data.reviews || []);
      setAvg(data.average || 0);
    } catch (err) {
      console.error("Review fetch error:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // ================= ADD REVIEW =================
  const submitReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required ❌");
      return;
    }

    if (!comment) {
      alert("Write something ❌");
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/store/reviews/add/${id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating,
            comment,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Review added ✅");
        setComment("");
        fetchReviews();
      } else {
        alert(data.error || "Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  // ================= LOADING =================
  if (!item) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="product-page">

      {/* ================= PRODUCT ================= */}
      <div className="product-top">

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
          <h2>{item.name}</h2>
          <p className="price">₹{item.price}</p>

          {/* ⭐ AVG RATING */}
          <p className="rating">⭐ {avg.toFixed(1)} / 5</p>

          {/* QUANTITY */}
          <div className="qty">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          {/* BUTTONS */}
          <div className="buttons">
            <button
              className="cart-btn"
             onClick={async () => {
  for (let i = 0; i < qty; i++) {
    await addToCart(item);
  }
  alert("Added to cart ✅");
}}
            >
              ADD TO CART
            </button>

            <button
              className="buy-btn"
              onClick={() => {
                for (let i = 0; i < qty; i++) addToCart(item);
                navigate("/checkout");
              }}
            >
              BUY IT NOW
            </button>
          </div>

          {/* INFO */}
          <ul className="info">
            <li>✔ Secure Payment</li>
            <li>✔ Free Shipping</li>
            <li>✔ Easy Returns</li>
          </ul>
        </div>

      </div>

      {/* ================= REVIEWS ================= */}
      <div className="reviews-section">

        <h3>⭐ Customer Reviews</h3>

        {/* ADD REVIEW */}
        <div className="add-review">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>5 ⭐</option>
            <option value={4}>4 ⭐</option>
            <option value={3}>3 ⭐</option>
            <option value={2}>2 ⭐</option>
            <option value={1}>1 ⭐</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={submitReview}>
            Submit Review
          </button>
        </div>

        {/* SHOW REVIEWS */}
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <div className="review-list">
            {reviews.map((r, i) => (
              <div className="review" key={i}>
                <strong>{r.user}</strong>
                <span> ⭐ {r.rating}</span>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default ProductDetails;