import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import LoggedInContext from "../LoggedInContext";
import Api from "../../JoblyApi";

function Login() {
  const history = useHistory();
  const { token, setToken, loggedIn, setLoggedIn } = useContext(
    LoggedInContext
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if (loggedIn) {
    return <Redirect to="/logout" />;
  }

  async function login() {
    const _token = await Api.login(formData);

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
    <div className="LoginForm">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit" name="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
