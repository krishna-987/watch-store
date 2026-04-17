import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQty } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ FIX: no replace, no parseInt
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <h2 className="cart-title">YOUR SHOPPING CART</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is empty</p>
      ) : (
        <>
          <div className="cart-table">

            {/* HEADER */}
            <div className="cart-header">
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>QUANTITY</span>
              <span>TOTAL</span>
            </div>

            {/* ITEMS */}
            {cartItems.map((item) => {
              const price = Number(item.price);

              return (
                <div className="cart-row" key={item.id}>

                  {/* PRODUCT */}
                  <div className="cart-product">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.cart_item_id)}
                    >
                      ✕
                    </button>

                    <img src={item.image} alt="" />

                    <p>{item.name}</p>
                  </div>

                  {/* PRICE */}
                  <div>₹{price}</div>

                  {/* QTY */}
                  <div>
                    <input
                      type="number"
                      value={item.qty}
                      min="1"
                  onChange={(e) =>
  updateQty(item.cart_item_id, Number(e.target.value)) // ✅ FIX
}
                    />
                  </div>

                  {/* TOTAL */}
                  <div>₹{price * item.qty}</div>

                </div>
              );
            })}
          </div>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h2>₹{total}</h2>
            <p>Tax included. Shipping calculated at checkout.</p>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;