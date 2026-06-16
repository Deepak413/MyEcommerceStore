import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Header from "./component/layout/Header/Header"
import Footer from "./component/layout/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import webFont from "webfontloader";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import axios from 'axios';
import Payment from "./component/Cart/Payment.js"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import About from './component/layout/About/About.js';
import Contact from './component/layout/Contact/Contact.js';
import PaymentWrapper from './component/Cart/PaymentWrapper.js';
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import Dashboard from './component/Admin/Dashboard.js';
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
  }, [])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/search" element={<Search />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginSignUp />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/process/payment" element={<PaymentWrapper />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute isAdmin />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/order/:id" element={<ProcessOrder />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />
      </Route>
    </Routes>

    // <Router>
    //   <Header />
    //   {isAuthenticated && <UserOptions user={user} />}

    //   <Routes>
    //     <Route path="/process/payment" element={<PaymentWrapper />} />
    //     <Route exact path="/" element={<Home />} />
    //     <Route exact path='/product/:id' Component={ProductDetails} />
    //     <Route exact path='/products' Component={Products} />
    //     <Route path='/products/:keyword' Component={Products} />

    //     <Route exact path='/search' Component={Search} />

    //     <Route exact path="/contact" Component={Contact} />

    //     <Route exact path="/about" Component={About} />

    //     <Route exact path='/account' Component={Profile} />

    //     <Route exact path='/me/update' Component={UpdateProfile} />

    //     <Route exact path='/password/update' Component={UpdatePassword} />

    //     <Route exact path='/password/forgot' Component={ForgotPassword} />

    //     <Route exact path='/password/reset/:token' Component={ResetPassword} />

    //     <Route exact path='/login' Component={LoginSignUp} />

    //     <Route exact path='/cart' Component={Cart} />

    //     <Route exact path='/shipping' Component={Shipping} />

    //     <Route exact path='/success' Component={OrderSuccess} />

    //     <Route exact path='/orders' Component={MyOrders} />

    //     <Route exact path='/order/confirm' Component={ConfirmOrder} />

    //     <Route exact path='/order/:id' Component={OrderDetails} />

    //     <ProtectedRoute
    //       isAdmin={true}
    //       exact
    //       path="/admin/dashboard"
    //       component={Dashboard}
    //     />
    //     <ProtectedRoute
    //       exact
    //       path="/admin/products"
    //       isAdmin={true}
    //       component={ProductList}
    //     />
    //     <ProtectedRoute
    //       exact
    //       path="/admin/product"
    //       isAdmin={true}
    //       component={NewProduct}
    //     />

    //     <ProtectedRoute
    //       exact
    //       path="/admin/product/:id"
    //       isAdmin={true}
    //       component={UpdateProduct}
    //     />
    //     <ProtectedRoute
    //       exact
    //       path="/admin/orders"
    //       isAdmin={true}
    //       component={OrderList}
    //     />

    //     <ProtectedRoute
    //       exact
    //       path="/admin/order/:id"
    //       isAdmin={true}
    //       component={ProcessOrder}
    //     />
    //     <ProtectedRoute
    //       exact
    //       path="/admin/users"
    //       isAdmin={true}
    //       component={UsersList}
    //     />

    //     <ProtectedRoute
    //       exact
    //       path="/admin/user/:id"
    //       isAdmin={true}
    //       component={UpdateUser}
    //     />

    //     <ProtectedRoute
    //       exact
    //       path="/admin/reviews"
    //       isAdmin={true}
    //       component={ProductReviews}
    //     />

    //   </Routes>

    //   <Footer />
    // </Router>
  );
}

export default App;
