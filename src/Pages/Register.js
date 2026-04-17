import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Registered successfully");
        navigate("/login"); // 🔥 auto redirect
      } else {
        alert(data.error || "❌ Registration failed");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>SIGN UP</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>First name</label>
        <input type="text"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <label>Last name</label>
        <input type="text"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <label>Email</label>
        <input type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label>Password</label>
        <input type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
}

export default Register;