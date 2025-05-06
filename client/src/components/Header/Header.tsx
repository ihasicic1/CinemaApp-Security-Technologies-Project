import { NavLink } from "react-router-dom";

import logo from "../../assets/img/Logo.png";
import "./header.scss";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-frame">
        <NavLink to="/" className="logo-link">
          <img className="header-logo" src={logo} alt="logo icon" />
        </NavLink>
        <ul className="header-list">
          <li>
            <NavLink
              to="/currently-showing"
              className={({ isActive }) => `link${isActive ? " isActive" : ""}`}
            >
              Currently Showing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upcoming"
              className={({ isActive }) => `link${isActive ? " isActive" : ""}`}
            >
              Upcoming Movies
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
