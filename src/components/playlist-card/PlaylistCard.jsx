import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlaylist } from "../../context/playlistContext";
import { thumbnailLink } from "../../utils";
import "./playlistCard.css";

const PlaylistCard = ({ playlist }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { _id, title, videos } = playlist;
  const { deletePlaylist } = usePlaylist();

  return (
    <div className="playlist-card">
      <Link to={`/playlist/${playlist._id}`} className="playlist-card-img-container">
        <img
          className="responsive-img"
          src={
            videos?.length ? thumbnailLink(videos[0]?._id) : "/assets/undraw_going_up_re_86kg.svg"
          }
          alt={videos[0]?.title}
        />
        <div className="playlist-card-overlay-container flex-column flex-total-center">
          <span>{videos.length}</span>
          <span className="material-icons">playlist_play</span>
        </div>
      </Link>
      <div className="playlist-card-img-description">
        <Link to={`/playlist/${playlist._id}`} className="text-semibold">
          {title}
        </Link>
        <div className="three-dot-menu-container">
          <button
            className="three-don-menu-button"
            onClick={() => setShowOptions(prevState => !prevState)}
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          {showOptions && (
            <ul className="no-style-list video-card-option-list">
              <li className="grid-30-70" onClick={() => deletePlaylist(_id)}>
                <i className="text-center fas fa-trash"></i>
                <span className="text-sm">Delete Playlist</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export { PlaylistCard };
