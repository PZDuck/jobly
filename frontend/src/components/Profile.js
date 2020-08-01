import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../JoblyApi";
import { LoggedInContext } from "./LoggedInContext";
import Unauthorized from "./auth/Unauthorized";
import userIcon from "../img/user.png";
import "../styles/Profile.css";

function Profile() {
  const INITIAL_STATE = {
    first_name: "",
    last_name: "",
    email: "",
    photo_url: "",
    password: "",
  };

  const { user } = useContext(LoggedInContext);
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

  async function updateUser() {
    try {
      await Api.updateUser(user.username, formData);
    } catch (err) {}
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
    window.location.reload();
  }

  if (!user) {
    return <Unauthorized />;
  } else
    return (
      <div className="Profile">
        <div className="Profile-main">
          <img src={user.photo_url ? user.photo_url : userIcon} />
          <h3>{user.username}</h3>
          <a href="#open-modal" className="btn">
            Edit info
          </a>

          <div className="Profile-info">
            <ul>
              <li>
                <span>First Name:</span> {user.first_name}
              </li>
              <li>
                <span>Last Name:</span> {user.last_name}
              </li>
              <li>
                <span>Email:</span> {user.email}
              </li>
            </ul>
          </div>
        </div>
        <div className="Profile-applications">
          {Object.keys(user.jobs).length ? (
            <>
              <h2>My Applications</h2>
              <div className="applications">
                {Object.keys(user.jobs).map((id) => (
                  <div key={id} className="Profile-Job">
                    <Link className="Job-Link" to={`/jobs/${id}`}>
                      <h3>{user.jobs[id].title}</h3>
                    </Link>
                    <span className="company">
                      Expected salary: {user.jobs[id].salary}
                    </span>
                    {user.jobs[id].state === "applied" ? (
                      <span className="status applied">Applied</span>
                    ) : (
                      <span className="status revoked">Revoked</span>
                    )}
                    <br />
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div id="open-modal" className="modal-window">
          <div className="modal-form">
            <a href="#" title="Close" className="modal-close">
              Close
            </a>
            <h2>Edit Profile Information</h2>
            <form className="Profile-form" onSubmit={handleSubmit}>
              <label htmlFor="first_name">First Name</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="First Name"
                name="first_name"
                value={`${formData.first_name}`}
              />
              <label htmlFor="last_name">Last Name</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={`${formData.last_name}`}
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Email"
                name="email"
                value={`${formData.email}`}
              />
              <label htmlFor="photo_url">Avatar</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Photo URL"
                name="photo_url"
                value={`${formData.photo_url}`}
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type="password"
                placeholder="Verify Password"
                name="password"
                required
              />
              <button id="submit" type="submit" name="button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Profile;
