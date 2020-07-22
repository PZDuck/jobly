import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import ItemCard from "./ItemCard";
import Api from "./JoblyApi";

function Companies() {
  const [searchParams, setSearchParams] = useState({
    search: "",
    min: 0,
    max: 2147483647,
  });
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    async function searchCompanies() {
      const companies = await Api.getCompanies(searchParams);
      setFilteredCompanies(companies);
    }

    searchCompanies();
  }, [searchParams]);

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
    <>
      <h1>Companies</h1>
      <SearchForm setSearchParams={setSearchParams} />
      <div className="Companies">
        {filteredCompanies.map((company) => {
          return <ItemCard key={company.handle} data={company} />;
        })}
      </div>
    </>
  );
}

export default Companies;
