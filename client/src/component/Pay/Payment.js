import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Pay.scss"

function Payment() {
  const cart = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state)=> state.totalPrice)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestBody = JSON.parse(searchParams.get('requestBody'));
  


  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://mooreserver.onrender.com/checkouts/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
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
