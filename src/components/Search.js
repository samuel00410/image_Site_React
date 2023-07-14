import React, { useState } from "react";

const Search = ({ setInput, handleSearch }) => {
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input type="text" onChange={handleInput} />
      <button onClick={handleSearch}>搜尋</button>
    </div>
  );
};

export default Search;
