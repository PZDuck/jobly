import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import LoggedInContext from "./LoggedInContext";
import { useLocalStorage } from "./Hooks";

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

  return <button onClick={logout}>Logout</button>;
}

export default Logout;
