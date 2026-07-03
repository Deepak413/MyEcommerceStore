import React from "react";
import { useNavigate } from "react-router-dom";
import "./AIChat.css";
import { IoStar } from "react-icons/io5";

const ProductRecommendationCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="aiProductCard">
      <img
        src={product.image}

        alt={product.name}

        className="aiProductImage"
      />

      <div className="aiProductInfo">
        <h4>{product.name}</h4>

        <p>
          <IoStar style={{ color: "#dcb679" }} /> {product.ratings}
        </p>

        <h3 style={{ "font-size": "0.8rem" }}>₹{product.price}</h3>

        <span
          style={{ "font-size": "0.8rem" }}
          className={product.stock > 0 ? "stockGreen" : "stockRed"}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        <button onClick={handleViewProduct}>View Product</button>
      </div>
    </div>
  );
};

export default ProductRecommendationCard;
