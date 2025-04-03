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

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
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

                    <a href="#container">
                        <button> Shop Now <CgMouse /> </button>
                    </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            {loading ? <Loader /> :
                <div className="container" id="container">
                    {products && products.map(product => <ProductCard key={product._id} product={product} />)}
                </div>}
        </Fragment>
    )
}

export default Home