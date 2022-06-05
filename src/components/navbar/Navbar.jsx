import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { useVideos } from "../../context/videosContext";
import { videosActions } from "../../reducers/actionTypes";
import { debounce } from "../../utils";

const { APPLY_SEARCH_TERM, SET_CATEGORY } = videosActions;

const Navbar = ({ setNavAside }) => {
  const {
    authState: {
      userDetails: { token },
    },
    logout,
  } = useAuth();

  const { videoDispatch } = useVideos();

  const pathname = useLocation();
  const navigate = useNavigate();

  const searchHandler = e => {
    pathname !== "/explore" ? navigate("/explore") : null;
    videoDispatch({ type: SET_CATEGORY, payload: "all" });
    debounce(() => videoDispatch({ type: "APPLY_SEARCH_TERM", payload: e.target.value }), 400)();
  };

  return (
    <nav className="nav-wrapper">
      <div className="nav">
        <header className="nav-header flex-total-center">
          <div className="burger-menu">
            <button className="btn btn-outline" onClick={() => setNavAside(true)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <Link to="/" className="nav-link">
            <h2 className="nav-heading">Orion</h2>
          </Link>
        </header>

        <div className="nav-search-bar">
          <input
            className="form-field"
            type="search"
            placeholder="Search..."
            onChange={searchHandler}
          />
        </div>

        <ul className="inline-style-list no-style-list nav-list flex-total-center ">
          <li className="nav-list-web-item">
            <Link className="link-btn" to="/explore">
              Explore
            </Link>
          </li>

          {token ? (
            <li className="nav-list-web-item">
              <button className="btn btn-outline" onClick={() => logout()}>
                <i className="fas fa-sign-out"></i>
              </button>
            </li>
          ) : (
            <li className="nav-list-web-item">
              <Link to="/signin" className="anchor-tag-badge-container user-icon">
                <i className="fas fa-user "></i> <span className="text-xs">Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="nav-search-bar mobile-search-bar">
        <input
          className="form-field"
          type="search"
          placeholder="Search..."
          onChange={searchHandler}
        />
      </div>
    </nav>
  );
};

export { Navbar };
