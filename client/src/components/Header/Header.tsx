import { NavLink } from "react-router-dom";
import { useState } from "react";

import { Authentication } from "../Authentication";
import { Button } from "../Button";
import logo from "../../assets/img/Logo.png";
import { ProfileDropdown } from "../ProfileDropdown";
import { useCurrentUser } from "../../hooks";

import "./header.scss";

export const Header = () => {
  const [authDrawerOpen, setAuthDrawerOpen] = useState<boolean>(false);
  const { data: currentUser, isLoading } = useCurrentUser();

  const isAuthenticated = !isLoading && !!currentUser;

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

        <div className="header-auth">
          {isLoading ? (
            <div className="loading-user">Loading...</div>
          ) : isAuthenticated ? (
            <ProfileDropdown username={currentUser.email.split("@")[0]} />
          ) : (
            <Button
              label="Sign In"
              variant="navbar"
              onClick={() => setAuthDrawerOpen(true)}
            />
          )}
        </div>

        <Authentication
          isOpen={authDrawerOpen}
          onClose={() => setAuthDrawerOpen(false)}
        />
      </div>
    </div>
  );
};
