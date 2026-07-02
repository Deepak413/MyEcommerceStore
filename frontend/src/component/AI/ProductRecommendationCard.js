import React from "react";
import { useNavigate } from "react-router-dom";
import "./AIChat.css";

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

        <p>⭐ {product.ratings}</p>

        <h3>₹{product.price}</h3>

        <span className={product.stock > 0 ? "stockGreen" : "stockRed"}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        <button onClick={handleViewProduct}>View Product</button>
      </div>
    </div>
  );
};

export default ProductRecommendationCard;
