import "./AboutSection.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function AboutSection() {
  return (
    <div className="about-wrapper">

      {/* TOP SOCIAL SECTION */}
      <div className="live-section">
        <h2>#LIVESEVENFRIDAY</h2>

        <p>
          "Show Me Don’t Tell Me" is our motto. Join the community and share your
          #liveSEVENFRIDAY experience online.
        </p>

        {/* ✅ FIXED ICONS (CLICKABLE) */}
        <div className="icons">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about-section">

        <div className="about-text">
          <h2>ABOUT US</h2>

          <p>
            SEVENFRIDAY is a global lifestyle brand that creates industrial-inspired
            watches, eyewear, apparel, and accessories for individuals around the
            world who live every day like it's Friday.
          </p>

          <p>
            Challenging the norms within the industry according to our own beliefs,
            dreams, and experiences, SEVENFRIDAY is more than a brand — it's a life attitude.
          </p>
        </div>

        <div className="about-image">
          <img src="/images/about.webp" alt="about" />
        </div>

      </div>

    </div>
  );
}

export default AboutSection;