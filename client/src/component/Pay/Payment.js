
import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment({newRequestBody}) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("https://mooreserver.onrender.com/checkout/config").then(async (r) => {
      const { publishableKey } = await r.json();
      console.log(publishableKey)
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  console.log(stripePromise)

  useEffect(() => {
     fetch("https://mooreserver.onrender.com/checkout/create-payment-intent", {
      method: "POST",
      body: JSON.stringify(newRequestBody),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      console.log(result.json())
      console.log(clientSecret)
      setClientSecret(clientSecret);
    });
  }, [newRequestBody]);

  console.log(clientSecret)

  return (
    <>
    <div className="pay"  style={{paddingTop:"300px"}}>
      <h1>React Stripe and the Payment Element</h1>
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
