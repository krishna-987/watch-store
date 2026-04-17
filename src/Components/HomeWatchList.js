import { useNavigate } from "react-router-dom";
import "../Pages/Watches.css";

const watches = [
  { id: 1, name: "T2/08 - RILEY MUSIC", price: "₹125,000", image: "/images/watch1.webp" },
  { id: 2, name: "PG1/01M (GMT)", price: "₹195,000", image: "/images/watch2.webp" },
  { id: 3, name: "PG1/01 (GMT)", price: "₹174,500", image: "/images/watch3.webp" },
  { id: 4, name: "PE2/01", price: "₹144,900", image: "/images/watch4.webp" },
  { id: 5, name: "M2/02", price: "₹132,000", image: "/images/watch5.webp" },
  { id: 6, name: "S3/01", price: "₹165,000", image: "/images/watch6.webp" },
  { id: 7, name: "Q1/01", price: "₹189,000", image: "/images/watch7.webp" },
  { id: 8, name: "V3/02", price: "₹210,000", image: "/images/watch8.webp" },
];

function HomeWatchList() {
  const navigate = useNavigate();

  return (
    <div className="home-watch-section">

      <h2 className="title">SEVENFRIDAY ESSENTIALS</h2>
      <p className="subtitle">Best-sellers designed to challenge the norms!</p>

      <div className="home-scroll">
        {watches.map((item) => (
          <div
            className="watch-card"
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default HomeWatchList;