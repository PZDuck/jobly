import React, { useState, useContext } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import Api from "../../JoblyApi";
import LoggedInContext from "../LoggedInContext";
import { useLocalStorage } from "../../Hooks";
import "../../styles/Register.css";

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
    // <div>
    //   <h1>Register</h1>

    //     <button type="submit" name="button">
    //       Submit
    //     </button>
    //   </form>
    // </div>

    <div className="Register">
      <div className="Register-container">
        <div className="Register-left">
          <h1>Register</h1>
          <div className="Register-login">
            Already have an account? <Link to="/login">Log in!</Link>
          </div>
        </div>
        <div className="Register-right">
          <form className="Register-form" onSubmit={handleSubmit}>
            <label for="username">Username</label>
            <input onChange={handleChange} type="text" name="username" />
            <label for="password">Password</label>
            <input onChange={handleChange} type="password" name="password" />
            <label for="first_name">First Name</label>
            <input onChange={handleChange} type="text" name="first_name" />
            <label for="last_name">Last Name</label>
            <input onChange={handleChange} type="text" name="last_name" />
            <label for="email">Email</label>
            <input onChange={handleChange} type="text" name="email" />
            <button id="Register-submit" type="submit" name="button">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
