import {
    getWishlistRequest,
    getWishlistSuccess,
    getWishlistFail,
    addToWishlistRequest,
    addToWishlistSuccess,
    addToWishlistFail,
    removeWishlistRequest,
    removeWishlistSuccess,
    removeWishlistFail,
    clearWishlistErrors,
} from "../reducers/wishListReducer";

export const getWishlist = () => async (dispatch) => {
    try {
        dispatch(getWishlistRequest());

        const { data } = await axios.get("/api/v1/wishlist");
        console.log("wishListAction : data in getWishlist : ", data);

        dispatch(getWishlistSuccess(data.wishlist));
    } catch (error) {
        console.log("wishListAction : error in getWishlist : ", error);
        dispatch(getWishlistFail(error.response.data.message));
    }
};

export const addToWishlist = (id) => async (dispatch) => {
    try {
        dispatch(addToWishlistRequest());

        const { data } = await axios.post(`/api/v1/wishlist/${id}`);
        console.log("wishListAction : data in addToWishlist : ", data);

        dispatch(addToWishlistSuccess(data.wishlist));
    } catch (error) {
        console.log("wishListAction : error in addToWishlist : ", error);
        dispatch(addToWishlistFail(error.response.data.message));
    }
};

export const removeWishlist = (id) => async (dispatch) => {
    try {
        dispatch(removeWishlistRequest());

        const { data } = await axios.delete(`/api/v1/wishlist/${id}`);
        console.log("wishListAction : data in removeWishlist : ", data);

        dispatch(removeWishlistSuccess(data.wishlist));
    } catch (error) {
        console.log("wishListAction : error in removeWishlist : ", error);
        dispatch(removeWishlistFail(error.response.data.message));
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch(clearWishlistErrors());
};