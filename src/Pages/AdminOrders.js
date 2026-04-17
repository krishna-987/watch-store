import { useEffect, useState, useCallback } from "react";
import "./AdminOrders.css";
import { toast } from "react-toastify";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ================= FETCH =================
  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders/all/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) throw new Error("Login required");
      if (res.status === 403) throw new Error("Admin only");

      const data = await res.json();

      setOrders((prev) => {
        if (prev.length && data.length > prev.length) {
          toast.info("🆕 New order received!");
        }
        return Array.isArray(data) ? data : [];
      });

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // ================= AUTO REFRESH =================
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // ================= GRAPH DATA (SAFE) =================
  const grouped = {};

  orders.forEach((o) => {
    if (!o.date || !o.amount) return;

    const date = new Date(o.date).toLocaleDateString();

    grouped[date] = (grouped[date] || 0) + Number(o.amount);
  });

  const chartData = Object.keys(grouped).map((date) => ({
    date,
    amount: grouped[date],
  }));

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/orders/update-status/${id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id ? { ...o, status } : o
          )
        );

        toast.success(`📦 Order #${id} → ${status}`);
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  // ================= FILTER =================
  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.id.toString().includes(search);
    const matchFilter =
      filter === "all" ? true : order.status === filter;

    return matchSearch && matchFilter;
  });

  // ================= COLOR =================
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#777";
      case "processing":
        return "#ff9800";
      case "shipped":
        return "#2196f3";
      case "delivered":
        return "#00e676";
      case "cancelled":
        return "#ff5252";
      default:
        return "#444";
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Orders</h2>

      {/* ✅ DEBUG BUTTON */}
      <button onClick={() => console.log("ChartData:", chartData)}>
        Check Graph Data
      </button>

      {/* ================= GRAPH ================= */}
      <div className="chart-box">
        <h3>Sales Overview</h3>

        {chartData.length === 0 ? (
          <p style={{ color: "#aaa" }}>No data for graph</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* SEARCH */}
      <div className="admin-controls">
        <input
          type="text"
          placeholder="Search Order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* ORDERS */}
      <div className="admin-grid">
        {filteredOrders.map((order) => (
          <div className="admin-card" key={order.id}>
            <div className="admin-header">
              <h3>Order #{order.id}</h3>
              <span
                className="status-badge"
                style={{ background: getStatusColor(order.status) }}
              >
                {order.status}
              </span>
            </div>

            <p><strong>Total:</strong> ₹{order.amount}</p>

            <div className="admin-buttons">
              <button onClick={() => updateStatus(order.id, "processing")}>
                Processing
              </button>

              <button onClick={() => updateStatus(order.id, "shipped")}>
                Shipped
              </button>

              <button onClick={() => updateStatus(order.id, "delivered")}>
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;