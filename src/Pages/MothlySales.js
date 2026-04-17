import { useEffect, useState } from "react";
import "./Dashboard.css";

function MonthlySales() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders/monthly-history/?month=2026-04")
      .then((res) => res.json())
      .then((apiData) => {
        const monthly = {};

        apiData.forEach((item) => {
          const month = new Date(item.date).toLocaleString("default", {
            month: "short",
          });

          monthly[month] = (monthly[month] || 0) + item.amount;
        });

        setData(Object.entries(monthly));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard">
      <h2>Monthly Sales</h2>

      <div className="sales-grid">
        {data.length === 0 ? (
          <p>No data</p>
        ) : (
          data.map(([month, total]) => (
            <div className="sales-card" key={month}>
              <h3>{month}</h3>
              <p>₹ {total}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MonthlySales;