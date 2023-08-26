import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import "./Pay.scss"

export default function CheckoutForm({requestBody}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,

      }
    });

    if (error) {
      setMessage(error.message);
    }else if(paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status: " + paymentIntent.status )
      console.log(paymentIntent.status)

      dispatch(clearCart())

      
    }
    else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button 
      width="50%"
      type="submit"
      color='primary'
      variant='contained'
      sx={{
          backgroundColor: "rgba(0,0,0,0.4)",
          color:"white",
          borderRadius:0,
          margin:"10px",
          padding:"15px 40px",
          fontSize:"20px"

      }}
                                 disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <Box className="message" id="payment-message">{message}</Box>}
    </form>
  );
}

