import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Pay.scss"
import { makeRequest } from "../../makeRequest";
const stripePromise = loadStripe("pk_test_51NDulnFA3ATF2zMuXsGjxz0JMzcX6Hj0QEQRBDx2RenNEnv3yz2R0WxB9cmSBhwrYzSMHago4LCa6nYPrSUkwBMu00Nx7VrwrY");

function Payment({requestBody}) {
  const cart = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state)=> state.totalPrice)
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const requestBody = JSON.parse(searchParams.get('requestBody'));
  


  const [clientSecret, setClientSecret] = useState("");

  console.log(clientSecret)
  console.log(stripePromise)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://mooreserver.onrender.com/checkout/create-payment-intent", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(requestBody),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => setClientSecret(data.clientSecret))
    
    .catch((error) => console.error('Error fetching payment intent:', error));
        
      
      
      
      
  }, [requestBody]);

  

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
  
      {stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm requestBody={requestBody} />
        </Elements>
      )}
    </div>
  );
  
}

export default Payment;
