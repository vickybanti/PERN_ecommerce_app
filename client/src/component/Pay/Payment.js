import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { makeRequest } from '../../makeRequest';

function Payment(props, requestBody) {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState(null); // Initialize clientSecret as null

  useEffect(() => {
    async function pay() {
      try {
        const response = await makeRequest.get("/checkout/create-payment-intent");
        const data = await response.json();

        console.log(data)
        setClientSecret(data.client_secret); // Use data.client_secret instead of data.clientSecret
      } catch (error) {
        console.error("Error fetching client secret:", error.message);
      }
    };

    pay();
  }, [requestBody]);

  console.log(clientSecret)



  const appearance = {
    theme: 'stripe',
  };

  // Check if clientSecret is valid before rendering Elements
  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  // Extracting id and secret from clientSecret
  const [id, secret] = clientSecret.split("_secret_");

  // Forming client secret in the required format
  const formattedClientSecret = `${id}_secret_${secret}`;

  const options = {
    clientSecret: formattedClientSecret, // Use the formatted client secret
    appearance,
  };


  console.log(options)
  return (
    <>
      <div className='pay' style={{paddingTop:"500px"}}>
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
