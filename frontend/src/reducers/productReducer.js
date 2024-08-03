import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
  },
  reducers: {
    allProductRequest: (state) => {
      state.loading = true;
    },
    allProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    allProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    productDetailsRequest: (state) => {
      console.log("productDetailsRequest dispatched");
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      console.log("productDetailsSuccess dispatched", action.payload);
      state.loading = false;
      state.product = action.payload;
    },
    productDetailsFail: (state, action) => {
      console.log("productDetailsFail dispatched", action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

const newReviewSlice = createSlice({
  name: "newReview",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    newReviewRequest: (state) => {
      console.log("newReviewRequest dispatched");
      state.loading = true;
    },
    newReviewSuccess: (state, action) => {
      console.log("newReviewSuccess dispatched", action.payload);
      state.loading = false;
      state.success = action.payload;
    },
    newReviewFail: (state, action) => {
      console.log("newReviewFail dispatched", action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    newReviewReset: (state, action) => {
      console.log("newReviewSuccess dispatched", action.payload);
      state.loading = false;
      state.success = false;
    },
    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allProductRequest,
  allProductSuccess,
  allProductFail,
  clearAllErrors,
} = productSlice.actions;

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail
} = productDetailsSlice.actions;

export const {
  newReviewRequest,
  newReviewSuccess,
  newReviewFail,
  newReviewReset
} = newReviewSlice.actions;

const reducers = {
  products: productSlice.reducer,
  productDetails: productDetailsSlice.reducer,
  newReview: newReviewSlice.reducer,
};

export default reducers;




// import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";

// export const productsReducer = 
//     (state = { products: [] }, action) => {

//     switch (action.type) {
//         case ALL_PRODUCT_REQUEST:
//             return {
//                 loading: true,
//                 product: []
//             }
//         case ALL_PRODUCT_SUCCESS:
//             return {
//                 loading: false,
//                 product: action.payload.products,
//                 productsCount: action.payload.productsCount
//             }
//         case ALL_PRODUCT_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload
//             }
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }
//         default:
//             return state;
//     }

// };

// export const productReviewsReducer = (state = { reviews: [] }, action) => {
//   switch (action.type) {
//     case ALL_REVIEW_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case ALL_REVIEW_SUCCESS:
//       return {
//         loading: false,
//         reviews: action.payload,
//       };
//     case ALL_REVIEW_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };