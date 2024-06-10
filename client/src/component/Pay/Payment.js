import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

function Payment(props) {
    const { stripePromise } = props;
    const [clientSecret, setClientSecret] = useState('');
    console.log("stripepromis", stripePromise)

    useEffect(() => {
        async function getSecret() {
            try {
                const response = await fetch("https://mooreserver.onrender.com/checkout/create_payment_intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                const { clientSecret } = data; // Destructure clientSecret from the response data


                setClientSecret(clientSecret);
                console.log(clientSecret)
            } catch (error) {
                console.error("Error fetching secret:", error);
            }
        }

        getSecret();
    }, []);



    return (
        <>
            <div style={{paddingTop:"200px"} }>
            <h1>Payment</h1>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
            </div>
        </>
    );
}

export default Payment;