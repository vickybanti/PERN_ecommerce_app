const router = require("express").Router();
require("dotenv").config();
const express = require("express")
const pool = require("../db");
const authorization = require("../middleware/authorization")
const stripe = require("stripe")("sk_test_51NDulnFA3ATF2zMu8VuG068289VxPGuC2xFdTBQFWiX09vP7y1AWJOLRoxEjurV7gjjZw8WZpnXYAhcqX7qA5jze00afTsR0gt")
const bodyParser = require('body-parser')

router.post('/', async (req, res) => {
  const { cart, email, userId, city,firstName, lastName, country, state, street1, street2,phoneNumber } = req.body;
  
  const customer = await stripe.customers.create({
    metadata:{
      userId,
    }
  })

  const carts = JSON.parse(cart)
  const line_items =carts.map((item) => {
    return {
      price_data:{
        currency:"usd",
        product_data:{
          name:item.title,
          description:item.desc,
          metadata:{
            id:item.id
          }
        },
        unit_amount : item.price * 100
      }, 
      quantity: item.count
    }
  });

  
 
  //create order
  


  const session = await stripe.checkout.sessions.create({
    customer:customer.id,
    line_items, 
    mode: 'payment',
    success_url: `https://mooreserver.onrender.com/success`,
    cancel_url: `https://mooreserver.onrender.com/checkout`,

  });
  
  
  
  res.send({url: session.url});
  
});

const createOrder = async() => {

  const createOrder =await pool.query(`INSERT INTO orders (user_id,firstname, lastname,cart,country, city, state, street1, street2,email, phone_number,
 subtotal, total, payment_status, payment_intent   )
  VALUES('${userId}','${firstName}','${lastName}','${JSON.stringify(cart)}','${country}','${city}','${state}','${street1}','${street2}','${email}','${phoneNumber}' 
  '${data.subtotal}','${data.total}','${data.payment_status}','${data.payment_intent}')`)
  const getOrders = res.json(createOrder.rows)
  if (getOrders){
    console.log(getOrders)

  } else {
    console.error("Cannot get database")
  }

}


 
  

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_ea99f37947029a629717e424ea6de8ce5d78f490c39e6d1dca3901af4ffc445c";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(5000, () => console.log('Running on port 5000'));
// This is your Stripe CLI webhook secret for testing your endpoint locally.



module.exports = router;