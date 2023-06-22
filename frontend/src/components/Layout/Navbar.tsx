import { Link } from "react-router-dom";
import "./Navbar.css";
import { useStore } from "../../store/useStore";
import Avatar from "@mui/material/Avatar";
import ProfileMenu from "../Homepage/ProfileMenu";
import { routeEnum } from "../../utils/enum";

const Navbar = () => {
  const { state, dispatch } = useStore();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={routeEnum.home} className="navbar-logo">
          Jitera Auction
        </Link>
        {!state.isAuthenticated && (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to={routeEnum.login} className="nav-links">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={routeEnum.signup} className="nav-links">
                Signup
              </Link>
            </li>
          </ul>
        )}
        {state.isAuthenticated && (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to={routeEnum.home} className="nav-links">
                Home
              </Link>
            </li>
            <li
              className="nav-item"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span>balance: {state.user.balance}</span>
              <span>
                <ProfileMenu />
              </span>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
