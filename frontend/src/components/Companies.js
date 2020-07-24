import React, { useState, useEffect, useContext } from "react";
import LoggedInContext from "./LoggedInContext";
import SearchForm from "./SearchForm";
import ItemCard from "./ItemCard";
import Unauthorized from "./auth/Unauthorized";
import Api from "../JoblyApi";

function Companies() {
  const { user } = useContext(LoggedInContext);
  const [searchParams, setSearchParams] = useState({
    search: "",
    min: 0,
    max: 2147483647,
  });
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    async function searchCompanies() {
      try {
        const companies = await Api.getCompanies(searchParams);
        setFilteredCompanies(companies);
      } catch (err) {
        console.log(err);
      }
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
      {user ? (
        <>
          <SearchForm setSearchParams={setSearchParams} />
          <div className="Companies">
            {filteredCompanies.length ? (
              filteredCompanies.map((company) => {
                return <ItemCard key={company.handle} data={company} />;
              })
            ) : (
              <div>Nothing found. Try another search parameter</div>
            )}
          </div>
        </>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default Companies;
