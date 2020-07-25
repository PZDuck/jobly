import React from "react";
import { DebounceInput } from "react-debounce-input";
import "../styles/Search.css";

function SearchForm({ setSearchParams }) {
  const handleChange = (e) => {
    e.persist();
    setSearchParams((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setSearchParams(formData);
  //   e.target.search.value = "";
  // }

  return (
    <div className="wrapper">
      <div className="input-group">
        <DebounceInput
          className="Search"
          debounceTimeout={1000}
          name="search"
          type="text"
          placeholder="Enter search term..."
          onChange={handleChange}
        />
        <span className="bar"></span>
      </div>
    </div>
  );
}

export default SearchForm;
