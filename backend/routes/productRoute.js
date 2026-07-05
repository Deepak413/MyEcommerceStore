const express = require("express");
const { getAllProductsWithPagination,
        getAllProductsWithoutPagination,
        createProduct, 
        updateProduct, 
        deleteProduct, 
        getProductDetails, 
        createProductReview, 
        getProductReviews,
        deleteReview,
        getAdminProducts,
        populateEmbeddings
    } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProductsWithPagination);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
  
router.route("/productsAll").get(getAllProductsWithoutPagination);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
    
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser ,createProductReview);

router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

router.route("/admin/populate-embeddings")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    populateEmbeddings
  );

module.exports = router