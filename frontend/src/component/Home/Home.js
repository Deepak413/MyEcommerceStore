import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import { getProduct,getProductWithoutPagination, getHomeProducts, clearErrors, getSimilarCategoryProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import "../layout/About/aboutSection.css"
import { FaLaptop, FaMobileAlt, FaCamera, FaTabletAlt, FaHeadphones } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import OurAdvantages from '../layout/OurAdvantages.js';
import { FaArrowRightLong } from "react-icons/fa6";
import { loadUser } from '../../actions/userAction.js';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector(state => state.products);
    console.log("products in Home.js : ", products);

    const { loading: homeProductsLoading, error: homeProductsError, featuredProducts:homefeaturedProducts, topRatedProducts:hometopRatedProducts, bestSellerProducts:homebestSellerProducts } = useSelector(state => state.homeProducts);
    console.log("homefeaturedProducts in Home.js : ", homefeaturedProducts);
    console.log("hometopRatedProducts in Home.js : ", hometopRatedProducts);
    console.log("homebestSellerProducts in Home.js : ", homebestSellerProducts);

    const featuredProducts = products.slice(0, 8);
    const topRatedProducts = [...products].sort((a, b) => b.ratings - a.ratings).slice(0, 8);
    console.log("topRatedProducts in Home.js : ", topRatedProducts);
    const bestsellerProducts = [...products].sort((a, b) => b.numOfReviews - a.numOfReviews).slice(0, 8);
    console.log("bestsellerProducts in Home.js : ", bestsellerProducts);
    useEffect(() => {
        console.log("Dispatching Home.js getProduct()");
        dispatch(getProductWithoutPagination());
        // dispatch(getHomeProducts());
        dispatch(loadUser());

        if (error) {
            console.log("home.js - Error found : ", error);
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, toast]);

    return (
        <Fragment>
            <MetaData title="ShoppinggKaro" />
            <div className="banner">
                <div className="overlay"></div>
                <div className="home_content">
                    <h1>LET'S LEVEL UP </h1>
                    <h1>YOUR GADGETS</h1>
                </div>
                <div className="home_content1">
                    <p>Discover the latest electronics, smart devices, and innovative gadgets designed to power your work, entertainment, and everyday life.</p>
                </div>

                <a href="#container">
                    <button> Shop Now <CgMouse /> </button>
                </a>
            </div>

            <div className="categoryShowcase">
                <h2 className="categoryTitle">Explore Our Collections</h2>
                <p className="categorySubtitle">
                    Discover the latest technology crafted for work, gaming, and entertainment.
                </p>

                <div className="categoryGrid">

                    <Link
                        to="/products?category=Laptop"
                        className="categoryCard laptop"
                    >
                        <div className="categoryOverlay">
                            <h3>Laptops</h3>
                            <p>Powerful machines for work and gaming</p>
                            <span className="browseBtn">Browse Collection</span>
                        </div>
                    </Link>

                    <Link
                        to="/products?category=Phone"
                        className="categoryCard mobile"
                    >
                        <div className="categoryOverlay">
                            <h3>Smartphones</h3>
                            <p>Stay connected with flagship devices</p>
                            <span className="browseBtn">Browse Collection</span>
                        </div>
                    </Link>

                    <Link
                        to="/products?category=Monitor"
                        className="categoryCard monitor"
                    >
                        <div className="categoryOverlay">
                            <h3>Monitors</h3>
                            <p>Immersive displays for productivity</p>
                            <span className="browseBtn">Browse Collection</span>
                        </div>
                    </Link>

                </div>
            </div>


            <h2 id="container" className="homeHeading">Featured Products</h2>
            {loading ? <Loader /> :
                <div className="container">
                    <div className="featuredProductsSlider">
                        <button className="viewAllPdtsBtn">
                            <FaArrowRightLong style={{ color: "white" }} />
                        </button>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={20}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                600: {
                                    slidesPerView: 2,
                                },
                                900: {
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {featuredProducts?.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>}


            <h2 id="container" className="homeHeading">Bestsellers</h2>
            {loading ? <Loader /> :
                <div className="container">
                    <div className="featuredProductsSlider">
                        <button className="viewAllPdtsBtn">
                            <FaArrowRightLong style={{ color: "white" }} />
                        </button>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={20}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                600: {
                                    slidesPerView: 2,
                                },
                                900: {
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {bestsellerProducts?.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>}


            <h2 id="container" className="homeHeading">Top Rated Products</h2>
            {loading ? <Loader /> :
                <div className="container">
                    <div className="featuredProductsSlider">
                        <button className="viewAllPdtsBtn">
                            <FaArrowRightLong style={{ color: "white" }} />
                        </button>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={20}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                600: {
                                    slidesPerView: 2,
                                },
                                900: {
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {topRatedProducts?.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>}

            <div><OurAdvantages /></div>
        </Fragment>
    )
}

export default Home