import React from 'react';

import '../styles/searchbar.css';

export default function SearchBar () {

    return (
        <div className="searchContainer">
            <input className="searchInput" type="text" placeholder="Search your Pokemon" />
        </div>
    );
}