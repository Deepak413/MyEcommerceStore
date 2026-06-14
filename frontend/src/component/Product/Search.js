import React, { useState } from "react";
import "./Search.css"; // Import CSS
import { FaSearch, FaTimes } from "react-icons/fa";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Search Icon in Navbar */}
      <div className="search_icon" onClick={toggleSearch}>
        <FaSearch size={22} />
      </div>

      {/* Search Overlay */}
      <div className={`search_overlay ${isOpen ? "open" : ""}`}>
        <div className="search_box">
          <button className="close_btn" onClick={toggleSearch}>
            <FaTimes size={22} />
          </button>
          <h2>Search Products</h2>
          <input type="text" placeholder="Search for gadgets..." autoFocus />
        </div>
      </div>
    </>
  );
};

export default Search;
