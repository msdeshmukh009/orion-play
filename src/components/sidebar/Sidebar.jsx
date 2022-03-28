import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <ul className="no-style-list sidebar-list">
      <li>
        <Link className="grid-30-70" to="/">
          <i className="fas fa-home"></i>
          <span className="text-left">Home</span>
        </Link>
      </li>
      <li>
        <Link className="grid-30-70" to="/">
          <i className="fas fa-compass"></i>
          <span className="text-left">Explore</span>
        </Link>
      </li>
      <li>
        <Link className="grid-30-70" to="/playlist">
          <i className="fas fa-folder-plus"></i>
          <span className="text-left">Playlists</span>
        </Link>
      </li>
      <li>
        <Link className="grid-30-70" to="/liked">
          <i className="fas fa-thumbs-up"></i>
          <span className="text-left">Liked Videos</span>
        </Link>
      </li>
      <li>
        <Link className="grid-30-70" to="/">
          <i className="fas fa-clock"></i>
          <span className="text-left">Watch later</span>
        </Link>
      </li>
      <li>
        <Link className="grid-30-70" to="/">
          <i className="fas fa-history"></i>
          <span className="text-left">History</span>
        </Link>
      </li>
    </ul>
  );
};

export { Sidebar };
