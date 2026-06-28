import { React, useState, useRef, useEffect } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { IoClose } from "react-icons/io5";
import { BiSolidUserPin } from 'react-icons/bi';

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Header.css";

import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import UserOptions from './UserOptions';
import { BiLogIn } from "react-icons/bi";
import { FaGreaterThan } from "react-icons/fa6";
import { MdOutlineHome } from "react-icons/md";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaTag } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("isOpen in Header.js : ", isOpen);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowSearch((prev) => !prev);

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {

    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword.trim()) {
        navigate(`/products/${keyword}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, navigate]);

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
            <FaPersonWalkingLuggage className='logo_icon' style={{ color: location.pathname === "/" ? "white" : "black" }} />
          </div>
        </div>

        <div className={`nav_links_container ${isOpen ? "active" : ""}`}>
          <ul className={`nav_links nav_links_left ${isOpen ? "active" : ""} ${isHomePage ? "white_nav_link" : ""}`}>
            <li><NavLink to="/" className="nav_item" onClick={() => setIsOpen(false)}><MdOutlineHome className='navbar_icon' /> Home <FaGreaterThan className='navbar_greater_icon' /> </NavLink></li>
            <li><NavLink to="/products" className="nav_item" onClick={() => setIsOpen(false)}><IoFileTrayStackedOutline className='navbar_icon' /> Products <FaGreaterThan className='navbar_greater_icon' /> </NavLink></li>
            <li><NavLink to="/contact" className="nav_item" onClick={() => setIsOpen(false)}><MdCall className='navbar_icon' /> Contact <FaGreaterThan className='navbar_greater_icon' /> </NavLink></li>
            <li><NavLink to="/about" className="nav_item" onClick={() => setIsOpen(false)}><RiErrorWarningLine className='navbar_icon' /> About <FaGreaterThan className='navbar_greater_icon' /> </NavLink></li>

          </ul>

          <ul className={`nav_links nav_links_right ${isOpen ? "active" : ""} ${isHomePage ? "white_nav_link" : ""}`}>
            <li ref={searchRef} className="nav_item nav_search_box_wrapper">
              {showSearch ? (
                <div className={`nav_search_input_wrapper ${showSearch ? 'slide-in' : 'slide-out'}`}>
                  <input
                    type="text"
                    className="nav_search_input"
                    placeholder="Search here..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button onClick={searchSubmitHandler} className="nav_search_inside_button">
                    <ImSearch size={16} />
                  </button>
                  <button onClick={() => setShowSearch(false)} className="nav_search_inside_button1">
                    <IoClose size={21} />
                  </button>
                </div>
              ) : (

                <button onClick={() => setShowSearch(true)} className={`${isHomePage ? "nav_search_button_white" : "nav_search_button"}`}>
                  <div className='navbar_quick_action_icon_wrapper'><ImSearch className='navbar_quick_action_icon icon' /> </div>

                  <div className='navbar_quick_action_text'>Search Products</div>
                  <FaGreaterThan className='navbar_greater_icon' />
                </button>
              )}
            </li>
            <li className="nav_item cart_icon_wrapper">
              <NavLink to="/cart" className="cart_icon_link" onClick={() => setIsOpen(false)}>
                <div className="cart_icon_container">
                  <div className='navbar_quick_action_icon_wrapper'>
                    <BsFillCartFill
                      className='cart_icon icon navbar_quick_action_icon'
                      style={{
                        color: cartItems.length > 0
                          ? "rgb(255 159 0)"
                          : isHomePage
                            ? "white"
                            : "black"
                      }}
                    />
                  </div>
                  <div className='navbar_quick_action_text'>My Cart</div>
                  {cartItems.length == 0 && (
                    <FaGreaterThan className='navbar_greater_icon' />
                  )}

                  {cartItems.length > 0 && (
                    <span className="cart_count_tooltip">{cartItems.length}</span>
                  )}
                </div>
              </NavLink>
            </li>
            {isAuthenticated ?
              <li className="nav_item nav_account_login_wrapper"><NavLink to="/login" className="nav_item" onClick={() => setIsOpen(false)}><div className='navbar_quick_action_icon_wrapper'><BiSolidUserPin className='navbar_quick_action_icon' /></div> <div className='navbar_quick_action_text'> My Account</div> <FaGreaterThan className='navbar_greater_icon' /> </NavLink></li>
              :
              <li className="nav_item nav_account_login_wrapper"><NavLink to="/login" className="nav_item" onClick={() => setIsOpen(false)}><div className='navbar_quick_action_icon_wrapper'><BiLogIn className='navbar_quick_action_icon' /></div> <div className='navbar_quick_action_text'>Login / Register</div> <FaGreaterThan className='navbar_greater_icon' /> </NavLink></li>}
          </ul>
          <div className="mobile_deals_card">
            <div className="mobile_deals_left">
              <div className="mobile_deals_icon">
                <FaTag />
              </div>

              <div className="mobile_deals_text">
                <h3>Latest Deals</h3>
                <p>
                  Grab offers.
                </p>
              </div>
            </div>

            <button
              className="mobile_deals_btn"
              onClick={() => {
                navigate("/products");
                setIsOpen(false);
              }}
            >
              Shop Now
              <FaGreaterThan />
            </button>
          </div>
        </div>

        <button className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FiX style={{ color: "#ffaa2c" }} /> : <FiMenu style={{ color: "#ffaa2c" }} />}
        </button>
      </div>
    </nav>
  );
};

export default Header