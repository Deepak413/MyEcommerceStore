import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

// const product = {
//     name: "Black Shirt",
//     images:[{ url: "https://assets.ajio.com/medias/sys_master/root/20220121/hol0/61ea6d54f997dd6623328068/-288Wx360H-462521550-black-MODEL.jpg" }],
//     price: "$40",
//     _id:"abhishek",
// }

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch,error,alert]);

    return (
        <Fragment>
            {loading ? <Loader /> : 
            <Fragment>
                <MetaData title="ECOMMERCE" />
                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>FIND AMAZING PRODUCT BELOW</h1>

                    <a href="#container">
                        <button> Scroll <CgMouse /> </button>
                    </a>
                </div>

                <h2 className="homeHeading">Featured Products</h2>

                <div className="container" id="container">
                    {products && products.map(product => <ProductCard key={product._id} product={product} />)}
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Home