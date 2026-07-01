import React, { Fragment, useEffect } from "react";
import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

import { getWishlist, removeWishlist } from "../../actions/wishlistAction";
import { addItemsToCart } from "../../actions/cartAction";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const Wishlist = () => {

    const dispatch = useDispatch();

    const { loading, wishlist, error } = useSelector(
        (state) => state.wishlist
    );

    console.log("Wishlist.js : Wishlist : ", wishlist);

    useEffect(() => {

        if (error) {
            toast.error(error);
        }

        dispatch(getWishlist());

    }, [dispatch, error]);

    const removeWishlistHandler = (id) => {

        dispatch(removeWishlist(id));
        dispatch(getWishlist());
        console.log("Wishlist.js : Wishlist in removeWishlistHandler : ", wishlist);
        toast.success("Removed from Wishlist");

    };

    const moveToCartHandler = (productId) => {

        dispatch(addItemsToCart(productId, 1));

        dispatch(removeWishlist(productId));
        dispatch(getWishlist());

        console.log("Wishlist.js : Wishlist in moveToCartHandler : ", wishlist);
        toast.success("Moved to Cart");

    };

    return (
        <Fragment>

            <MetaData title="My Wishlist" />

            {loading ? (

                <Loader />

            ) : wishlist && wishlist.length === 0 ? (

                <div className="emptyWishlist">

                    <Typography variant="h4">
                        Your Wishlist is Empty ❤️
                    </Typography>

                    <p>Add products you like to your wishlist.</p>

                    <Link to="/products">
                        Browse Products
                    </Link>

                </div>

            ) : (

                <Fragment>

                    <div className="wishlistContainer">

                        <Typography className="wishlistHeading">
                            My Wishlist ({wishlist?.length || 0})
                        </Typography>

                        {wishlist?.map((item) => (

                            <div
                                className="wishlistCard"
                                key={item._id}
                            >

                                <Link to={`/product/${item._id}`}>

                                    <img
                                        src={item?.images?.[0]?.url}
                                        alt={item?.name}
                                    />

                                </Link>

                                <div className="wishlistDetails">

                                    <Link to={`/product/${item._id}`}>
                                        <h3>{item?.name}</h3>
                                    </Link>

                                    <p>
                                        ₹{item?.price}
                                    </p>

                                    <p>

                                        {
                                            item?.Stock > 0
                                                ? (
                                                    <span className="inStock">
                                                        In Stock
                                                    </span>
                                                )
                                                : (
                                                    <span className="outStock">
                                                        Out of Stock
                                                    </span>
                                                )
                                        }

                                    </p>

                                </div>

                                <div className="wishlistButtons">

                                    <button
                                        className="moveCartBtn"
                                        disabled={item?.Stock < 1}
                                        onClick={() => moveToCartHandler(item._id)}
                                    >
                                        Move to Cart
                                    </button>

                                    <button
                                        className="removeWishlistBtn"
                                        onClick={() =>
                                            removeWishlistHandler(item._id)
                                        }
                                    >

                                        Remove

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </Fragment>

            )}

        </Fragment>
    );

};

export default Wishlist;