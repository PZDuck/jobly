import React, { useState, useEffect, useContext } from "react";
import LoggedInContext from "./LoggedInContext";
import SearchForm from "./SearchForm";
import ItemCard from "./ItemCard";
import Unauthorized from "./auth/Unauthorized";
import Api from "../JoblyApi";
import ReactPaginate from "react-paginate";
import "../styles/Companies.css";

function Companies() {
  const { user } = useContext(LoggedInContext);
  const [pages, setPages] = useState(1);
  const [currentPageCompanies, setCurrentPageCompanies] = useState([]);
  const [searchParams, setSearchParams] = useState({
    search: "",
    min: 0,
    max: 2147483647,
  });
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const perPage = 12;

  useEffect(() => {
    async function searchCompanies() {
      try {
        const companies = await Api.getCompanies(searchParams);
        setFilteredCompanies(companies);
        setPages(Math.ceil(companies.length / perPage));
        setCurrentPageCompanies(companies.slice(0, perPage));
      } catch (err) {}
    }

    searchCompanies();
  }, [searchParams]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil((selected + 1) * perPage);
    setCurrentPageCompanies(
      filteredCompanies.slice(data.selected * perPage, offset)
    );
  };
  /**  
   * This method will make an axios request on every rerender (too many requests) 
  
   useEffect(() => {
    async function searchCompanies() {
      console.log(searchParams);
      const companies = await Api.getCompanies(searchParams);
      setCompanies(companies);
    }

    getAllCompanies();
  }, [searchParams]);
  
  */

  return (
    <div className="Companies">
      <h1>Companies</h1>
      {user ? (
        <>
          <SearchForm setSearchParams={setSearchParams} />
          {filteredCompanies.length ? (
            <>
              <div className="CompaniesItems">
                {currentPageCompanies.map((company) => {
                  return <ItemCard key={company.handle} data={company} />;
                })}
              </div>
              <ReactPaginate
                pageCount={pages}
                pageRangeDisplayed={12}
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

export default Companies;
