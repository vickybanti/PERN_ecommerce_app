import {loadStripe} from "@stripe/stripe-js";
import {
  Elements,
  linkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!stripe) {
    // Stripe.js hasn't yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    return;
  }

  setLoading(true);

  // Trigger form validation and wallet collection
  const {error: submitError} = await elements.submit();
  if (submitError) {
    handleError(submitError);
    return;
  }
}
// const CheckoutPage = ({clientSecret}) => (
//   <Elements stripe={stripe} options={{clientSecret, appearance, loader}}>
//     <CheckoutForm />
//   </Elements>
// );

export default function CheckoutForm() {
  return (
    <form>
      <h3>Contact info</h3>
      <linkAuthenticationElement/>
      <h3>Payment</h3>
      <button type="submit">Submit</button>
    </form>
  );
}



