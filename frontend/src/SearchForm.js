import React from "react";
import { DebounceInput } from "react-debounce-input";

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
    <DebounceInput
      debounceTimeout={1000}
      name="search"
      type="text"
      placeholder="Enter search term..."
      onChange={handleChange}
    />
  );
}

export default SearchForm;
