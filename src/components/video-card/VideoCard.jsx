import { useState } from "react";
import "./videoCard.css";

const VideoCard = ({ thumbnail, title, creatorName, creatorImage }) => {
  const getVideoTitleTrimmedToEightyChar = title => {
    if (title.length < 80) {
      return title;
    }
    return title.substr(0, 78) + "..";
  };
  const [showWatchLater, setShowLaterButton] = useState(false);
  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);

  return (
    <div
      className="video-card"
      onMouseOver={() => setShowLaterButton(true)}
      onMouseLeave={() => setShowLaterButton(false)}
    >
      <button
        className={`video-card-watch-later-btn btn ${
          showWatchLater ? "display-block" : "display-none"
        }`}
      >
        <i className="far fa-clock"></i>
      </button>

      <div className="video-card-image-container">
        <img
          className="responsive-img"
          src="https://i.ytimg.com/vi/iMVgvkVJuDI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBvU99zlZVetW12JDJFVPTRzhKlAg"
          alt="thumbnail"
        />
      </div>

      <div className="video-card-description-container">
        <div className="description-image-container">
          <img
            className="responsive-img rounded-img"
            src="https://yt3.ggpht.com/ytc/AKedOLTcIl6kKt3lEPJEySUf_hpHiKDKiFeo9eWPReLysQ=s68-c-k-c0x00ffffff-no-rj"
            alt=""
          />
        </div>

        <div className="text-description">
          <span className="description-heading text-semibold">
            {getVideoTitleTrimmedToEightyChar(
              "Time… a programmer's worst enemy // The Code Report"
            )}
          </span>
          <span>Fireship</span>
        </div>

        <div className="three-don-menu-container">
          <button
            className="three-don-menu-button"
            onClick={() => setShowThreeDotMenu(prevState => !prevState)}
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>

          {showThreeDotMenu && (
            <ul className="no-style-list video-card-option-list">
              <li className="grid-30-70">
                <i className="text-center fas fa-clock"></i>
                <span className="text-sm">Watch later</span>
              </li>
              <li className="grid-30-70">
                <i className="text-center fas fa-folder-plus"></i>
                <span className="text-sm">Save to playlist</span>
              </li>
              <li className="grid-30-70">
                <i className="text-center fas fa-share"></i>
                <span className="text-sm">Share</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
