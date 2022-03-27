import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <header className="nav-header flex-total-center">
        <div className="burger-menu">
          <button className="btn btn-outline">
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <a to="/" className="nav-link">
          <h2 className="nav-heading">Orion</h2>
        </a>
      </header>

      <div className="nav-search-bar">
        <button className="btn">
          <i className="fas fa-search"></i>
        </button>
        <input className="form-field" type="search" placeholder="search" />
      </div>

      <ul className="inline-style-list no-style-list nav-list flex-total-center ">
        <li className="nav-list-web-item">
          <a className="link-btn" href="/">
            Explore
          </a>
        </li>

        <li className="nav-list-web-item">
          <Link to="/signin" className="anchor-tag-badge-container user-icon">
            <i className="fas fa-user "></i> <span className="text-xs">Login</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
