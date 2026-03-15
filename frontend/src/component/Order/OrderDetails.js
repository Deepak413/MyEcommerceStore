import { React, Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { FaRegCopy } from "react-icons/fa";
import { TbAddressBook } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";


import { toast } from "react-toastify";

const OrderDetails = () => {

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { id } = useParams();

  const dispatch = useDispatch();

  console.log("order in OrderDetails : ", order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));

  }, [dispatch, toast, error, id]);

  return (
    <Fragment>

      {loading ? <Loader /> : (

        <Fragment>

          <MetaData title="Order Details" />

          <div className="orderPage">

            <div className="orderLeft">

              {/* <h2>Order #{order && order._id}</h2> */}

              {order && order.orderItems &&
                order.orderItems.map((item) => (

                  <div className="orderProductCardContainer">
                    <div className="orderProductCard" key={item.product}>

                      <img src={item.image} alt={item.name} />

                      <div className="orderProductInfo">

                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>

                        <p>
                          {item.quantity} × ₹{item.price}
                        </p>

                      </div>

                      <div className="orderProductTotal">
                        ₹{item.price * item.quantity}
                      </div>

                    </div>
                    <div className="orderProductCardBtns">
                      <Link to="/">Return</Link>
                      <Link to="/">Chat with us</Link>
                    </div>
                  </div>
                ))}

              <div className="orderStatusCard">

                <p className="orderStatusSuccess">
                  {order.orderStatus}
                </p>

                <span>
                  {order?.orderStatus === "Delivered"
                    ? "Your item has been successfully delivered. We hope you enjoy your purchase!"
                    : "Your item has been processed and will be delivered soon."}
                </span>

              </div>
              <div className="orderIdDetails">
                <p>Order #{order && order._id}</p>
                <FaRegCopy />
              </div>

            </div>

            <div className="orderRight">

              <div className="orderCardContainer">

                <h3>Delivery Details</h3>
                <div className="orderDeliveryDetailContainer">

                  <div className="orderDeliveryDetailCard">
                    <FaRegCopy />
                    <span>
                      <b>Address</b>
                    </span>
                    <p>
                      {order.shippingInfo &&
                        (() => {
                          const address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`;
                          return address.length > 30 ? address.substring(0, 30) + "..." : address;
                        })()}
                    </p>

                  </div>
                  <div className="orderDeliveryDetailCard">
                    <FaRegUser />
                    <span>
                      <b>{order.user && order.user.name}</b>
                    </span>
                    <p>{order.shippingInfo && order.shippingInfo.phoneNo}</p>

                  </div>
                </div>
              </div>

              <div className="orderCardContainer">

                <h3>Price Details</h3>

                <div className="orderPriceDetailContainer">
                  <div className="priceRow">
                    <span>Items Price</span>
                    <span>₹{order && order.itemsPrice}</span>
                  </div>

                  <div className="priceRow">
                    <span>Tax</span>
                    <span>₹{order && order.taxPrice}</span>
                  </div>

                  <div className="priceRow">
                    <span>Shipping</span>
                    <span>₹{order && order.shippingPrice}</span>
                  </div>

                  <hr />

                  <div className="priceRow total">
                    <span>Total</span>
                    <span>₹{order && order.totalPrice}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </Fragment>

      )}

    </Fragment>
  );
};

export default OrderDetails;