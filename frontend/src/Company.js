import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "./JoblyApi";
import CompanyItem from "./CompanyItem";

function Company() {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  console.log(company);

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
        <CompanyItem
          name={company.name}
          description={company.description}
          num_employees={company.num_employees}
          jobs={company.jobs}
        />
      ) : (
        <div class="loading">Loading...</div>
      )}
    </div>
  );
}

export default Company;
