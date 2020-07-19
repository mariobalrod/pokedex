import React from "react";

import "../styles/searchbar.css";

export default function SearchBar(props) {
  return (
    <form className="searchContainer" onSubmit={props.handleSubmit}>
      <input
        className="searchInput"
        type="text"
        placeholder="Search your Pokemon"
        onChange={props.handleChange}
        value={props.searchTerm}
      />
    </form>
  );
}
