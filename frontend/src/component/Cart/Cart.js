import React, { Fragment } from 'react'
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@mui/material";
import { TbShoppingCartOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            toast.error("Out of stock")
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            toast.error("total cannot be 0")
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <TbShoppingCartOff />
                    <Typography>No Product in Your Cart</Typography>
                    <Link className='emptyCartBtn' to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className='cartPageContainer'>
                        <div className="cartPage">
                        <h1 className='cartPageHeading'>Cart</h1>
                        <div className="cartHeader">
                            <p></p>
                            <p>Product</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map((item) => (
                            <div className="cartRow" key={item.product}>
                                <button className="remove-btn" onClick={() => deleteCartItems(item.product)}>✕</button>
                                <div className="cart-product-info">
                                    <img src={item.image} alt={item.name} />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                                <p>₹{item.price.toFixed(2)}</p>
                                <div className="cart-quantity-box">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                    <input type="text" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}

                        <div className="cart-summary">
                            <h3>Cart Totals</h3>
                            <div className="cart-summary-line">
                                <span>Subtotal</span>
                                <span>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
                            </div>
                            <div className="cart-summary-line">
                                <span>Total</span>
                                <span>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
                            </div>
                            <p className="coupon">Have a coupon?</p>
                            <button className="checkout-btn" onClick={checkoutHandler}>CHECKOUT</button>
                        </div>
                    </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Cart;
