import { React, useState, useRef } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { IoClose } from "react-icons/io5";
import { BiSolidUserPin } from 'react-icons/bi';

import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Header.css";

import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import UserOptions from './UserOptions';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowSearch((prev) => !prev);

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
            <FaPersonWalkingLuggage style={{ color: location.pathname === "/" ? "white" : "black" }} size={25} />
          </div>
        </div>
        <ul className={`nav_links ${isOpen ? "active" : ""} ${isHomePage ? "white_nav_link" : ""}`}>
          <li><NavLink to="/" className="nav_item">Home</NavLink></li>
          <li><NavLink to="/products" className="nav_item">Products</NavLink></li>
          <li><NavLink to="/contact" className="nav_item">Contact</NavLink></li>
          <li><NavLink to="/about" className="nav_item">About</NavLink></li>

        </ul>

        <ul className={`nav_links ${isOpen ? "active" : ""} ${isHomePage ? "white_nav_link" : ""}`}>
          {/* <li><NavLink to="/search" className="nav_item"><ImSearch size={25} /></NavLink></li> */}
          <li ref={searchRef} className="nav_item nav_search_box_wrapper">
            {showSearch ? (
              <div className={`nav_search_input_wrapper ${showSearch ? 'slide-in' : 'slide-out'}`}>
                <input
                  type="text"
                  className="nav_search_input"
                  placeholder="Search..."

                />
                <button onClick={() => setShowSearch(false)} className="nav_search_inside_button">
                  <IoClose size={21} />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowSearch(true)} className="nav_search_button">
                <ImSearch size={21} />
              </button>
            )}
          </li>
          {/* <li><NavLink to="/cart" className="nav_item"><BsFillCartFill size={21} style={{ color: cartItems.length > 0 ? "#ff6600" : "unset" }} /></NavLink></li> */}
          <li className="nav_item cart_icon_wrapper">
            <NavLink to="/cart" className="cart_icon_link">
              <div className="cart_icon_container">
                <BsFillCartFill
                  size={21}
                  style={{ color: cartItems.length > 0 ? "rgb(255 159 0)" : "unset" }}
                />
                {cartItems.length > 0 && (
                  <span className="cart_count_tooltip">{cartItems.length}</span>
                )}
              </div>
            </NavLink>
          </li>
          <li><NavLink to="/login" className="nav_item"><BiSolidUserPin size={21} /></NavLink></li>


        </ul>

        {/* Mobile Menu Button */}
        <button className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {/* <div className={`search_bar_slide ${showSearch ? "show" : ""}`}>
        <input type="text" placeholder="Search products..." />
        <button onClick={() => setShowSearch(false)} className="close_search">×</button>
      </div> */}
    </nav>
  );
};

export default Header