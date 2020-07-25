import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../JoblyApi";
import LoggedInContext from "./LoggedInContext";
import Unauthorized from "./auth/Unauthorized";
import "../styles/Profile.css";

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
    return <Unauthorized />;
  } else
    return (
      <div className="Profile">
        <div className="Profile-main">
          <img src={user.photo_url} />
          <h3>{user.username}</h3>
          <a className="btn" href="#open-modal">
            Edit info
          </a>

          <div className="Profile-info">
            <ul>
              <li>First Name: {user.first_name}</li>
              <li>Last Name: {user.last_name}</li>
              <li>Email: {user.email}</li>
            </ul>
          </div>

          {/* {Object.keys(user).map((key) =>
              key === "jobs" ? (
                <li>
                  {`${key}`}:{" "}
                  {Object.keys(user.jobs).map((id) => (
                    <div className="Profile-Job">
                      <Link to={`/jobs/${id}`}>
                        <span>{user.jobs[id].title}</span>
                        <br />
                        <span>{user.jobs[id].company_handle}</span>
                      </Link>
                    </div>
                  ))}
                </li>
              ) : (
                <li>
                  {`${key}`}: {user[key]}
                </li>
              )
            )} */}
        </div>

        <div className="Profile-applications">
          <h2>My Applications</h2>
          <div className="applications">
            {user.jobs
              ? Object.keys(user.jobs).map((id) => (
                  <div key={id} className="Profile-Job">
                    <Link to={`/jobs/${id}`}>
                      <h3>{user.jobs[id].title}</h3>{" "}
                      {user.jobs[id].state === "applied" ? (
                        <span className="applied">Applied</span>
                      ) : (
                        <span className="revoked">Revoked</span>
                      )}
                      <br />
                      <span className="company">
                        {user.jobs[id].company_handle}
                      </span>
                    </Link>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div id="open-modal" className="modal-window">
          <div className="Profile-form">
            <a href="#" title="Close" className="modal-close">
              Close
            </a>
            <label for="first_name">First Name</label>
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                type="text"
                placeholder="First Name"
                name="first_name"
                value={`${formData.first_name}`}
              />
              <label for="last_name">Last Name</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={`${formData.last_name}`}
              />
              <label for="email">Email</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Email"
                name="email"
                value={`${formData.email}`}
              />
              <label for="photo_url">Avatar</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Photo URL"
                name="photo_url"
                value={`${formData.photo_url}`}
              />
              <label for="password">Password</label>
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
        </div>
      </div>
    );
}

export default Profile;
