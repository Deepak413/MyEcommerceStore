import React, { useEffect, useState } from "react";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Payment from "./Payment";
import Loader from "../layout/Loader/Loader";

const PaymentWrapper = () => {

    const [stripeApiKey, setStripeApiKey] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getStripeApiKey = async () => {

            try {

                const { data } = await axios.get(
                    "https://shoppingkaro-65sf.onrender.com/api/v1/stripeapikey"
                );
                console.log("in PaymentWrapper.js, data from API : ", data);

                setStripeApiKey(data.stripeApiKey);

            } catch (error) {
                console.error('Error fetching Stripe API key in PaymentWrapper.js :' , error);
            } finally {

                setLoading(false);

            }
        };

        getStripeApiKey();

    }, []);

    if (loading) return <Loader />;

    return (
        <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment />
        </Elements>
    );
};

export default PaymentWrapper;