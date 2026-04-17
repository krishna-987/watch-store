import "./Auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reset link sent to " + email);
  };

  return (
    <div className="auth-container">

      <h2>RESET PASSWORD</h2>
      <p className="auth-sub">Home / Account / Reset</p>

      <p className="auth-info">
        We'll send you an email to reset your password.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>

        <label>Email</label>
        <input
          type="email"
          placeholder="your@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="auth-actions">
          <button type="submit">RESET</button>
          <Link to="/login">Cancel</Link>
        </div>

      </form>

    </div>
  );
}

export default ForgotPassword;