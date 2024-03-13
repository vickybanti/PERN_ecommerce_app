import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

function Payment(props, requestBody) {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const pay = async () => {
      try {
        const response = await fetch("https://mooreserver.onrender.com/checkout/create-payment-intent", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
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
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
}

export default Payment;
