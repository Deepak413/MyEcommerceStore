import axios from "axios";
import {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    myOrdersRequest,
    myOrdersSuccess,
    myOrdersFail,
    allOrdersRequest,
    allOrdersSuccess,
    allOrdersFail,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail,
    clearAllErrors    
} from "../reducers/orderReducer";


// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("https://shoppingkaro-65sf.onrender.com/api/v1/order/new", order, config);

        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
};

// My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch(myOrdersRequest());

        const { data } = await axios.get("https://shoppingkaro-65sf.onrender.com/api/v1/orders/me");

        dispatch(myOrdersSuccess(data));
    } catch (error) {
        console.log("my orders are :", error);
        dispatch(myOrdersFail(error.response.data.message));
    }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch(allOrdersRequest());

        const { data } = await axios.get("https://shoppingkaro-65sf.onrender.com/api/v1/admin/orders");

        dispatch(allOrdersSuccess(data));
    } catch (error) {
        dispatch(allOrdersFail(error.response.data.message));
    }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `https://shoppingkaro-65sf.onrender.com/api/v1/admin/order/${id}`,
            order,
            config
        );

        dispatch(updateOrderSuccess(data.success));
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message));
    }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());

        const { data } = await axios.delete(`https://shoppingkaro-65sf.onrender.com/api/v1/admin/order/${id}`);

        dispatch(deleteOrderSuccess(data.success));
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message));
    }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(orderDetailsRequest());

        const { data } = await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/order/${id}`);

        dispatch(orderDetailsSuccess(data.order));
    } catch (error) {
        dispatch(orderDetailsFail(error.response.data.message));
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearAllErrors());
};