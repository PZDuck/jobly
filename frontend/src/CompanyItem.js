import React from "react";
import ItemCard from "./ItemCard";

function CompanyItem({ name, description, num_employees, jobs }) {
  return (
    <div class="CompanyItem">
      <h1>{name}</h1>
      <p>{description}</p>
      <p>Number of employees: {num_employees}</p>
      {jobs ? jobs.map((job) => <ItemCard data={job} />) : <p>No jobs</p>}
    </div>
  );
}

export default CompanyItem;
