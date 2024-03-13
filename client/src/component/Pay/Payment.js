import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { makeRequest } from '../../makeRequest';

function Payment(props, requestBody) {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState([]);


  useEffect(() => {
    async function pay(){
      try {
        const response = await makeRequest.get("/checkout/create-payment-intent");
        console.log(response)

        const data = await response.json();
        console.log(data)
        setClientSecret(data.client_secret); // Use data.client_secret instead of data.clientSecret
      } catch (error) {
        console.error("Error fetching client secret:", error.message);
      }
    };

    pay();
  }, [requestBody]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret: `${clientSecret}`, // Use clientSecret as it is now in the correct format
    appearance,
  };

  console.log(options)
  return (
    <>
      <div className='pay'>
        <h1>Payment</h1>
        {(
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm clientSecret={clientSecret}/>
          </Elements>
        )}
      </div>
    </>
  );
}

export default Payment;
