import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Pay.scss"
import { Button } from "@mui/material";
import { makeRequest } from "../../makeRequest";

function Payment() {
  const cart = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state)=> state.totalPrice)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestBody = JSON.parse(searchParams.get('requestBody'));
  


  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    makeRequest.post("/checkout/create-payment-intent", {
      body: JSON.stringify(requestBody),
    })
      .then(async (result) => {
        if (!result.ok) {
          throw new Error("Failed to fetch payment intent");
        }
  
        const { clientSecret } = await result.data;
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching payment intent:", error);
      });
  }, [requestBody, setClientSecret]);
  
  // Render the CheckoutForm only when clientSecret is available
  return (
    <div className="pay">
      <h1>Items</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <span>{item.title}</span>
          <h4>Total Amount - {item.price * item.count}</h4>
        </div>
      ))}
  
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm requestBody={requestBody} />
        </Elements>
      )}
    </div>
  );
  
}

export default Payment;
