
// import { useEffect, useState } from "react";

// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { loadStripe } from "@stripe/stripe-js";

// function Payment({newRequestBody}) {
//   const [stripePromise, setStripePromise] = useState(null);
//   const [clientSecret, setClientSecret] = useState(null);

//   useEffect(() => {
//     fetch("https://mooreserver.onrender.com/checkout/config").then(async (r) => {
//       const { publishableKey } = await r.json();
//       console.log(publishableKey)
//       setStripePromise(loadStripe(publishableKey));
//     });
//   }, []);

//   console.log(stripePromise)

//   useEffect(() => {
//      fetch("https://mooreserver.onrender.com/checkout/create_payment_intent", {
//       method: "POST",
//       body: JSON.stringify({newRequestBody}),
//       headers: {"Content-Type":"application/json"}
//     }).then(async (result) => {
//       console.log(result)
//       const { client_secret : clientSecret } = await result.json();
//       console.log(clientSecret)
//       setClientSecret(clientSecret);
//     });
//   }, [newRequestBody]);

//   console.log(clientSecret)

//   return (
//     <>
//     <div className="pay"  style={{paddingTop:"300px"}}>
//       <h1>React Stripe and the Payment Element</h1>
//       {clientSecret && stripePromise && (
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <CheckoutForm />
//         </Elements>
//       )}
//       </div>
//     </>
//   );
// }

// export default Payment;


const stripePromise =
    loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
};


const res = await fetch("https://mooreserver.onrender.com/checkout/create-intent", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
});

const {client_secret: clientSecret} = await res.json();

// Use the clientSecret and Elements instance to confirm the setup
const {error} = await stripe.confirmPayment({
  elements,
  clientSecret,
  confirmParams: {
    return_url: 'https://example.com/order/123/complete',
  },
  // Uncomment below if you only want redirect for redirect-based payments
  // redirect: "if_required",
});

if (error) {
  handleError(error);
}


function Payment() {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
