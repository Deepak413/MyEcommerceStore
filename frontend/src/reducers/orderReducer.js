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
        loadingMore: false,
        error: null,
        totalOrders: 0,
    },
    reducers: {
        myOrdersRequest: (state, action) => {
            if (action.payload === 1) {
                state.loading = true;       // first load
            } else {
                state.loadingMore = true;   // next pages
            }
        },
        myOrdersSuccess: (state, action) => {
            // state.orders = action.payload.orders;
            const { orders, totalOrders, page } = action.payload;
            state.loading = false;
            state.loadingMore = false;

            if (page === 1) {
                state.orders = orders;
            }
            else {
                state.orders = [...state.orders, ...orders];
            }

            state.totalOrders = totalOrders;
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