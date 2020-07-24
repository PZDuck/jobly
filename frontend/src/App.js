import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import NavBar from "./components/NavBar";
import LoggedInContext from "./components/LoggedInContext";
import "./styles/App.css";
import { useLocalStorage } from "./Hooks";

// REVISIT
import Api from "./JoblyApi";
import JWTDecode from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useLocalStorage("_token", "");

  // In case a user refreshes the page thus forcing the App component to rerender
  // REVISIT; should be another way of accomplishing the same result
  useEffect(() => {
    if (token) {
      setLoggedIn(true);

      async function getUser() {
        setUser(await Api.getUser(JWTDecode(token).username));
      }

      getUser();
    }
  }, [token]);

  return (
    <div className="App">
      <LoggedInContext.Provider
        value={{ user, setUser, loggedIn, setLoggedIn, token, setToken }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
