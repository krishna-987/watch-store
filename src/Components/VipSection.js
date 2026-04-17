import { useState } from "react";
import "./VipSection.css";

function VipSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Enter email");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/newsletter/subscribe/", { // ✅ FIXED URL
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      setMessage(data.message || "Success ✅");
      setEmail("");

    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="vip-section">
      <h2>VIP LIST</h2>
      <p>Be the first to know about exclusive sales & latest arrivals!</p>

      <div className="vip-input">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubscribe}>
          SIGN UP
        </button>
      </div>

      {message && <p className="vip-msg">{message}</p>}
    </div>
  );
}

export default VipSection;