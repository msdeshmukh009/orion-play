import "./stackedVideoItem.css";

const StackedVideoItem = () => {
  return (
    <div className="stacked-video-item">
      <div className="video-img-container">
        <img
          className="responsive-img"
          src="https://i.ytimg.com/vi/SUelbSa-OkA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLY-TO3WwFzF840oOa9sJZmh-Bzg"
          alt=""
        />
      </div>
      <div className="video-description">
        LIFE BEYOND: Chapter 1. Alien life, deep time, and our place in cosmic history (4K)
      </div>
      <div className="video-cta">
        <button className="btn btn-outline">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export { StackedVideoItem };
