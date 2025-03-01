import "./ResetPassword.css";
import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  AiFillLock } from "react-icons/ai";
import { RiKeyLine } from "react-icons/ri";

import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();
    console.log("token = ");
    console.log(token);

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Password Updaed/Reset Successfully");

            navigate("/login");

        }
    }, [dispatch, error, toast, navigate, success]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Reset Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Reset Password</h2>

                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <RiKeyLine />
                                    <input
                                        type="password" placeholder="New Password"
                                        required value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <AiFillLock />
                                    <input
                                        type="password" placeholder="Confirm New Password" required
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit" value="Update" className="resetPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ResetPassword