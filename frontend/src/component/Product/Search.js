// import React, { Fragment ,useState} from 'react';
// import "./Search.css";
// import { useNavigate } from 'react-router-dom';
// import MetaData from '../layout/MetaData';

// const Search = () => {
//     const [keyword, setKeyword] = useState("");
//     const navigate = useNavigate();

//     const searchSubmitHandler = (e) => {
//         e.preventDefault();
//         if (keyword.trim()) {
//             navigate(`/products/${keyword}`);
//         } else {
//             navigate("/products");
//         }
//     };

//     return (
//         <Fragment>
//             <MetaData title="Search Product --ECOMMERCE" />
//             <form className="searchBox" onSubmit={searchSubmitHandler}>
//                 <input
//                     type="text"
//                     placeholder="Search a Product ..."
//                     onChange={(e) => setKeyword(e.target.value)}
//                 />
//                 <input type="submit" value="Search" />
//             </form>
//         </Fragment>
//     )
// }

// export default Search


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
