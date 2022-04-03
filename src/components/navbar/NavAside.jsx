import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";
import "../sidebar/sidebar.css";

const NavAside = ({ navAside, setNavAside }) => {
  const {
    authState: {
      userDetails: { token },
    },
    logout,
  } = useAuth();
  return (
    <>
      <div
        className={`nav-aside-background ${navAside ? "show-nav-background" : ""}`}
        onClick={() => setNavAside(prevState => !prevState)}
      ></div>
      <div className={`nav-aside ${navAside ? "show-nav-aside" : ""}`}>
        <div className="nav-aside-head">
          <div className="nav-aside-user">
            <i className="fas fa-user"></i>
          </div>
          <i className="fas fa-times" onClick={() => setNavAside(prevStatus => !prevStatus)}></i>
        </div>
        <ul className="nav-aside-list no-style-list styled-list">
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive ? "nav-aside-link active-side-link" : "nav-aside-link"
              }
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/playlist"
              className={({ isActive }) =>
                isActive ? "nav-aside-link active-side-link" : "nav-aside-link"
              }
            >
              Playlists
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/liked"
              className={({ isActive }) =>
                isActive ? "nav-aside-link active-side-link" : "nav-aside-link"
              }
            >
              Liked Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watch-later"
              className={({ isActive }) =>
                isActive ? "nav-aside-link active-side-link" : "nav-aside-link"
              }
            >
              Watch later
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "nav-aside-link active-side-link" : "nav-aside-link"
              }
            >
              history
            </NavLink>
          </li>
          {!token ? (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive ? "nav-aside-link active-side-link" : "nav-aside-link"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "nav-aside-link active-side-link" : "nav-aside-link"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <li onClick={() => logout()}>Logout</li>
          )}
        </ul>
      </div>
    </>
  );
};

export { NavAside };
