import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import ItemCard from "./ItemCard";
import Api from "./JoblyApi";

function Jobs() {
  const [searchParams, setSearchParams] = useState({
    search: "",
    min: 0,
    max: 2147483647,
  });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    async function searchJobs() {
      const jobs = await Api.getJobs(searchParams);
      setFilteredJobs(jobs);
    }

    searchJobs();
  }, [searchParams]);

  return (
    <>
      <h1>Jobs</h1>
      <SearchForm setSearchParams={setSearchParams} />
      <div className="Jobs">
        {filteredJobs.map((job) => {
          return <ItemCard key={job.id} data={job} />;
        })}
      </div>
    </>
  );
}

export default Jobs;
