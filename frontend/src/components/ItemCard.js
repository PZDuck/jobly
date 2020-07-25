import React from "react";
import { Link } from "react-router-dom";
import "../styles/ItemCard.css";

function Card({ data }) {
  if (data.handle) {
    return (
      <div className="CompanyItemCard">
        <Link to={`companies/${data.handle}`}>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <button>More</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="JobItemCard">
        <h2>{data.title}</h2>
        <Link
          to={`/companies/${data.company_handle}`}
          className="JobItem-company"
        >
          <span className="icon"></span>
          <h3>{data.company_name}</h3>
        </Link>
        <span>Expected Salary: {data.salary}</span>

        <Link to={`/jobs/${data.id}`} className="JobItem-btn">
          Apply
        </Link>
      </div>
    );
  }
}

export default Card;
