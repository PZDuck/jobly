import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoggedInContext } from "../LoggedInContext";
import "../../styles/Logout.css";

function Logout() {
  const {
    setLoggedIn,
    setUser,
    removeToken,
    removeTokenTimestamp,
  } = useContext(LoggedInContext);
  const history = useHistory();

  const logout = () => {
    removeToken();
    removeTokenTimestamp();
    setLoggedIn(false);
    setUser(null);
    history.push("/");
  };

  return (
    <div className="Logout">
      <div className="Logout-text">
        <h2>Please confirm your action</h2>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
