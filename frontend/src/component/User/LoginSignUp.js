import React, { Fragment, useRef, useState, useEffect } from 'react';
import "./LoginSignUp.css";
import { CiMail } from "react-icons/ci";
import { AiOutlineLock } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';

const LoginSignUp = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);

    const loginTab = useRef(null);    //alternative of DOM query - document.querySelector(".loginForm")
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
        toast.success("registration Successfully");
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){   // usr cant access page while logged in
            navigate('/account');
        }
    }, [dispatch, error, toast, navigate, isAuthenticated])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };


    return (
        <Fragment>
            {loading ? <Loader /> : 
            <Fragment>
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>

                        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <CiMail />
                                <input type="email" required placeholder='Email'
                                    value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <AiOutlineLock />
                                <input type="password" required placeholder='Password'
                                    value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forgot Password?</Link>
                            <input type="submit" value="Login" className='loginBtn' />
                        </form>

                        <form className='signUpForm'
                            ref={registerTab}
                            encType='multipart/form-data'
                            onSubmit={registerSubmit}
                        >
                            <div className="signUpName">
                                <BiUserCircle />
                                <input type="text" placeholder='Name'
                                    required name='name' value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpEmail">
                                <CiMail />
                                <input type="email" required placeholder='Email'
                                    name="email" value={email} onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpPassword">
                                <AiOutlineLock />
                                <input type="password" required placeholder='Password'
                                    name='password' value={password} onChange={registerDataChange}
                                />
                            </div>
                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input type="file" name="avatar"
                                    accept='image/*' onChange={registerDataChange}
                                />
                            </div>
                            <input type="submit" value="Register" className='signUpBtn' />

                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default LoginSignUp