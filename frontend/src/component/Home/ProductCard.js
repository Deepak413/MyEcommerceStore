import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ca944d",
    size: window.innerWidth < 600 ? 8 : 13,
    value: product.ratings,
    isHalf: true,
  }

  return (
    <>
      <Link className='productCard' to={`/product/${product._id}`}>
        <div className="productCardImg">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <p>{product.name}</p>

        <div className="productCardStars">
          <ReactStars {...options} />
        </div>
        <span className="productCardPrice">{`₹${product.price}`}</span>

      </Link>
    </>
  )
}

export default ProductCard;