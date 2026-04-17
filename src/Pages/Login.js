import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!email || !password) {
      alert("❌ Fill all fields");
      return;
    }

    try {
      // ✅ FIXED: store response in res
      const res = await fetch(
        "https://watch-store-nc7y.onrender.com/api/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      // ✅ SUCCESS
      if (res.ok && data.access) {
        localStorage.setItem("token", data.access);

        alert("✅ Login successful 🎉");

        navigate("/");
        window.location.reload();
      } else {
        alert(data.error || "❌ Invalid credentials");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>LOG IN</h2>

      <form className="auth-form" onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth-actions">
          <button type="submit">LOGIN</button>
          <Link to="/forgot">Forgot your password?</Link>
        </div>
      </form>

      <div className="register-section">
        <h3>NEW CUSTOMER?</h3>
        <p>Create an account to continue</p>

        <Link to="/register">
          <button>REGISTER</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;