import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import LoggedInContext from "../LoggedInContext";
import { useLocalStorage } from "../../Hooks";
import "../../styles/Logout.css";

function Logout() {
  const [token, setToken, removeToken] = useLocalStorage("_token", "");
  const { loggedIn, setLoggedIn, setUser } = useContext(LoggedInContext);
  const history = useHistory();
  const logout = () => {
    removeToken("_token");
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
