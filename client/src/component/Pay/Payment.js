import {useEffect, useState} from 'react';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

function Payment(props,requestBody) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const makePay = async() => {

    
    await fetch("https://mooreserver.onrender.com/checkout/create-payment-intent",{
      method:"GET",
      // body:JSON.stringify(requestBody),
      // headers:{"Content-Type":"application/json"}
    })
      .then((res) => res.json())
      .then(({client_secret}) => setClientSecret(client_secret));
  }
  makePay()
  }, [requestBody]);

  console.log(stripePromise)
  console.log(clientSecret)


  return (
    <>
    <div className='pay'>
      <h1>Payment</h1>
      {(
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </>
  );
}

export default Payment;