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

    // ✅ Validation
    if (!form.email || !form.password) {
      alert("❌ Email and password required");
      return;
    }

    try {
      const res = await fetch(
        "https://watch-store-nc7y.onrender.com/api/accounts/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      console.log("REGISTER RESPONSE:", data);

      if (res.ok && data.success) {
        alert("✅ Registered successfully 🎉");
        navigate("/login");
      } else {
        alert(data.error || "❌ Registration failed");
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>SIGN UP</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>First name</label>
        <input
          type="text"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <label>Last name</label>
        <input
          type="text"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
}

export default Register;