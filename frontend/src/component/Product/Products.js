import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import { NavLink, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Slider from "@mui/material/Slider";
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import './FilterBoxDrawer.css';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
import Typography from "@mui/material/Typography";
import MetaData from '../layout/MetaData';
import FilterBoxDrawer from './FilterBoxDrawer.js';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([12000, 150000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState();

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products)

    // const keyword = match.params.keyword;
    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    let count = filteredProductsCount;

    console.log("count : ", count);
    console.log("products", products);


    const [selectedSortOption, setSelectedSortOption] = useState('default');

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSelectedSortOption(value);
    };

    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    const toggleFilterBox = () => setIsFilterBoxOpen(!isFilterBoxOpen);
    const toggleResetButton = (e) => {
        console.log("Filters reset done.")
    }

    useEffect(() => {
        if (error) {
            console.log("getting error in Product.js");
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, toast, error]);


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="PRODUCTS --ECOMMERCE" />
                {/* <h2 className="productsHeading">Products</h2> */}
                <div className="productsContainer">
                    <div className="productsBox">
                        <div className='filterContainer'>
                            <div className='filterButtonsContainer'>
                                <NavLink onClick={toggleFilterBox}>
                                    <HiOutlineAdjustmentsHorizontal className="filterIcon" size={17} />
                                    <span>FILTER</span>
                                </NavLink>
                                <NavLink onClick={toggleResetButton}>
                                    <RxReset className="filterIcon" size={17} />
                                    <span>RESET</span>
                                </NavLink>
                            </div>
                            {/* <FilterBoxDrawer isOpen={isFilterBoxOpen} onClose={toggleFilterBox} /> */}

                            <div className="sortDropdown">
                                <select id="sort" value={selectedSortOption} onChange={handleSortChange}>
                                    <option value="default">Default Sorting</option>
                                    <option value="price">By Prices</option>
                                    <option value="name">By Name</option>
                                </select>
                            </div>
                        </div>

                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </div>
                </div>

                {isFilterBoxOpen && <div className="filter-overlay" onClick={toggleFilterBox}></div>}
                <div className={`filter-drawer ${isFilterBoxOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={toggleFilterBox}>×</button>
                    <div className="filterBoxSearchContainer">
                        <input type="text" placeholder="Search for Gadgets..." autoFocus />
                        <button>Search</button>
                    </div>
                    <div className="filterByPriceContainer">
                        <h3>Filter By Price</h3>
                        <Box>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={price}
                                onChange={priceHandler}
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
                        <div ><p>
                            Price: <strong>₹{price[0].toLocaleString()} — ₹{price[1].toLocaleString()}</strong>
                        </p></div>

                    </div>
                    <div className="filterByCategoryContainer">
                        <h3>Product Categories</h3>

                    </div>
                    <div className="filterBox">
                        {/* <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={500000}
                    /> */}
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography style={{ fontFamily: "monospace", fontSize: "0.9rem" }} component="legend">Ratings Above</Typography>
                            {/* <Slider
                            value={ratings}
                            onChange={(e, newRating) => {
                                setRatings(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        /> */}
                            <Box>
                                <Slider
                                    getAriaLabel={() => 'Ratings range'}
                                    value={ratings}
                                    onChange={(e, newRating) => setRatings(newRating)}
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
                                    setRatings(newRating);
                                }}
                                max={5}
                                defaultValue={0}
                            />
                        </fieldset>
                    </div>
                </div>

                {resultPerPage < productsCount && (
                    <div className="paginationBox">
                        <Pagination
                            count={Math.ceil(productsCount / resultPerPage)}
                            page={currentPage}
                            onChange={(e, page) => setCurrentPage(page)}
                            variant="outlined"
                            shape="rounded"
                            size="large"
                            // color='primary'
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
            </Fragment>}
        </Fragment>
    )
}

export default Products