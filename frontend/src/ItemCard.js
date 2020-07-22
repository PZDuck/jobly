import React from "react";
import { NavLink } from "react-router-dom";

function Card({ data }) {
  if (data.handle) {
    return (
      <NavLink to={`companies/${data.handle}`} className="no-decoration">
        <div>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
      </NavLink>
    );
  } else {
    return (
      <div>
        <h2>{data.title}</h2>
        <p>{data.company_handle}</p>
        <span>{data.salary}</span>
        <button>Applied</button>
      </div>
    );
  }
}

export default Card;
