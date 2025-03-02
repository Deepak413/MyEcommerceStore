//add http://localhost:4000 this in productAction.js to get all products and product details
// all errors getting in Action files
//all errors removed after adding http://localhost:4000 in all action files call


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


// import ProtectedRoute from './component/Route/ProtectedRoute';

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("https://shoppingkaro-65sf.onrender.com/api/v1/stripeapikey");

      setStripeApiKey(data.stripeApiKey);
    }catch(err){
      console.log(err);
      console.error('Error fetching Stripe API key:', err.response ? err.response.data : err.message);
    }
    
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();

  }, [])
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        {stripeApiKey && (
          <Route path="/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          }
          />
        )}
        <Route exact path='/' Component={Home} />
        <Route exact path='/product/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route path='/products/:keyword' Component={Products} />

        <Route exact path='/search' Component={Search} />

        <Route exact path="/contact" Component={Contact} />

        <Route exact path="/about" Component={About} />

        <Route exact path='/account' Component={Profile} />

        <Route exact path='/me/update' Component={UpdateProfile} />

        <Route exact path='/password/update' Component={UpdatePassword} />

        <Route exact path='/password/forgot' Component={ForgotPassword} />

        <Route exact path='/password/reset/:token' Component={ResetPassword} />

        <Route exact path='/login' Component={LoginSignUp} />

        <Route exact path='/cart' Component={Cart} />

        <Route exact path='/shipping' Component={Shipping} />

        <Route exact path='/success' Component={OrderSuccess} />

        <Route exact path='/orders' Component={MyOrders} />

        <Route exact path='/order/confirm' Component={ConfirmOrder} />

        <Route exact path='/order/:id' Component={OrderDetails} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
