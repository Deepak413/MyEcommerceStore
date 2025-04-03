import {React, useState} from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { BiSolidUserPin } from 'react-icons/bi';

import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Header.css"; 

import { FaPersonWalkingLuggage } from "react-icons/fa6";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isHomePage = location.pathname === "/";
  return (
    <nav className="navbar">
      <div className="navbar_container">

        <div className="navlogo_container">
          <div className={`nav_logo ${isHomePage ? "white_nav_link" : ""}`} >
            <NavLink to="/">SHOPPINGG</NavLink>
          </div>
          <div className={`nav_logo1 ${isHomePage ? "white_nav_logo1" : ""}`} >
            <NavLink to="/">KARO</NavLink>
            <FaPersonWalkingLuggage style={{ color: location.pathname === "/" ? "white" : "black" }}  size={35} />
          </div>
        </div>
        <ul className={`nav_links ${isOpen ? "active" : ""} ${isHomePage ? "white_nav_link" : ""}`}>
          <li><NavLink to="/" className="nav_item">Home</NavLink></li>
          <li><NavLink to="/products" className="nav_item">Products</NavLink></li>
          <li><NavLink to="/contact" className="nav_item">Contact</NavLink></li>
          <li><NavLink to="/about" className="nav_item">About</NavLink></li>

        </ul>

        <ul className={`nav_links ${isOpen ? "active" : ""} ${isHomePage ? "white_nav_link" : ""}`}>
          <li><NavLink to="/search" className="nav_item"><ImSearch size={30} /></NavLink></li>
          <li><NavLink to="/cart" className="nav_item"><BsFillCartFill size={30} /></NavLink></li>
          <li><NavLink to="/login" className="nav_item"><BiSolidUserPin size={30} /></NavLink></li>

        </ul>

        {/* Mobile Menu Button */}
        <button className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Header