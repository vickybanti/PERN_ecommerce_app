import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_live_51NDulnFA3ATF2zMuDUWo4t8bpy3wcz4HJwpdWn1OYJEBQm2f2TErzhMFWIL8vHbpkqojlDBkqT7w8UA0VpaGd2WT00o35YyMxG");

export default function Payment({newRequestBody}) { 
    const [clientSecret, setClientSecret] = useState("");
    console.log(newRequestBody)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://mooreserver.onrender.com/checkout/create_payment_intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newRequestBody }),
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