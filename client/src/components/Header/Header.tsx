import logo from "../../assets/img/Logo.png";

import "./header.scss";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-frame">
        <img id="logo" src={logo} alt="logo icon" />
        <ul className="header-list">
          <li>Currently Showing</li>
          <li>Upcoming Movies</li>
        </ul>
      </div>
    </div>
  );
};
