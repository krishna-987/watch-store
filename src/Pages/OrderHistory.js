import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "./Dashboard.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/orders/history/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) throw new Error("Unauthorized");

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000);
    return () => clearInterval(interval);
  }, []);

  // ================= CANCEL =================
  const cancelOrder = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/orders/cancel/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id ? { ...o, status: "cancelled" } : o
          )
        );

        toast.success("Order cancelled");
      } else {
        toast.error(data.error || "Cancel failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  // ================= DOWNLOAD INVOICE =================
  const downloadInvoice = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/orders/invoice/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${id}.pdf`;
      a.click();
    } catch {
      toast.error("Invoice download failed");
    }
  };

  return (
    <div className="dashboard">
      <h2>My Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && orders.length === 0 && (
        <p>No orders yet</p>
      )}

      <div className="orders-container">
        {orders.map((order, index) => {
          const steps = ["pending", "processing", "shipped", "delivered"];

          const currentIndex =
            order.status === "cancelled"
              ? -1
              : steps.indexOf(order.status);

          return (
            <motion.div
              className="order-card"
              key={order.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* HEADER */}
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>

              {/* TOTAL */}
              <p><strong>Total:</strong> ₹{order.amount}</p>

              {/* DATE */}
              <p className="date">
                {new Date(order.date).toLocaleString()}
              </p>

              {/* ITEMS */}
              <div className="items">
                {order.items?.map((item, i) => (
                  <div className="item" key={i}>
                    <div className="item-left">
                      <img
                        src={
                          item.image
                            ? `http://127.0.0.1:8000${item.image}`
                            : "/no-image.png"
                        }
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </div>

                    <div className="item-right">
                      {item.qty} × ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* TIMELINE */}
              <div className="timeline">
                {steps.map((step, i) => (
                  <div
                    key={step}
                    className={`step ${
                      i <= currentIndex ? "active" : ""
                    }`}
                  >
                    <span>
                      {step === "pending" && "📝"}
                      {step === "processing" && "⚙️"}
                      {step === "shipped" && "🚚"}
                      {step === "delivered" && "✅"}
                    </span>
                    <p>{step}</p>
                  </div>
                ))}

                {order.status === "cancelled" && (
                  <div className="cancelled">❌ Cancelled</div>
                )}
              </div>

              {/* BUTTONS */}
              <div style={{ marginTop: "10px" }}>
                {order.status !== "delivered" &&
                  order.status !== "cancelled" && (
                    <button
                      className="cancel-btn"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}

                {/* ✅ INVOICE BUTTON */}
                <button
                  onClick={() => downloadInvoice(order.id)}
                  style={{
                    marginLeft: "10px",
                    background: "#222",
                    color: "#fff",
                    padding: "8px 12px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  📄 Invoice
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderHistory;