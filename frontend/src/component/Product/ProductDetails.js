import React, { Fragment, useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";

import { Rating } from "@mui/lab";
import { newReviewReset } from '../../reducers/productReducer.js';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();      //to get the id parameter from the current page
    const alert = useAlert();

    const { product, loading, error } = useSelector((state) => state.productDetails);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );

    const increseQuantity = () => {
        console.log("quantity incresed");
        console.log("product details is : ", product);
        console.log("id of current page : ", id);
        console.log("quantity : ", quantity);
        if (quantity >= product.Stock) {
            return;
        }
        setQuantity(quantity + 1);
    }
    const decreseQuantity = () => {
        console.log("quantity decresed");
        if (quantity <= 1) {
            return;
        }
        setQuantity(quantity - 1);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item added to cart");
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {

            console.log("Error while getting product details");
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
          }
      
          if (success) {
            alert.success("Review Submitted Successfully");
            dispatch(newReviewReset());
          }

        dispatch(getProductDetails(id));
    }, [dispatch, id, alert, error, quantity, reviewError, success]);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <>
                    <MetaData title={`${product.name} --ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel showIndicators={false} showThumbs={false}>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img src={item.url} key={item.url} alt={`${i} Slide`} className="CarouselImage" style={{}} />
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className='.detailsBlock-2-span'> ({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button readOnly onClick={decreseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button readOnly onClick={increseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "  OutOfStock" : "  InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview"> Submit Review </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}

                </>
            )}
        </Fragment>
    )
}

export default ProductDetails