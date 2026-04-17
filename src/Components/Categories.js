import { useNavigate } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  return (
    <div className="category-container">

      <div className="card" onClick={() => navigate("/shop/watches")}>
        <img src="/images/watch1.jpg" alt="watch" />
        <div className="overlay">
          <h2>WATCHES</h2>
          <p>With their iconic shapes, our watches combine our love of industrial design and the drive for originality that we are known for!</p>
        </div>
      </div>

      <div className="card" onClick={() => navigate("/shop/eyewear")}>
        <img src="/images/eye1.webp" alt="eyewear" />
        <div className="overlay">
          <h2>EYEWEAR</h2>
          <p>Stylish & modern looks</p>
        </div>
      </div>

      <div className="card" onClick={() => navigate("/shop/accessories")}>
        <img src="/images/acc1.jpg" alt="accessories" />
        <div className="overlay">
          <h2>ACCESSORIES</h2>
          <p>Complete your style</p>
        </div>
      </div>

    </div>
  );
}

export default Categories;