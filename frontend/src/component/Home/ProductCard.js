import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import "./ProductCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeWishlist
} from "../../actions/wishlistAction";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(state => state.user);

  const { wishlist, loading: wishlistLoading } = useSelector(
    state => state.wishlist
  );

  const isWishlisted = wishlist?.some(
    item => item._id === product._id
  );

  const wishlistHandler = async (e) => {
    e.preventDefault();     // Prevent Link navigation
    e.stopPropagation();    // Stop event bubbling

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
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ca944d",
    size: window.innerWidth < 600 ? 8 : 13,
    value: product?.ratings || 0,
    isHalf: true,
  }

  return (
    <>
      <Link className='productCard' to={`/product/${product._id}`}>
        <div className="wishlistIcon">
          {isWishlisted ?
            <FaHeart disabled={wishlistLoading} onClick={wishlistHandler} className="filledHeart" /> :
            <FaRegHeart disabled={wishlistLoading} onClick={wishlistHandler} className="emptyHeart" />
          }
        </div>
        <div className="productCardImg">
          <img src={product?.images[0]?.url} alt={product?.name} />
        </div>
        <p>
          {product?.name?.length > 22
            ? product.name.substring(0, 22) + ".."
            : product?.name}
        </p>

        <div className="productCardStars">
          <ReactStars {...options} />
          <span className="reviewCount">
            ({product.numOfReviews})
          </span>
        </div>
        <span className="productCardPrice">{`₹${product.price}`}</span>

      </Link>
    </>
  )
}

export default ProductCard;