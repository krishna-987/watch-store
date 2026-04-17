import { useNavigate } from "react-router-dom";
import stories from "../data/stories";
import "./Stories.css";

function Stories() {
  const navigate = useNavigate();

  return (
    <div className="stories-page">

      <h2 className="heading">SEVENFRIDAY STORIES</h2>
      <p className="breadcrumb">Home / Sevenfriday Stories</p>

      <div className="stories-grid">
        {stories.map((item) => (
          <div
            key={item.id}
            className="story-card"
            onClick={() => navigate(`/story/${item.id}`)}
          >
            <img src={item.image} alt="" />

            <div className="story-content">
              <span className="date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>
                {item.desc || item.sections?.[0]?.content}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Stories;