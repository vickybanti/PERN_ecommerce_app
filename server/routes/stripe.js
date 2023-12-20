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


 
  

const endpointSecret = "whsec_ea99f37947029a629717e424ea6de8ce5d78f490c39e6d1dca3901af4ffc445c";

router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  
  
  if(endpointSecret){

  
  let event;

  try {
    event = stripe.webhooks.constructEvent(JSON.stringify(request.rawBody), sig, endpointSecret);
    console.log("webhook verified")
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  const data = event.data.object;
  const eventType = event.type;
  console.log(data)
  console.log(eventType)

  if(eventType==="checkout.session.completed"){
    
    const paymentIntent = data.payment_intent;
    console.log(paymentIntent);
      }
    
    }
  // Handle the event
  

  
  

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.



module.exports = router;