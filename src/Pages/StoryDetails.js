import { useParams, useNavigate } from "react-router-dom";
import stories from "../data/stories";
import "./StoryDetails.css";

function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const story = stories.find(
    (item) => item.id === Number(id)
  );

  if (!story) return <h2>Not found</h2>;

  return (
    <div className="story-page">

      {/* HEADER */}
      <div className="story-header">
        <h2>SEVENFRIDAY STORIES</h2>
        <p className="breadcrumb">
          Home / Stories / {story.title}
        </p>
      </div>

      <div className="story-layout">

        {/* LEFT SIDEBAR */}
        <div className="sidebar">
          <h4>RECENT POSTS</h4>

          {stories.map((item) => (
            <div
              key={item.id}
              className="side-item"
              onClick={() => navigate(`/story/${item.id}`)}
            >
              <p>{item.title}</p>
              <span>{item.date}</span>
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="main">

          {/* HERO IMAGE */}
          {story.image && (
            <img
              src={story.image}
              alt={story.title}
              className="hero-img"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/600")
              }
            />
          )}

          {/* TITLE */}
          <h1 className="title">{story.title}</h1>
          <p className="date">{story.date}</p>

          {/* DESCRIPTION */}
          {story.desc && (
            <p className="desc">{story.desc}</p>
          )}

          {/* ✅ SECTIONS (for story 2 video/text) */}
          {story.sections?.map((section, index) => {
            if (section.type === "text") {
              return (
                <p key={index} className="desc">
                  {section.content}
                </p>
              );
            }

            if (section.type === "image") {
              return (
                <img
                  key={index}
                  src={section.src}
                  alt=""
                  className="extra-img"
                />
              );
            }
if (section.type === "video") {
    return (
      <iframe
        key={index}
        src={section.src}
        title="YouTube video"
        className="video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

  return null;
})}

          {/* EXTRA IMAGES (for story 1) */}
          {story.extraImages?.map((item, i) => (
            <div key={i} className="extra-block">
              <img
                src={item.img}
                alt=""
                className="extra-img"
              />
              <p className="extra-text">{item.text}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default StoryDetails;