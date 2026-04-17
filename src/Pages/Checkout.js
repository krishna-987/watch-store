import "./Checkout.css";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pin: ""
  });

  const [errors, setErrors] = useState({});

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    if (!form.email) newErrors.email = true;
    if (!form.firstName) newErrors.firstName = true;
    if (!form.address) newErrors.address = true;
    if (!form.city) newErrors.city = true;
    if (!form.pin) newErrors.pin = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= TOTAL =================
  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.toString().replace(/[^0-9]/g, ""));
    return sum + price * item.qty;
  }, 0);

  // ================= MAIN =================
  const handleSubmit = async () => {
    if (!validate()) return;

    if (cartItems.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❌");
      return;
    }

    try {
      console.log("➡️ Creating order...");

      const res = await fetch("http://127.0.0.1:8000/api/orders/create-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ total }),
      });

      const data = await res.json();

      if (!res.ok || !data.order) {
        alert("Order creation failed ❌");
        return;
      }

      const order = data.order;

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded ❌");
        return;
      }

      const options = {
        key: "rzp_test_SXU092TOX2b6WJ",
        amount: order.amount,
        currency: "INR",
        name: "SEVENFRIDAY",
        description: "Order Payment",
        order_id: order.id,

        // ================= PAYMENT SUCCESS =================
        handler: async function (response) {
          console.log("RAZORPAY RESPONSE:", response);

          try {
            const verifyRes = await fetch(
              "http://127.0.0.1:8000/api/orders/verify-payment/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  items: cartItems,
                }),
              }
            );

            const verifyData = await verifyRes.json();
            console.log("VERIFY RESPONSE:", verifyData);

            if (verifyData.success) {
              alert("✅ Payment Successful!");

              // clear cart
              setCartItems([]);
              localStorage.removeItem("cart");

            } else {
              alert("❌ Payment Verification Failed");
            }

          } catch (err) {
            console.error(err);
            alert("❌ Verification error");
          }
        },

        // ================= CANCEL =================
        modal: {
          ondismiss: function () {
            alert("Payment cancelled ❌");
          },
        },

        // ================= PREFILL =================
        prefill: {
          name: form.firstName + " " + form.lastName,
          email: form.email,
        },

        theme: {
          color: "#000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("ERROR:", error);
      alert("❌ Order / Payment error");
    }
  };

  return (
    <div className="checkout">

      {/* LEFT */}
      <div className="checkout-left">

        <h2>Contact</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />

        <h2>Delivery</h2>

        <div className="row">
          <input
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            className={errors.firstName ? "error" : ""}
          />
          <input
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
          />
        </div>

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className={errors.address ? "error" : ""}
        />

        <div className="row">
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className={errors.city ? "error" : ""}
          />
          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
          />
          <input
            name="pin"
            placeholder="PIN code"
            onChange={handleChange}
            className={errors.pin ? "error" : ""}
          />
        </div>

        <h2>Payment</h2>
        <div className="payment-box">Razorpay Secure Payment</div>

        <button className="pay-btn" onClick={handleSubmit}>
          Pay Now
        </button>

      </div>

      {/* RIGHT */}
      <div className="checkout-right">

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => {
              const price = parseInt(item.price.toString().replace(/[^0-9]/g, ""));
              return (
                <div className="summary-item" key={item.id}>

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
                    <span>Qty: {item.qty}</span>
                  </div>

                  <p>₹{price * item.qty}</p>
                </div>
              );
            })}

            <div className="summary-total">
              <p>Total</p>
              <p>₹{total}</p>
            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default Checkout;