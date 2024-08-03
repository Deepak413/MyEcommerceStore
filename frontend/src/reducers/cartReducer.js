import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        shippingInfo: {},
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            // const quantity = action.payload.quantity;
            // console.log("item")
            // console.log(item)
            // console.log("quantity")
            // console.log(quantity)
            const isItemExist = state.cartItems.find((i) => {
                return i.product === item.product;
            })

            if (isItemExist) {
                state.cartItems = state.cartItems.map((i) => {
                    return i === isItemExist ? item : i
                })
            }
            else {
                state.cartItems = [...state.cartItems, item];
            }
        },

        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => {
                return i.product !== action.payload;
            })
        },

        saveShippingInformation: (state, action) => {
            state.shippingInfo = action.payload;
        }
    },
})

export const {
    addToCart, removeCartItem, saveShippingInformation
} = cartSlice.actions;

const reducers = {
    cart: cartSlice.reducer,
};

export default reducers;