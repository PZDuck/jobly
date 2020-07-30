import React from "react";
import { Link } from "react-router-dom";
import "../styles/ItemCard.css";

function Card({ data }) {
  if (data.handle) {
    return (
      <div className="CompanyItemCard">
        <Link to={`companies/${data.handle}`}>
          <div>
            <h2>{data.name}</h2>
            <hr />
            <p>{data.description}</p>
          </div>
          <div>
            <button>More</button>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="JobItemCard">
        <div>
          <h2>{data.title}</h2>
          <Link
            to={`/companies/${data.company_handle}`}
            className="JobItem-company"
          >
            {data.company_name ? (
              <>
                <span className="icon"></span>
                <h3>{data.company_name}</h3>
              </>
            ) : null}
          </Link>
          <span>Expected Salary: {data.salary}</span>
        </div>
        <div>
          <Link to={`/jobs/${data.id}`} className="JobItem-btn">
            Apply
          </Link>
        </div>
      </div>
    );
  }
}

export default Card;
