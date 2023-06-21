import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Logo
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/home" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-links">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
