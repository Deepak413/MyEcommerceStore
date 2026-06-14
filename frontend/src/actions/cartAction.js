import axios from "axios";
import { addToCart, removeCartItem, saveShippingInformation, emptyCart } from "../reducers/cartReducer";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/product/${id}`);
    console.log("data")
    console.log(data)
    dispatch(addToCart({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image : data.product.images[0].url,
            stock : data.product.Stock, 
            quantity
        } ));

    //storing cart products in local storage to get product even after refresh
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

// Empty the Cart
export const emptyWholeCart = () => async (dispatch, getState) => {
    dispatch(emptyCart());
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}