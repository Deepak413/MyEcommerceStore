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
    updateProfileSuccess,
    updateUserRequest,updateUserSuccess,updateUserFail,updateUserReset,
    deleteUserRequest, deleteUserSuccess, deleteUserFail, deleteUserReset,
    allUsersRequest, allUsersSuccess, allUsersFail, userDetailsRequest, userDetailsSuccess, userDetailsFail
} from "../reducers/userReducer";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const { data } = await axios.post(`https://shoppingkaro-65sf.onrender.com/api/v1/login`, { email, password }, config);
        console.log("In login in userAction, data : ", data);
        
        dispatch(loginSuccess(data));
        toast.success("Login Successful 🎉");
    } catch (error) {
        console.error(error);
        toast.error(error);

        let message = "Error occurred while login";

        if (error.response && error.response.data.message) {
            message = error.response.data.message;  // If response exists, use it
        } else if (error.request) {
            message = "Network error: No response from server";
        } else {
            message = error.message;
        }

        dispatch(loginFail(message));
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerUserRequest());

        const config = {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        };

        const { data } = await axios.post(`https://shoppingkaro-65sf.onrender.com/api/v1/register`, userData, config);
        console.log("In register in userAction, data : ", data);

        dispatch(registerUserSuccess(data.user));
        toast.success("Registration Successful 🎉");
    } catch (error) {
        console.log(error);

        let message = "Something went wrong while registration";

        if (error.response && error.response.data.message) {
            message = error.response.data.message;
        }else {
            message = error.message;
        }

        dispatch(registerUserFail(message));
    }
};

//Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());

        const { data } = await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/me`);
        console.log("In loadUser in userAction, data : ", data);


        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail());
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`https://shoppingkaro-65sf.onrender.com/api/v1/logout`);
        console.log("In logout in userAction, User logged out!!");

        // localStorage.removeItem("token");
        dispatch(logoutSuccess());
        // window.location.reload();
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

        console.log("data in forgotPassword from API in userAction : ", data);

        dispatch(forgotPasswordSuccess(data.message));
    } catch (error) {
        console.log("error in forgotPassword from API in userAction : ", error)
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

// Get All Users for admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(allUsersRequest());

        const { data } = await axios.get(
            "https://shoppingkaro-65sf.onrender.com/api/v1/admin/users"
        );

        dispatch(allUsersSuccess(data.users));

    } catch (error) {
        dispatch(
            allUsersFail(
                error.response?.data?.message || "Failed to fetch users"
            )
        );
    }
};


// Get User Details for admin
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch(userDetailsRequest());

        const { data } = await axios.get(
            `https://shoppingkaro-65sf.onrender.com/api/v1/admin/user/${id}`
        );

        dispatch(userDetailsSuccess(data.user));

    } catch (error) {
        dispatch(
            userDetailsFail(
                error.response?.data?.message || "Failed to fetch user details"
            )
        );
    }
};


// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `https://shoppingkaro-65sf.onrender.com/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch(updateUserSuccess(data.success));

    } catch (error) {
        dispatch(
            updateUserFail(
                error.response?.data?.message || "Failed to update user"
            )
        );
    }
};


// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());

        const { data } = await axios.delete(
            `https://shoppingkaro-65sf.onrender.com/api/v1/admin/user/${id}`
        );

        dispatch(deleteUserSuccess(data.success));

    } catch (error) {
        dispatch(
            deleteUserFail(
                error.response?.data?.message || "Failed to delete user"
            )
        );
    }
};


//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearAllErrors());
}