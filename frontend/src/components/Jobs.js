import React, { useState, useEffect, useContext } from "react";
import LoggedInContext from "./LoggedInContext";
import SearchForm from "./SearchForm";
import ItemCard from "./ItemCard";
import Api from "../JoblyApi";
import Unauthorized from "./auth/Unauthorized";
import "../styles/Jobs.css";

function Jobs() {
  const { user } = useContext(LoggedInContext);
  const [searchParams, setSearchParams] = useState({
    search: "",
    min: 0,
    max: 2147483647,
  });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    async function searchJobs() {
      try {
        const jobs = await Api.getJobs(searchParams);
        setFilteredJobs(jobs);
      } catch (err) {
        console.log(err);
      }
    }

    searchJobs();
  }, [searchParams]);

  return (
    <div className="Jobs">
      <h1>Jobs</h1>
      {user ? (
        <>
          <SearchForm setSearchParams={setSearchParams} />
          <div className="JobsItems">
            {filteredJobs.length ? (
              filteredJobs.map((job) => {
                return <ItemCard key={job.id} data={job} />;
              })
            ) : (
              <div>Nothing Found. Try another search parameter</div>
            )}
          </div>
        </>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
}

export default Jobs;
