import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      onSearch(searchTerm);
    }
  };

  return (
    <form>
      <div className="search-btn">
        <input
          type="text"
          placeholder="Enter Movie Name"
          className="inputText"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="submit" onClick={(e) => { e.preventDefault(); onSearch(searchTerm); }}>
          <i className="search">Search</i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
