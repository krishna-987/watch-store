import { useEffect, useState } from "react";
import "./Slider.css";

import img1 from "../Components/banner1.webp";
import img2 from "../Components/banner2.webp";
import img3 from "../Components/banner3.webp";
import img4 from "../Components/banner4.webp";
import img5 from "../Components/banner5.webp";

const images = [img1, img2, img3, img4, img5];

function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="slider">

      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={i === index ? "slide active" : "slide"}
          alt=""
        />
      ))}

      <button className="prev" onClick={prev}>❮</button>
      <button className="next" onClick={next}>❯</button>

      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

    </div>
  );
}

export default Slider;