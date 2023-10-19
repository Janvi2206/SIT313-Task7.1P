
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Deakin from './Deakin.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="logo">DEVDeakin</h1>
            <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="header-button" >Post</button>
            <Link to="/Login">
                <button className="header-button">Login</button>
            </Link>
          </div>
          <img
            src={Deakin} // Import the image using require
            alt="Deakin" // Provide alt text for accessibility
            className="header-image"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
