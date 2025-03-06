import axios from "axios";
import {
    clearAllErrors,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    loginFail,
    loginRequest,
    loginSuccess,
    logoutFail,
    logoutSuccess,
    registerUserFail,
    registerUserRequest,
    registerUserSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess
} from "../reducers/userReducer";

axios.defaults.withCredentials = true;

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const { data } = await axios.post(`https://shoppingkaro-65sf.onrender.com/api/v1/login`, { email, password }, config);

        dispatch(loginSuccess(data));
    } catch (error) {
        console.error(error);
        if (error.response) {
            dispatch(loginFail(error.response.data.message)); // If response exists, use it
        } else if (error.request) {
            dispatch(loginFail('Network error: No response received.'));
        } else {
            dispatch(loginFail('Error occurred while logging in.'));
        }
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerUserRequest());

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        };

        // const { data } = await axios.put(`https://shoppingkaro-65sf.onrender.com/api/v1/me/update`, userData, config);
        const { data } = await axios.post(`https://shoppingkaro-65sf.onrender.com/api/v1/register`, userData, config);

        console.log("registered user is : ", data);

        dispatch(registerUserSuccess(data.user));
    } catch (error) {
        dispatch(registerUserFail(error.response.data.message));
    }
};

//Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());

        const { data } = await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/me`);

        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/logout`);

        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data.message));
    }
};

// Update Profie
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        };

        const { data } = await axios.put(`https://shoppingkaro-65sf.onrender.com/api/v1/me/update`, userData, config);

        dispatch(updateProfileSuccess(data.success));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message));
    }
};


// Update password
export const updatePassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());


        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        };

        console.log("sending password update axios request with credentials");

        const { data } = await axios.put(`https://shoppingkaro-65sf.onrender.com/api/v1/password/update`, passwords, config);

        dispatch(updatePasswordSuccess(data));
    } catch (error) {
        // dispatch(updatePasswordFail(error.response.data.message));
        console.error("Update Password Error: ", error);
        dispatch(updatePasswordFail(error.response?.data?.message || "Something went wrong"));
    }
};

// Forgot  Passworrd
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());

        const config = {
            headers: { "Content-Type": "application/json"  },
            withCredentials: true,
        };

        const { data } = await axios.post(`https://shoppingkaro-65sf.onrender.com/api/v1/password/forgot`, email, config);

        dispatch(forgotPasswordSuccess(data.message));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message));
    }
};

// Reset  Passworrd
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const { data } = await axios.put(`https://shoppingkaro-65sf.onrender.com/api/v1/password/reset/${token}`, passwords, config);

        dispatch(resetPasswordSuccess(data.success));
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message));
    }
};


//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearAllErrors());
}