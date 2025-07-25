import React, { Fragment, useState } from 'react';
import "./Header.css";
import { SpeedDialAction, SpeedDial } from '@mui/material';
import { Backdrop } from '@mui/material';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsPersonCircle } from 'react-icons/bs';
import { RxExit } from 'react-icons/rx';
import { BsFillCartFill } from 'react-icons/bs';
import { FaRegListAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log("inside userOptions");
    // console.log(user);



    const options = [
        { icon: <FaRegListAlt />, name: "Orders", func: orders },
        { icon: <BsPersonCircle />, name: "Profile", func: account },
        {
            icon: <BsFillCartFill style={{ color: cartItems.length > 0 ? "#ff6600" : "unset" }} />,
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <RxExit />, name: "Logout", func: logoutUser },
    ];

    if (user?.user?.role === "admin") {
        options.unshift({
            icon: <LuLayoutDashboard />,
            name: "Dashboard",
            func: dashboard,
        });
    }
    // console.log(user)
    // console.log(options)

    function dashboard() {
        navigate("/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(logout());
        toast.success("Logout Successfully");
        navigate("/login");
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{zIndex:10 }} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='up'
                style={{zIndex:11, position: 'fixed', bottom: 80, right: 25}}
                className='speedDial'
                icon={
                    <img
                        className='speedDialIcon'
                        src={user?.user?.avatar ? user?.user?.avatar?.url : "/Profile.png"}
                        alt='Profile'
                    />
                }
            >
                {options.map((item) =>(
                    <SpeedDialAction 
                        key={item.name} 
                        icon={item.icon} 
                        tooltipTitle={item.name} 
                        tooltipOpen={window.innerWidth<=600?true:false} 
                        onClick={item.func}/>
                ))}
            </SpeedDial>
        </Fragment>
        // <Fragment>
        //     <Backdrop open={open} style={{ zIndex: 10 }} />
        //     <SpeedDial
        //         ariaLabel='SpeedDial tooltip example'
        //         onClose={() => setOpen(false)}
        //         onOpen={() => setOpen(true)}
        //         open={open}
        //         direction='down'
        //         FabProps={{
        //             size: 'small',
        //             style: {
        //                 background: 'transparent',
        //                 boxShadow: 'none',
        //             }
        //         }}
        //         sx={{ position: 'relative' }}
        //         style={{ zIndex: 11 }}
        //         className='speedDial'
        //         icon={
        //             <img
        //                 className='speedDialIcon'
        //                 src={user?.user?.avatar ? user?.user?.avatar?.url : "/Profile.png"}
        //                 alt='Profile'
        //             />
        //         }
        //     >
        //         {options.map((item) => (
        //             <SpeedDialAction
        //                 key={item.name}
        //                 icon={item.icon}
        //                 tooltipTitle={item.name}
        //                 tooltipOpen={window.innerWidth <= 600 ? true : false}
        //                 onClick={item.func} />
        //         ))}
        //     </SpeedDial>
        // </Fragment>

    )
}

export default UserOptions;