import { useLikes } from "../../context";
import { thumbnailLink } from "../../utils";
import "./stackedVideoItem.css";

const StackedVideoItem = ({ video }) => {
  const { _id, title } = video;

  const { removeFromLike } = useLikes();

  const getVideoTitleTrimmedToEightyChar = title =>
    title.length < 50 ? title : title.substr(0, 48) + "..";

  return (
    <div className="stacked-video-item">
      <div className="video-img-container">
        <img className="responsive-img" src={thumbnailLink(_id)} alt="" />
      </div>
      <div className="video-description">{getVideoTitleTrimmedToEightyChar(title)}</div>
      <div className="video-cta">
        <button className="btn btn-outline" onClick={() => removeFromLike(_id)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export { StackedVideoItem };
