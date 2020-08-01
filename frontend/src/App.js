import React, { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import NavBar from "./components/NavBar";
import { LoggedInContext } from "./components/LoggedInContext";
import "./styles/App.css";

//  REVISIT
// import Api from "./JoblyApi";
// import JWTDecode from "jwt-decode";

function App() {
  //   const [user, setUser] = useState(null);
  //   const [loggedIn, setLoggedIn] = useState(false);
  //   const [token, setToken] = useLocalStorage("_token", "");

  const { login, token } = useContext(LoggedInContext);

  // In case a user refreshes the page thus forcing the App component to rerender
  // REVISIT; should be another way of accomplishing the same result
  useEffect(() => {
    login();
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
