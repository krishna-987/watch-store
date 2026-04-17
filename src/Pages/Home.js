import Slider from "../Components/Slider";
import Categories from "../Components/Categories";
import InfoBar from "../Components/InfoBar";
import AboutSection from "../Components/AboutSection";
import HomeWatchList from "../Components/HomeWatchList";
import VipSection from "../Components/VipSection";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <Slider />
      <Categories />
      <InfoBar />
      <HomeWatchList />

      {/* FAQ */}
      <div
        className="faq-home-banner"
        onClick={() => navigate("/faq")}
      >
        <img src="/images/faq.webp" alt="FAQ" />
        <div className="faq-overlay">
          <h2>FAQ</h2>
          <p>Find answers & watch guide</p>
        </div>
      </div>

      <AboutSection />
      <VipSection />

    </div>
  );
}

export default Home;