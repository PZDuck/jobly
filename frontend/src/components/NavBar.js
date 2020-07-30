import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LoggedInContext from "./LoggedInContext";
import "../styles/NavBar.css";

function NavBar() {
  const { loggedIn } = useContext(LoggedInContext);
  return (
    <nav className="NavBar">
      <div id="toggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <div className="NavBar-links">
          <div className="NavBar-links-general">
            <NavLink exact to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink exact to="/companies" className="nav-link">
              Companies
            </NavLink>
            <NavLink exact to="/jobs" className="nav-link">
              Jobs
            </NavLink>
          </div>
          <div className="NavBar-links-auth">
            {loggedIn === false ? (
              <>
                <NavLink exact to="/login">
                  Login
                </NavLink>
                <NavLink exact to="/register" className="nav-link">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink exact to="/profile" className="nav-link">
                  Profile
                </NavLink>
                <NavLink exact to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
