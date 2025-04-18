import { Link } from "react-router-dom";

import logo from "../../assets/img/Logo.png";

import "./header.scss";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-frame">
        <Link to="/" className="logo-link">
          <img className="header-logo" src={logo} alt="logo icon" />
        </Link>
        <ul className="header-list">
          <li>Currently Showing</li>
        </ul>
      </div>
    </div>
  );
};
