import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Api from "../../JoblyApi";
import LoggedInContext from "../LoggedInContext";
import { useLocalStorage } from "../../Hooks";

function Register() {
  const history = useHistory();
  const [token, setToken, removeToken] = useLocalStorage("_token", "");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const { user, setUser, loggedIn, setLoggedIn } = useContext(LoggedInContext);

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  async function register() {
    const tkn = await Api.register(formData);
    setToken(tkn);
    const user = await Api.getUser(formData.username);
    setUser(user);
    setLoggedIn(true);

    history.push("/login");
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
    register();

    e.target.username.value = "";
    e.target.password.value = "";
    e.target.first_name.value = "";
    e.target.last_name.value = "";
    e.target.email.value = "";
  }

  return (
    <div>
      <h1>Register</h1>
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
        <input
          onChange={handleChange}
          type="text"
          name="first_name"
          placeholder="First Name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="last_name"
          placeholder="Last Name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="Email Address"
        />
        <button type="submit" name="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
