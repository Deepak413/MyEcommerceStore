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

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    adminProductRequest: (state) => {
      state.loading = true;
    },
    adminProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    adminProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

const newProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    loading: false,
    success: false,
    product: {},
    error: null,
  },
  reducers: {
    newProductRequest: (state) => {
      state.loading = true;
    },

    newProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },

    newProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    newProductReset: (state) => {
      state.success = false;
      state.product = {};
    },

    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

const productUpdateDeleteSlice = createSlice({
  name: "productUpdateDelete",
  initialState: {
    loading: false,
    isDeleted: false,
    isUpdated: false,
    error: null,
  },
  reducers: {
    updateProductRequest: (state) => {
      state.loading = true;
    },

    deleteProductRequest: (state) => {
      state.loading = true;
    },

    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },

    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },

    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProductReset: (state) => {
      state.isUpdated = false;
    },

    deleteProductReset: (state) => {
      state.isDeleted = false;
    },

    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

const similarProductsSlice = createSlice({
  name: "similarProducts",
  initialState: {
    similarProducts: [],
    loading: false,
    error: null,
    similarProductsCount: 0,
  },
  reducers: {
    similarProductsRequest: (state) => {
      state.loading = true;
    },
    similarProductsSuccess: (state, action) => {
      state.loading = false;
      state.similarProducts = action.payload.products;
      state.similarProductsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    similarProductsFail: (state, action) => {
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

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    allReviewRequest: (state) => {
      state.loading = true;
    },

    allReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },

    allReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

const deleteReviewSlice = createSlice({
  name: "deleteReview",
  initialState: {
    loading: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    deleteReviewRequest: (state) => {
      state.loading = true;
    },

    deleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },

    deleteReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteReviewReset: (state) => {
      state.isDeleted = false;
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
  clearAllErrors
} = productSlice.actions;

export const {
  adminProductRequest,
  adminProductSuccess,
  adminProductFail,
} = adminProductSlice.actions;

export const{
  similarProductsRequest,
  similarProductsSuccess,
  similarProductsFail
} = similarProductsSlice.actions;

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail
} = productDetailsSlice.actions;

export const {
  newProductRequest,
  newProductSuccess,
  newProductFail,
  newProductReset,
} = newProductSlice.actions;

export const {
  updateProductRequest,
  deleteProductRequest,

  updateProductSuccess,
  deleteProductSuccess,

  updateProductFail,
  deleteProductFail,

  updateProductReset,
  deleteProductReset,
} = productUpdateDeleteSlice.actions;

export const {
  newReviewRequest,
  newReviewSuccess,
  newReviewFail,
  newReviewReset
} = newReviewSlice.actions;

export const {
  allReviewRequest,
  allReviewSuccess,
  allReviewFail,
} = productReviewsSlice.actions;

export const {
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
  deleteReviewReset,
} = deleteReviewSlice.actions;

const reducers = {
  newProduct: newProductSlice.reducer,
  products: productSlice.reducer,
  adminProducts: adminProductSlice.reducer,
  productUpdateDelete: productUpdateDeleteSlice.reducer,
  similarProducts: similarProductsSlice.reducer,
  productDetails: productDetailsSlice.reducer,
  newReview: newReviewSlice.reducer,
  productReviews: productReviewsSlice.reducer,
  deleteReview: deleteReviewSlice.reducer,
};

export default reducers;