import axios from "axios";
import { allProductFail, allProductRequest, allProductSuccess, clearAllErrors, productDetailsFail, productDetailsSuccess, similarProductsFail, similarProductsRequest, similarProductsSuccess } from "../reducers/productReducer";
import { productDetailsRequest, newReviewFail, newReviewRequest, newReviewReset, newReviewSuccess } from "../reducers/productReducer";
import {
    adminProductRequest,
    adminProductSuccess,
    adminProductFail,

    newProductRequest,
    newProductSuccess,
    newProductFail,

    updateProductRequest,
    updateProductSuccess,
    updateProductFail,

    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,

    allReviewRequest,
    allReviewSuccess,
    allReviewFail,

    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
} from "../reducers/productReducer";

export const getProduct = (keyword = "", currentPage = 1, price = [12000, 150000], category, ratings = 0, sort = "") => async (dispatch) => {
    try {
        dispatch(allProductRequest());

        let link = `https://shoppingkaro-65sf.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        if (category) {
            link += `&category=${category}`;
        }
        if (ratings > 0) {
            link += `&ratings[gte]=${ratings}`;
        }

        if (sort) {
            link += `&sort=${sort}`;
        }

        console.log("ProductAction.js  -  hitting getProduct query with LINK : ", link);
        const { data } = await axios.get(link);
        console.log("data from backend in getProduct in ProductAction : ", data);
        dispatch(allProductSuccess({ ...data }));
    } catch (error) {
        dispatch(allProductFail(error.response.data.message));
    }
};

export const getProductWithoutPagination = (sort = "") => async (dispatch) => {
    try {
        dispatch(allProductRequest());

        let link = "https://shoppingkaro-65sf.onrender.com/api/v1/productsAll";

        if (sort) {
            link += `&sort=${sort}`;
        }

        console.log("ProductAction.js  -  hitting getProductWithoutPagination query with LINK : ", link);
        const { data } = await axios.get(link);
        console.log("data from backend in getProductWithoutPagination in ProductAction : ", data);
        dispatch(allProductSuccess({ ...data }));
    } catch (error) {
        console.log("Error in productAction.js getProductWithoutPagination method");
        dispatch(allProductFail(error.response.data.message));
    }
};

export const getSimilarCategoryProducts = (category) => async (dispatch) => {
    try {
        dispatch(similarProductsRequest());

        let link = `https://shoppingkaro-65sf.onrender.com/api/v1/products`;

        if (category) {
            link += `?category=${category}`;
        }

        const { data } = await axios.get(link);
        console.log("Similar category products in getSimilarCategoryProducts ProductAction.js : ", data);
        dispatch(similarProductsSuccess({ ...data }));
    } catch (error) {
        dispatch(similarProductsFail(error.response.data.message));
    }
};

export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch(adminProductRequest());

        const { data } = await axios.get(
            "https://shoppingkaro-65sf.onrender.com/api/v1/admin/products"
        );

        console.log("✅ Backend Admin Products Response:", {
            totalFromBackend: data.productsCount,
            productsArrayLength: data.products?.length,
            data: data
        });

        dispatch(
            adminProductSuccess({
                products: data.products
            })
        );
    } catch (error) {
        dispatch(
            adminProductFail(
                error.response?.data?.message || "Failed to fetch products"
            )
        );
    }
};

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch(newProductRequest());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        const { data } = await axios.post(
            "https://shoppingkaro-65sf.onrender.com/api/v1/admin/product/new",
            productData,
            config
        );

        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(
            newProductFail(
                error.response?.data?.message || "Failed to create product"
            )
        );
    }
};

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch(updateProductRequest());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        const { data } = await axios.put(
            `https://shoppingkaro-65sf.onrender.com/api/v1/admin/product/${id}`,
            productData,
            config
        );

        dispatch(updateProductSuccess(data.success));
    } catch (error) {
        dispatch(
            updateProductFail(
                error.response?.data?.message || "Failed to update product"
            )
        );
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch(deleteProductRequest());

        const { data } = await axios.delete(
            `https://shoppingkaro-65sf.onrender.com/api/v1/admin/product/${id}`
        );

        dispatch(deleteProductSuccess(data.success));
    } catch (error) {
        console.log("Error in deleteProduct action : ", error);
        dispatch(
            deleteProductFail(
                error.response?.data?.message || "Failed to delete product"
            )
        );
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest());
        const { data } = await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/product/${id}`);
        dispatch(productDetailsSuccess(data.product));
    } catch (error) {
        dispatch(productDetailsFail(error.response.data.message));
    }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(newReviewRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`https://shoppingkaro-65sf.onrender.com/api/v1/review`, reviewData, config);

        dispatch(newReviewSuccess(data.success));
    } catch (error) {
        dispatch(newReviewFail(error.response.data.message));
    }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch(allReviewRequest());

    const { data } = await axios.get(
      `https://shoppingkaro-65sf.onrender.com/api/v1/reviews?id=${id}`
    );

    dispatch(allReviewSuccess(data.reviews));
  } catch (error) {
    dispatch(
      allReviewFail(
        error.response?.data?.message || "Failed to fetch reviews"
      )
    );
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());

    const { data } = await axios.delete(
      `https://shoppingkaro-65sf.onrender.com/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch(deleteReviewSuccess(data.success));
  } catch (error) {
    dispatch(
      deleteReviewFail(
        error.response?.data?.message || "Failed to delete review"
      )
    );
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearAllErrors());
}