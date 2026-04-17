import "./InfoBar.css";
import { FaLock, FaShippingFast, FaGlobe } from "react-icons/fa";

function InfoBar() {
  return (
    <div className="info-bar">

      <div className="info-item">
        <FaLock className="info-icon" />
        <h4>SECURE PAYMENTS</h4>
        <p>One time payments via SSL128 bit encryption.</p>
      </div>

      <div className="info-item">
        <FaShippingFast className="info-icon" />
        <h4>FREE EXPRESS SHIPPING</h4>
        <p>Delivery within 2–5 days depending on location.</p>
      </div>

      <div className="info-item">
        <FaGlobe className="info-icon" />
        <h4>IMPORT DUTIES INCLUDED</h4>
      </div>

    </div>
  );
}

export default InfoBar;