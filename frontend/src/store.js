// import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import productsReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";

const middleware = [thunk];

let savedData = localStorage.getItem("cartItems");
// console.log("savedData")
// console.log(savedData);

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ?  JSON?.parse(localStorage.getItem("cartItems"))
          :  [],
        shippingInfo : localStorage.getItem("shippingInfo")
          ?  JSON.parse(localStorage.getItem("shippingInfo"))
          :  {},
    },
};

const store = configureStore({
    reducer: {
        ...productsReducer, ...userReducer, ...cartReducer, ...orderReducer,
    },
    preloadedState: initialState,
    middleware
});

export default store;