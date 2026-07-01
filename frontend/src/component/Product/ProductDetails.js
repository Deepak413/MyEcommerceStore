import React, { Fragment, useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, getSimilarCategoryProducts, newReview } from '../../actions/productAction';
import { useNavigate, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard.js';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToWishlist, removeWishlist } from '../../actions/wishlistAction.js';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();      //to get the id parameter from the current page

    const { product, loading: productLoading, error: productError } =
        useSelector((state) => state.productDetails);

    const { error:wishlistError, loading:wishlistLoading, isAuthenticated } = useSelector(state => state.user);

    const {
        similarProducts,
        loading: similarProductsLoading,
        error: similarProductsError,
    } = useSelector((state) => state.similarProducts);

    const [filteredSimilarProducts, setFilteredSimilarProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const { loading, error, wishlist } = useSelector(
        (state) => state.wishlist
    );

    const increseQuantity = () => {
        console.log("quantity : ", quantity);
        if (quantity >= product.Stock) {
            toast.error("Out of stock");
            return;
        }
        setQuantity(quantity + 1);
    }
    const decreseQuantity = () => {
        console.log("quantity decresed");
        if (quantity <= 1) {
            toast.error("total cannot be 0");
            return;
        }
        setQuantity(quantity - 1);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        toast.success("Item added to cart");
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
        if (productError) {
            console.log("Error while getting product details");
            toast.error(productError);
            dispatch(clearErrors());
        }

        if (reviewError) {
            toast.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Review Submitted Successfully");
            dispatch(newReviewReset());
        }

        dispatch(getProductDetails(id));
        console.log("product detail in ProductDetails : ", product);
    }, [dispatch, id, productError, reviewError, success]);

    useEffect(() => {
        if (product?.category) {
            dispatch(getSimilarCategoryProducts(product.category));
        }
        console.log("Similar products in ProductDetails.js : ", similarProducts);

    }, [dispatch, product]);

    useEffect(() => {
        if (similarProducts && similarProducts.length && product?._id) {

            const filtered = similarProducts.filter(
                (item) => item._id !== product._id
            );

            setFilteredSimilarProducts(filtered);

            console.log("Filtered Similar Products in ProductDetails.js: ", filtered);
        }

    }, [similarProducts, product?._id]);

    const isWishlisted = wishlist?.some(
        item => item._id === product._id
    );

    const wishlistHandler = async () => {

        if (!isAuthenticated) {
            toast.info("Please login to use Wishlist");
            navigate("/login");
            return;
        }

        if (isWishlisted) {
            await dispatch(removeWishlist(product._id));
            toast.success("Removed from Wishlist");
        }
        else {
            await dispatch(addToWishlist(product._id));
            toast.success("Added to Wishlist ❤️");
        }

    };

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }
    return (
        <Fragment>
            {productLoading ? (<Loader />) : (
                <>
                    <MetaData title={`${product.name} --ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel showIndicators={true} showThumbs={true} showArrows={true} showStatus={false}>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img src={item.url} key={item.url} alt={`${i} Slide`} className="CarouselImage" style={{}} />
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">

                                <p>Category: {product.category}</p>
                                <h2>{product.name}</h2>
                            </div>

                            <div className="detailsBlock-4">
                                <p>{product.description}</p>
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
                                        className='addToCartBtnOnDetailsPage' 
                                    >
                                        Add to Cart
                                    </button>
                                    <button disabled={wishlistLoading} className='addToWishlistBtnOnDetailsPage' onClick={wishlistHandler}>Add to Wishlist <FaRegHeart /></button>
                                </div>

                                <p>
                                    {/* Status :  */}
                                    <p style={{ 'margin-right': '8px' }}>Status : </p>
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "  OutOfStock" : "  In Stock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className='detailsBlock-2-span'> ({product.numOfReviews} Reviews)</span>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview"> Write a Review </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                        className="submitReviewContainer"
                    >
                        <DialogTitle className="submitReviewHeading">Submit Review</DialogTitle>
                        <DialogContent className="submitReviewBox">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitReviewBoxTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <button className="submitReviewCancelBtn" onClick={submitReviewToggle}>CANCEL</button>
                            <button className="submitReviewSubmitBtn" onClick={reviewSubmitHandler}>SUBMIT</button>
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


                    <h2 className="similarProductsHeading">Similar Products</h2>

                    {similarProductsLoading ? (<Loader />) : (
                        <div className="similarProductsContainer">
                            <div className='similarProductsCards'>

                                <button className="viewAllBtn">
                                    <FaArrowRightLong style={{ color: "white" }} />
                                </button>

                                <Swiper
                                    modules={[Navigation]}
                                    navigation
                                    pagination={{ clickable: true }}
                                    spaceBetween={20}
                                    slidesPerView={4}
                                    centeredSlides={false}
                                    grabCursor={true}
                                    breakpoints={{
                                        320: { slidesPerView: 1 },
                                        600: { slidesPerView: 2 },
                                        900: { slidesPerView: 3 },
                                        1200: { slidesPerView: 4 },
                                    }}
                                >
                                    {filteredSimilarProducts?.map((p) => (
                                        <SwiperSlide key={p._id}>
                                            <ProductCard product={p} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    )}

                </>
            )}
        </Fragment>
    )
}

export default ProductDetails