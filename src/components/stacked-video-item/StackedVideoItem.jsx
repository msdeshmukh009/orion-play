import { Link } from "react-router-dom";
import { thumbnailLink } from "../../utils";
import "./stackedVideoItem.css";

const StackedVideoItem = ({ video, removeFunction, playlistId }) => {
  const { _id, title } = video;

  return (
    <div className="stacked-video-item">
      <Link to={`/explore/${video._id}`} className="video-img-container">
        <img className="responsive-img" src={thumbnailLink(_id)} alt="" />
      </Link>

      <Link to={`/explore/${video._id}`} className="video-description">
        {title}
      </Link>

      <div className="video-cta">
        <button
          className="btn btn-outline"
          onClick={() => (playlistId ? removeFunction(playlistId, _id) : removeFunction(_id))}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export { StackedVideoItem };
