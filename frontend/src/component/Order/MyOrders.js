import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { BiFontFamily } from "react-icons/bi";
import { Typography } from "@mui/material";
import { AiFillShopping } from "react-icons/ai";

const MyOrders = () => {

  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  console.log("Entered in MyOrders.js with user : ", user);
  console.log("Also with orders : ", orders);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <Fragment>
      <MetaData title={`${user?.user?.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersContainer">

          <h2 className="ordersHeading">My Orders</h2>

          {orders && orders.length === 0 && (
            <div className="noOrders">
              <AiFillShopping />
              <Typography>You have not placed any order yet.</Typography>
              <Link className='noOrdersBtn' to="/products">View Products</Link>
            </div>
          )}

          {orders &&
            orders.map((order) => (
              <div key={order._id} className="orderCard">

                <div className="orderHeader">
                  <div style={{ fontFamily: "monospace", textTransform: "uppercase" }}>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="orderStatus">
                    <span
                      className={
                        order.orderStatus === "Delivered"
                          ? "statusDelivered"
                          : "statusProcessing"
                      }
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="orderItems">

                  {order.orderItems.map((item, index) => (
                    <div key={index} className="orderItem">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="orderItemImage"
                      />

                      <div className="orderItemDetails">
                        <p className="productName">{item.name}</p>
                        <p>
                          {item.name.length > 40
                            ? item.name.substring(0, 40) + "..."
                            : item.name}
                        </p>
                        <p>Price: ₹{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}

                </div>

                <div className="orderFooter">

                  <div style={{ fontFamily: "monospace" }}>
                    <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                    <p><strong>Payment:</strong> {order.paymentInfo.status}</p>
                  </div>

                  <Link to={`/order/${order._id}`} className="viewOrderBtn">View Order</Link>

                </div>

              </div>
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;