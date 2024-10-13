import React, { useState } from "react";
import URL from "../../server";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState();
  const [searchResult, setSearchResult] = useState();
  const navigate = useNavigate();
  const searchData = async (e) => {
    e.preventDefault();
    try {
      await fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          const filteredProduct = data.filter((product) => {
            return product.name.toLowerCase().replace(/\s+/g, ' ').trim().includes(input.toLowerCase().replace(/\s+/g, ' ').trim());
          });
          setSearchResult(filteredProduct);
          navigate("/search-product", {state: filteredProduct });
        });
    } catch (err) {
      console.log("Error in Fetching Data");
    }
  };
  return (
    <form
      className="col-12 col-lg-auto mb-3 mb-lg-0"
      role="search"
      onSubmit={searchData}
    >
      <input
        type="search"
        className="form-control"
        placeholder="Search..."
        aria-label="Search"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </form>
  );
};

export default Search;
