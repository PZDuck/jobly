import React from "react";
import { Link } from "react-router-dom";

function Card({ data }) {
  if (data.handle) {
    return (
      <Link to={`companies/${data.handle}`}>
        <div>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to={`/jobs/${data.id}`}>
        <div>
          <h2>{data.title}</h2>
          <p>{data.company_handle}</p>
          <span>{data.salary}</span>
          <button>Learn More</button>
        </div>
      </Link>
    );
  }
}

export default Card;
