import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Pay.scss"
import { Button } from "@mui/material";

function Payment() {
  const cart = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state)=> state.totalPrice)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestBody = JSON.parse(searchParams.get('requestBody'));
  


  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/checkout/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    
     fetch("http://localhost:5000/checkout/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), 
      
      
      
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [requestBody]); 


  

  return (
    <div className="pay">
      <h1>Items</h1>
      {cart.map((item)=>(
        <><span>{item.title}</span><h4>Total Amount - {item.price * item.count}</h4></>
      ))}
      
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }} >
          <CheckoutForm requestBody={requestBody} />
        </Elements>
      )}

      
    </div>
    
  );
}

export default Payment;
