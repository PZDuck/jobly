import React, { useState, useContext } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import LoggedInContext from "../LoggedInContext";
import Api from "../../JoblyApi";
import "../../styles/Login.css";

function Login() {
  const history = useHistory();
  const { setToken, loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if (loggedIn) {
    return <Redirect to="/logout" />;
  }

  async function login() {
    let _token;

    try {
      _token = await Api.login(formData);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      return;
    }

    setToken(_token);
    setLoggedIn(true);

    history.push("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    login();

    e.target.username.value = "";
    e.target.password.value = "";
  }

  return (
    <div className="Login">
      <div className="Login-container">
        <div className="Login-left">
          <h1>Login</h1>
          <div className="Login-register">
            First time visiting? <Link to="/login">Create an account!</Link>
          </div>
        </div>
        <div className="Login-right">
          <form className="Login-form" onSubmit={handleSubmit}>
            <label for="username">Username</label>
            <input onChange={handleChange} type="text" name="username" />
            <label for="password">Password</label>
            <input onChange={handleChange} type="password" name="password" />
            {status === "error" ? (
              <div className="error">
                Incorrect Username/Password. Please try again
              </div>
            ) : null}
            <button id="Login-submit" type="submit" name="button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
