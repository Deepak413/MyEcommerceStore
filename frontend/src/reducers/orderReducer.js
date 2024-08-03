import { createSlice } from "@reduxjs/toolkit";

const newOrderSlice = createSlice({
    name: "newOrder",
    initialState: {
        order: {},
        loading: false,
        error: null,
    },
    reducers: {
        createOrderRequest: (state) => {
            state.loading = true;
        },
        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        createOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
        },
    },
});

const myOrdersSlice = createSlice({
    name: "myOrders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {
        myOrdersRequest: (state) => {
            state.loading = true;
        },
        myOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
        },
        myOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
        },
    },
});

const allOrdersSlice = createSlice({
    name: "allOrders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {
        allOrdersRequest: (state) => {
            state.loading = true;
        },
        allOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
        },
        allOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
        },
    },
});

const orderSlice = createSlice({
    name: "order",
    initialState: {
        isUpdated: false,
        isDeleted: false,
        loading: false,
        error: null,
    },
    reducers: {
        updateOrderRequest: (state) => {
            state.loading = true;
        },
        deleteOrderRequest: (state) => {
            state.loading = true;
        },
        updateOrderSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        deleteOrderSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        updateOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateOrderReset: (state, action) => {
            state.isUpdated = false;
        },
        deleteOrderReset: (state, action) => {
            state.isDeleted = false;
        },
        clearAllErrors: (state) => {
            state.error = null;
        },
    },
});

const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        order: {},
        loading: false,
        error: null,
    },
    reducers: {
        orderDetailsRequest: (state) => {
            state.loading = true;
        },
        orderDetailsSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        orderDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
        },
    },
});


export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    clearAllErrors,
} = newOrderSlice.actions;

export const {
    myOrdersRequest,
    myOrdersSuccess,
    myOrdersFail
} = myOrdersSlice.actions;

export const {
    allOrdersRequest,
    allOrdersSuccess,
    allOrdersFail
} = allOrdersSlice.actions;

export const {
    updateOrderRequest,
    deleteOrderRequest,
    updateOrderSuccess,
    deleteOrderSuccess,
    updateOrderFail,
    deleteOrderFail
} = orderSlice.actions;

export const {
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail
} = orderDetailsSlice.actions;

const reducers = {
    newOrder: newOrderSlice.reducer,
    myOrders: myOrdersSlice.reducer,
    allOrders: allOrdersSlice.reducer,
    order: orderSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
};

export default reducers;











// export const newOrderReducer = (state = {}, action) => {
//     switch (action.type) {
//         case CREATE_ORDER_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };

//         case CREATE_ORDER_SUCCESS:
//             return {
//                 loading: false,
//                 order: action.payload,
//             };

//         case CREATE_ORDER_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };

//         default:
//             return state;
//     }
// };

// export const myOrdersReducer = (state = { orders: [] }, action) => {
//     switch (action.type) {
//         case MY_ORDERS_REQUEST:
//             return {
//                 loading: true,
//             };

//         case MY_ORDERS_SUCCESS:
//             return {
//                 loading: false,
//                 orders: action.payload,
//             };

//         case MY_ORDERS_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };

//         default:
//             return state;
//     }
// };

// export const allOrdersReducer = (state = { orders: [] }, action) => {
//     switch (action.type) {
//         case ALL_ORDERS_REQUEST:
//             return {
//                 loading: true,
//             };

//         case ALL_ORDERS_SUCCESS:
//             return {
//                 loading: false,
//                 orders: action.payload,
//             };

//         case ALL_ORDERS_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };

//         default:
//             return state;
//     }
// };

// export const orderReducer = (state = {}, action) => {
//     switch (action.type) {
//         case UPDATE_ORDER_REQUEST:
//         case DELETE_ORDER_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };

//         case UPDATE_ORDER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 isUpdated: action.payload,
//             };

//         case DELETE_ORDER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 isDeleted: action.payload,
//             };

//         case UPDATE_ORDER_FAIL:
//         case DELETE_ORDER_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         case UPDATE_ORDER_RESET:
//             return {
//                 ...state,
//                 isUpdated: false,
//             };

//         case DELETE_ORDER_RESET:
//             return {
//                 ...state,
//                 isDeleted: false,
//             };
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };

//         default:
//             return state;
//     }
// };

// export const orderDetailsReducer = (state = { order: {} }, action) => {
//     switch (action.type) {
//         case ORDER_DETAILS_REQUEST:
//             return {
//                 loading: true,
//             };

//         case ORDER_DETAILS_SUCCESS:
//             return {
//                 loading: false,
//                 order: action.payload,
//             };

//         case ORDER_DETAILS_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };

//         default:
//             return state;
//     }
// };