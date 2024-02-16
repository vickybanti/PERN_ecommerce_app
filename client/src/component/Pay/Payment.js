import {useEffect, useState} from 'react';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

function Payment(props,requestBody) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
   
    
    fetch("https://mooreserver.onrender.com/checkout/create-payment-intent",{
      method:"POST",
      body:JSON.stringify(requestBody),
      headers:{"Content-Type":"application/json"}
    })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
  
  
  }, [requestBody]);

  console.log(stripePromise)
  console.log(clientSecret)

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
    <div className='pay'>
      <h1>Payment</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={ options }>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </>
  );
}

export default Payment;