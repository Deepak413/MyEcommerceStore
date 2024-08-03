import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        loading: false,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        registerUserRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        registerUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;

            console.log("registered user is : ", action.payload);
            state.user = action.payload;
        },
        registerUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        loadUserRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
        }

    },
})


const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        error: null,
        isUpdated: false,
    },
    reducers: {
        updateProfileRequest: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateProfileReset: (state) => {
            state.isUpdated = false;
        },
        updateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordRequest: (state) => {
            state.loading = true;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updatePasswordReset: (state) => {
            state.isUpdated = false;
        },
        updatePasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
        }
    },
})

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        error: null,
        message: "",
        success: false,
    },
    reducers: {
        forgotPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        forgotPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        resetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAllErrors: (state) => {
            state.error = null;
        }
    },
})


export const {
    loginRequest,loginFail,loginSuccess,
    registerUserRequest,registerUserSuccess,registerUserFail,
    loadUserRequest, loadUserSuccess, loadUserFail,
    logoutSuccess, logoutFail,clearAllErrors,
} = userSlice.actions;

export const {
    updateProfileRequest, updateProfileSuccess, updateProfileFail,updateProfileReset,
    updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, updatePasswordReset
} = profileSlice.actions;

export const {
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail,
    resetPasswordRequest, resetPasswordSuccess, resetPasswordFail
} = forgotPasswordSlice.actions;

const reducers = {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
};

export default reducers;
  





// export const userReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//         case REGISTER_USER_REQUEST:
//         case LOAD_USER_REQUEST:
//             return {
//                 loading: true,
//                 isAuthenticated: false,
//             };
//         case LOGIN_SUCCESS:
//         case REGISTER_USER_SUCCESS:
//         case LOAD_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: true,
//                 user: action.payload,
//             };

//         case LOGOUT_SUCCESS:
//             return {
//                 loading: false,
//                 user: null,
//                 isAuthenticated: false,
//             };
//         case LOGIN_FAIL:
//         case REGISTER_USER_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null,
//                 error: action.payload,
//             };

//         case LOAD_USER_FAIL:
//             return {
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null,
//                 error: action.payload,
//             };

//         case LOGOUT_FAIL:
//             return {
//                 ...state,
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