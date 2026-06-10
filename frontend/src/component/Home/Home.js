import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    console.log("products in Home.js : ", products);

    const featuredProducts = products.slice(0, 8);
    console.log("featuredProducts in Home.js : ", featuredProducts);
    const topRatedProducts = [...products].sort((a, b) => b.ratings - a.ratings).slice(0, 8);
    console.log("topRatedProducts in Home.js : ", topRatedProducts);
    const bestsellerProducts = [...products].sort((a, b) => b.numOfReviews - a.numOfReviews).slice(0, 8);
    console.log("bestsellerProducts in Home.js : ", bestsellerProducts);
    useEffect(() => {
        dispatch(getProduct());
        dispatch(loadUser());
        if (error) {
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

            <h2 id="container" className="homeHeading">Featured Products</h2>

            {/* {loading ? <Loader /> :
                <div className="container">
                    {featuredProducts && featuredProducts.map(product => <ProductCard key={product._id} product={product} />)}
                </div>} */}

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

            {/* {loading ? <Loader /> :
                <div className="container">
                    {products && products.map(product => <ProductCard key={product._id} product={product} />)}
                </div>} */}
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

            {/* {loading ? <Loader /> :
                <div className="container">
                    {topRatedProducts && topRatedProducts.map(product => <ProductCard key={product._id} product={product} />)}
                </div>} */}
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