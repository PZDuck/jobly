import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LoggedInContext from "./LoggedInContext";

function NavBar() {
  const { loggedIn } = useContext(LoggedInContext);
  return (
    <div className="NavBar">
      <div className="NavBar-links">
        <NavLink exact to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink exact to="/companies" className="nav-link">
          Companies
        </NavLink>
        <NavLink exact to="/jobs" className="nav-link">
          Jobs
        </NavLink>
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
      <div className="NavBar-cover">
        <span>Welcome!</span>
      </div>
    </div>
  );
}

export default NavBar;
