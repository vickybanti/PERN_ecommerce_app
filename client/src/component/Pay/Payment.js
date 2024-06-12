import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useParams } from 'react-router-dom';
import { request } from "../../../../../../../../AppData/Local/Microsoft/TypeScript/5.2/node_modules/undici-types/api";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51NDulnFA3ATF2zMuXsGjxz0JMzcX6Hj0QEQRBDx2RenNEnv3yz2R0WxB9cmSBhwrYzSMHago4LCa6nYPrSUkwBMu00Nx7VrwrY")


export default function Payment() {
    const { requestBody } = useParams();

    const [clientSecret, setClientSecret] = useState("");
    console.log("requestBody", requestBody)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://mooreserver.onrender.com/checkout/create_payment_intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( requestBody ),
        })

            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
        
    }, [newRequestBody]);

    console.log(clientSecret)

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div style={{paddingTop:"200px"} }>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}