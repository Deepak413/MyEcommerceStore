import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import { Link, NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Slider from "@mui/material/Slider";
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import './FilterBoxDrawer.css';
import Box from '@mui/material/Box';
import 'react-toastify/ReactToastify.css';
import Typography from "@mui/material/Typography";
import MetaData from '../layout/MetaData';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { RxReset } from "react-icons/rx";

function valuetext(value) {
    return `${value}₹`;
}

const categories = [
    "Laptop",
    "Tablet",
    "Phone",
    "Watch",
    "Monitor",
    "Tv",
    "Earphone",
];

const Products = ({ match }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState(new URLSearchParams(window.location.search).get("category") || "");
    const [ratings, setRatings] = useState(0);

    const [tempPrice, setTempPrice] = useState([0, 200000]); // for slider state - to make API call when user clicks on button

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products)

    const params = useParams();
    const keyword = params.keyword === undefined ? "" : params.keyword;

    console.log("products in Productsjs", products);

    const [selectedSortOption, setSelectedSortOption] = useState('default');

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSelectedSortOption(value);
        console.log("selectedSortOption called in Productsjs : ", selectedSortOption);
        setCurrentPage(1);
    };

    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    const toggleFilterBox = () => setIsFilterBoxOpen(!isFilterBoxOpen);

    const handleFilterButton = () => {
        toggleFilterBox();
    }
    const handleResetButton = (e) => {
        console.log("handleResetButton called in Product.js");
        setCategory("");
        setRatings(0);
        setPrice([0, 200000]);
        setTempPrice([0, 200000]);
        setSearchTerm("");
        setCurrentPage(1);
        setSelectedSortOption("-createdAt");
        console.log("Filters reset done.");
    }

    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchFilterSubmit = (e) => {
        console.log("handleSearchFilterSubmit called in Product.js");
        e.preventDefault();
        toggleFilterBox();
        let searchTermTemp = searchTerm;
        console.log("searchTermTemp in handleSearchFilterSubmit in Product.js : ", searchTermTemp);
        setSearchTerm("");
        if (searchTermTemp.trim()) {
            navigate(`/products/${searchTermTemp}`);
        } else {
            navigate("/products");
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        setCategory(params.category === undefined ? "" : params.category);
    }, [keyword]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryFromUrl = queryParams.get("category");

        setCategory(categoryFromUrl || "");
        setCurrentPage(1);
        console.log("category in useEffect1 : ", categoryFromUrl);
    }, [location.search]);

    useEffect(() => {
        console.log("API Call Category in useEffect2:", category);
        if (error) {
            console.log("getting error in Product.js useEffct2");
            toast.error(error);
            dispatch(clearErrors());
        }
        
        dispatch(getProduct(keyword, currentPage, price, category, ratings, selectedSortOption));
    }, [dispatch, keyword, currentPage, price, category, ratings, selectedSortOption, error]);

    const handleCategoryFilterClick = (category) => {
        setCategory(category);
        console.log("Selected category:", category);
        console.log("filteredProductsCount after category filter click : ", filteredProductsCount);
        setCurrentPage(1);
        toggleFilterBox();
    };

    const handleRatingFilterClick = (newRating) => {
        setRatings(newRating);
        console.log("Selected Rating:", newRating);
        console.log("filteredProductsCount after newRating filter click : ", filteredProductsCount);
        setCurrentPage(1);
        toggleFilterBox();
    }

    const handlePriceFilterBtnClick = () => {
        console.log("handlePriceFilterBtnClick called in Product.js");
        setPrice(tempPrice);
        setCurrentPage(1);
        toggleFilterBox();
    };


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="PRODUCTS --ECOMMERCE" />
                <div className="productsContainer">
                    <div className="productsBox">
                        <div className='filterContainer'>
                            <div className='filterButtonsContainer'>
                                <NavLink onClick={handleFilterButton}>
                                    <HiOutlineAdjustmentsHorizontal className="filterIcon" size={17} />
                                    <span>FILTER</span>
                                </NavLink>
                                <NavLink to="/products" onClick={handleResetButton}>
                                    <RxReset className="filterIcon" size={17} />
                                    <span>RESET</span>
                                </NavLink>
                            </div>

                            <div className="sortDropdown">
                                <select id="sort" value={selectedSortOption} onChange={handleSortChange}>
                                    <option value="">Featured</option>
                                    <option value="price">Price: Low to High</option>
                                    <option value="-price">Price: High to Low</option>
                                    <option value="-createdAt">Newest Arrivals</option>
                                </select>
                            </div>
                        </div>


                        {products && products.length > 0 ? (
                            <div className="products">
                                {products &&
                                    products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                                }

                            </div>
                        ) : (
                            <div className="noProductsContainer">
                                <h2 className="noProducts">No Product Found</h2>
                                <NavLink to="/products" onClick={handleResetButton}>
                                    <span><strong>VIEW ALL PRODUCTS</strong></span>
                                </NavLink>
                            </div>

                        )}

                        {currentPage === Math.ceil(filteredProductsCount / resultPerPage) && (
                            <div className="endOfList">
                                <span>End of List</span>
                            </div>
                        )}

                        {filteredProductsCount > resultPerPage && (
                            <div className="paginationBox">
                                <Pagination
                                    count={Math.ceil(filteredProductsCount / resultPerPage)}
                                    page={currentPage}
                                    onChange={(e, page) => setCurrentPage(page)}
                                    variant="outlined"
                                    shape="rounded"
                                    size="large"
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: 'black',
                                            borderColor: '#d3d3d3',
                                        },
                                        '& .MuiPaginationItem-root.Mui-selected': {
                                            backgroundColor: '#ffaa2c',
                                            color: 'white',
                                            borderColor: '#ffaa2c',
                                            '&:hover': {
                                                backgroundColor: '#e6951a',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {isFilterBoxOpen && <div className="filter-overlay" onClick={toggleFilterBox}></div>}
                <div className={`filter-drawer ${isFilterBoxOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={toggleFilterBox}>×</button>
                    <div className="filterBoxSearchContainer">
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search for Gadgets..." autoFocus />
                        <button className='filterBoxSearchContainerBtn' onClick={handleSearchFilterSubmit}>Search</button>
                    </div>
                    <div className="filterByPriceContainer">
                        <h3>Filter By Price</h3>
                        <Box>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={tempPrice}
                                onChange={(e, newValue) => setTempPrice(newValue)}
                                valueLabelDisplay="off"
                                getAriaValueText={valuetext}
                                min={0}
                                max={300000}
                                sx={{
                                    color: '#121212',
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: '#121212',
                                        border: '1px solid #121212',
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: '#121212',
                                    },
                                    '& .MuiSlider-rail': {
                                        backgroundColor: '#696969',
                                    },
                                    '& .MuiSlider-valueLabel': {
                                        backgroundColor: '#fdd69c',
                                        color: '#121212',
                                    },
                                }}
                            />
                        </Box>
                        <div className='filterByPriceDetails'>
                            <button onClick={handlePriceFilterBtnClick} className='filterByPriceContainerBtn'>Filter</button>
                            <p>Price: <strong>₹{tempPrice[0].toLocaleString()} — ₹{tempPrice[1].toLocaleString()}</strong></p>
                        </div>

                    </div>
                    <div className="filterByCategoryContainer">
                        <h3>Product Categories</h3>

                    </div>
                    <div className="filterBox">

                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => handleCategoryFilterClick(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography style={{ fontFamily: "monospace", fontSize: "0.9rem" }} component="legend">Ratings Above</Typography>

                            <Box>
                                <Slider
                                    getAriaLabel={() => 'Ratings range'}
                                    value={ratings}
                                    onChange={(e, newRating) => handleRatingFilterClick(newRating)}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={(value) => `${value} Stars`}
                                    min={0}
                                    max={5}
                                    step={0.5}
                                    sx={{
                                        color: '#121212',
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: '#121212',
                                            border: '1px solid #121212',
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: '#121212',
                                        },
                                        '& .MuiSlider-rail': {
                                            backgroundColor: '#696969',
                                        },
                                        '& .MuiSlider-valueLabel': {
                                            backgroundColor: '#fdd69c',
                                            color: '#121212',
                                        },
                                    }}
                                />
                            </Box>

                            <Rating
                                name="simple-controlled"
                                value={ratings}
                                onChange={(e, newRating) => {
                                    handleRatingFilterClick(newRating);
                                }}
                                max={5}
                                defaultValue={0}
                            />
                        </fieldset>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Products