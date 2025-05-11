import { React, useState, useEffect } from 'react';
import './FilterBoxDrawer.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Typography from "@mui/material/Typography";

// function valuetext(value) {
//     return `${value}₹`;
// }

// const categories = [
//     "Laptop",
//     "Tablet",
//     "Phone",
//     "Watch",
//     "Monitor",
//     "Tv",
//     "Earphone",
// ];

const FilterBoxDrawer = ({ isOpen, onClose }) => {

    // const dispatch = useDispatch();
    // const { keyword } = useParams();

    // const [price, setPrice] = useState([12000, 150000]);
    // const [category, setCategory] = useState("");
    // const [ratings, setRatings] = useState();

    // const { products, loading, error } = useSelector((state) => state.products)

    // const priceHandler = (event, newPrice) => {
    //     setPrice(newPrice);
    // }

    // useEffect(() => {
    //     if (error) {
    //         console.log("getting error in filterBoxDrawer");
    //         toast.error(error);
    //         dispatch(clearErrors());
    //     }
    //     dispatch(getProduct(keyword, price, category, ratings));
    // }, [dispatch, keyword, price, category, ratings, toast, error]);

    return (
        <>
            {/* {isOpen && <div className="filter-overlay" onClick={onClose}></div>}
            <div className={`filter-drawer ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={onClose}>×</button>
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
 */}

        </>
    );
};

export default FilterBoxDrawer;
