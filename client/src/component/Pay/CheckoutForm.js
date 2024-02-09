import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // if (!clientSecret) {
    //   return;
    // }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
  
    setIsLoading(true);
  
    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      console.error(submitError);
      return;
    }
  
    // Create the SetupIntent and obtain clientSecret
    const res = await fetch("/create-intent", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
    });
  
    const {client_secret: clientSecret} = await res.json();
  
    // Use the clientSecret and Elements instance to confirm the setup
    const {error} = await stripe.confirmSetup({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
      // Uncomment below if you only want redirect for redirect-based payments
      // redirect: "if_required",
    });
  
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="CheckoutForm">
    <label>
      Card details
      
    </label>
    <PaymentElement />
    <button id="submit">Submit</button>
  </div>
  );
}