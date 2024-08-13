import axios from "axios";
import { allProductFail, allProductRequest, allProductSuccess, clearAllErrors, productDetailsFail, productDetailsSuccess } from "../reducers/productReducer";
import { productDetailsRequest, newReviewFail, newReviewRequest, newReviewReset, newReviewSuccess } from "../reducers/productReducer";

export const getProduct = (keyword = "", currentPage=1, price=[0,25000], category, ratings=0) => async(dispatch) => {
    try {
        dispatch(allProductRequest());

        let link = `https://shoppingkaro-65sf.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        if (category) {
            link += `&category=${category}&ratings[gte]=${ratings}`;
        }

        // let link = ` http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        // if(category){
        //     link = ` http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`; 
        // }

        // if(ratings && category)
        // link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        // if(ratings)
        //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        

        const {data} = await axios.get(link);
        // console.log(data);
        dispatch(allProductSuccess({...data}));
    } catch (error) {
        dispatch(allProductFail(error.response.data.message));
    }
};

export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch(productDetailsRequest());
        const {data} = await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/product/${id}`);
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


//Clearing Errors
export const clearErrors = () => async(dispatch) => {
    dispatch(clearAllErrors());
}