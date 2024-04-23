import React from 'react';
import SearchBar from './SearchBar';
import './Navbar.css';
import { Link } from 'react-router-dom'; 

const Navbar = ({ categories, onCategoryClick, onSearch }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Movie</span>
      </div>
      <nav className="navbar-center">
        <ul>
          {categories.map((category, index) => (
            <li key={index} onClick={() => onCategoryClick(category)}>
              <a href={`#${category}`} onClick={() => onCategoryClick(category)}>{category}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="navbar-right">
        <SearchBar onSearch={onSearch}  />
        <div className="user-options">
         
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
