import axios from "axios";
import { addToCart, removeCartItem, saveShippingInformation } from "../reducers/cartReducer";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/product/${id}`);
    console.log("data")
    console.log(data)
    // console.log(data.product._id);
    // console.log(data.product.name);
    // console.log(data.product.price);
    // console.log(data.product.images[0].url);
    // console.log(data.product.Stock);
    // console.log(quantity);
    dispatch(addToCart({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image : data.product.images[0].url,
            stock : data.product.Stock, 
            quantity
        } ));

    //storing cart products in local storage to get product even after refresh
    // console.log("getState().cart.cartItems")
    // console.log(getState().cart.cartItems);
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

};

// Remove from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch(removeCartItem(id));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch, getState) => {
    dispatch(saveShippingInformation(data));
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}