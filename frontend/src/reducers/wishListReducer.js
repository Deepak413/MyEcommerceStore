import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: false,
    wishlist: [],
    error: null,
  },
  reducers: {
    getWishlistRequest: (state) => {
      state.loading = true;
    },
    getWishlistSuccess: (state, action) => {
      state.wishlist = action.payload.wishlist;
      state.loading = false;
    },
    getWishlistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addToWishlistRequest: (state) => {
      state.loading = true;
    },
    addToWishlistSuccess: (state, action) => {
      state.wishlist = action.payload.wishlist;
      state.loading = false;
    },
    addToWishlistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    removeWishlistRequest: (state) => {
      state.loading = true;
    },
    removeWishlistSuccess: (state, action) => {
      state.wishlist = action.payload.wishlist;
      state.loading = false;
    },
    removeWishlistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllErrors: (state) => {
      state.error = null;
    },

  },
});


export const {
    getWishlistRequest, getWishlistSuccess, getWishlistFail,
    addToWishlistRequest, addToWishlistSuccess, addToWishlistFail,
    removeWishlistRequest, removeWishlistSuccess, removeWishlistFail, clearAllErrors
} = wishlistSlice.actions;

const reducers = {
    wishlist: wishlistSlice.reducer,
};

export default reducers;