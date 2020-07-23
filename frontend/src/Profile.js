import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Api from "./JoblyApi";
import LoggedInContext from "./LoggedInContext";

function Profile() {
  const INITIAL_STATE = {
    first_name: "",
    last_name: "",
    email: "",
    photo_url: "",
    password: "",
  };

  const { user, setUser } = useContext(LoggedInContext);
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    if (user)
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        photo_url: user.photo_url || "",
      });
  }, [user]);

  if (!user) return <Redirect to="/login" />;

  async function updateUser() {
    try {
      const resp = await Api.updateUser(user.username, formData);
      setUser(resp);
    } catch (err) {
      console.log(err);
    }
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
    e.target.password.value = "";
    updateUser();
  }

  if (!user) {
    return <h1>Loading...</h1>;
  } else
    return (
      <div className="Profile">
        <h1>Profile</h1>

        <div className="Profile-info">
          <ul>
            {Object.keys(user).map((key) => (
              <li>
                {`${key}`}: {user[key]}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="first_name"
            value={`${formData.first_name}`}
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={`${formData.last_name}`}
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
            value={`${formData.email}`}
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Photo URL"
            name="photo_url"
            value={`${formData.photo_url}`}
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Verify Password"
            name="password"
          />
          <button type="submit" name="button">
            Submit
          </button>
        </form>
      </div>
    );
}

export default Profile;
