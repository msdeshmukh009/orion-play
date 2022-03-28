import { useState } from "react";
import { Link } from "react-router-dom";
import { thumbnailLink } from "../../utils";
import "./videoCard.css";

const VideoCard = ({ video }) => {
  const { _id, title, creator, creatorImg } = video;
  const getVideoTitleTrimmedToEightyChar = title => {
    if (title.length < 80) {
      return title;
    }
    return title.substr(0, 78) + "..";
  };

  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);

  return (
    <div className="video-card">
      <Link to={`/explore/${_id}`} className="video-card-image-container">
        <img className="responsive-img" src={thumbnailLink(_id)} alt={title} />
      </Link>

      <div className="video-card-description-container">
        <div className="description-image-container">
          <img className="responsive-img rounded-img" src={creatorImg} alt={creator} />
        </div>

        <div>
          <Link to={`/explore/${_id}`} className="text-description">
            <span className="description-heading text-semibold">
              {getVideoTitleTrimmedToEightyChar(title)}
            </span>
            <span className="text-xs text-semibold text-gray">{creator}</span>
          </Link>
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
