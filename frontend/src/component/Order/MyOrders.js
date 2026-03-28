import React, { Fragment, useEffect, useState } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";

const MyOrders = () => {

  const dispatch = useDispatch();

  const { loading, error, orders, totalOrders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  console.log("Entered in MyOrders.js with user : ", user);
  console.log("Also with orders : ", orders);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (orders && orders.length > (orders?.totalOrders || 0)) {
      setHasMore(false);
    }
  }, [orders]);

  useEffect(() => {
    dispatch(myOrders(1));
    // console.log("scrollHeight : ", document.documentElement.scrollHeight);
    // console.log("innerHeight : ", window.innerHeight);
    // console.log("scrollTop : ", document.documentElement.scrollTop);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const fetchMoreData = () => {
    console.log("Fetching next order page...");
    const nextPage = page + 1;
    setPage(nextPage);

    dispatch(myOrders(nextPage));
  };

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

          <InfiniteScroll
            dataLength={orders.length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more orders</b>
              </p>
            }

          >
            {orders && orders.map((order) => (
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
          </InfiniteScroll>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;