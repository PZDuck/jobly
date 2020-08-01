import React, { useState, useEffect, useContext } from "react";
import { LoggedInContext } from "./LoggedInContext";
import SearchForm from "./SearchForm";
import ItemCard from "./ItemCard";
import Api from "../JoblyApi";
import Unauthorized from "./auth/Unauthorized";
import ReactPaginate from "react-paginate";
import "../styles/Jobs.css";

function Jobs() {
  const { user } = useContext(LoggedInContext);
  const [pages, setPages] = useState(1);
  const [currentPageJobs, setCurrentPageJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    search: "",
    min: 0,
    max: 2147483647,
  });
  const [filteredJobs, setFilteredJobs] = useState([]);
  const perPage = 12;

  useEffect(() => {
    async function searchJobs() {
      try {
        const jobs = await Api.getJobs(searchParams);
        setFilteredJobs(jobs);
        setPages(Math.ceil(jobs.length / perPage));
        setCurrentPageJobs(jobs.slice(0, perPage));
      } catch (err) {}
    }

    searchJobs();
  }, [searchParams]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil((selected + 1) * perPage);
    setCurrentPageJobs(filteredJobs.slice(data.selected * perPage, offset));
  };

  return (
    <div className="Jobs">
      <h1>Jobs</h1>
      {user ? (
        <>
          <SearchForm setSearchParams={setSearchParams} />
          {filteredJobs.length ? (
            <>
              <div className="JobsItems">
                {currentPageJobs.map((job) => {
                  return <ItemCard key={job.id} data={job} />;
                })}
              </div>
              <ReactPaginate
                pageCount={pages}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                containerClassName={"pagination"}
                previousLabel={"<"}
                nextLabel={">"}
                onPageChange={handlePageClick}
                activeClassName={"pagination-active"}
              />
            </>
          ) : (
            <div className="not-found">
              <p>Nothing found. Try another search parameter</p>
            </div>
          )}
        </>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
}

export default Jobs;
