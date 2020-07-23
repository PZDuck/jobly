import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "./JoblyApi";
import ItemCard from "./ItemCard";

function Company() {
  const { handle } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    async function getCompany() {
      const company = await Api.getCompany(handle);
      setCompany(company);
    }
    getCompany();
  }, [handle]);

  return (
    <div className="Company">
      {company ? (
        <div className="CompanyItem">
          <h1>{company.name}</h1>
          <p>{company.description}</p>
          <p>Number of employees: {company.num_employees}</p>
          {company.jobs ? (
            company.jobs.map((job) => <ItemCard key={job.id} data={job} />)
          ) : (
            <p>No jobs</p>
          )}
        </div>
      ) : (
        <div class="loading">Loading...</div>
      )}
    </div>
  );
}

export default Company;
