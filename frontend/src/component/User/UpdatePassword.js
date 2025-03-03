import "./UpdatePassword.css";
import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLock } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import { RiKeyLine } from "react-icons/ri";

import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
import { updatePasswordReset } from '../../reducers/userReducer';
import MetaData from '../layout/MetaData';
import { toast } from "react-toastify";


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector((state) => state.user);
    console.log("Inside UpdatePassword.js token : ", user.token);
    console.log("Inside UpdatePassword.js token from localstorage : ", localStorage.getItem("Cookies"));

    const { error, isUpdated, loading } = useSelector((state) => state.profile);


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        if (error)
            console.log("getting error while updating password : ", error);
        console.log("dispatching password update");
        dispatch(updatePassword(user.token, myForm));
    };

    useEffect(() => {
        if (error) {
            console.log("inside UpdatePassword.js error : ", error);
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Password Changed Successfully");

            navigate("/account");

            dispatch(updatePasswordReset());
        }
    }, [dispatch, error, toast, navigate, isUpdated]);


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Update Profile</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <RiKeyLine />
                                    <input
                                        type="password" placeholder="Old Password"
                                        required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <AiOutlineLock />
                                    <input
                                        type="password" placeholder="New Password" required
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <AiFillLock />
                                    <input
                                        type="password" placeholder="Confirm Password" required
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit" value="Change" className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UpdatePassword