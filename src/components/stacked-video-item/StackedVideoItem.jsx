import { Link } from "react-router-dom";
import { thumbnailLink } from "../../utils";
import "./stackedVideoItem.css";

const StackedVideoItem = ({ video, removeFunction, playlistId }) => {
  return (
    <div className="stacked-video-item">
      <Link to={`/explore/${video?._id}`} className="video-img-container">
        <img className="responsive-img" src={thumbnailLink(video?._id)} alt={video?.title} />
      </Link>

      <Link to={`/explore/${video?._id}`} className="video-description">
        {video?.title}
      </Link>

      <div className="video-cta">
        <button
          className="btn btn-outline"
          onClick={() =>
            playlistId ? removeFunction(playlistId, video?._id) : removeFunction(video?._id)
          }
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export { StackedVideoItem };
