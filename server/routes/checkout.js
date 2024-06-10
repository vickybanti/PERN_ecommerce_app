// Replace if using a different env file or config
require("dotenv").config();
const router = require("express").Router();
const pool = require("../db");
const crypto = require("crypto");
const sendEmail = require("../sendEmail")
const myModule = require("../template");

const { resolve } = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });
const calculateTax = false;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
   
});



console.log(stripe)
//ORDER EMAIL
const orderEmail = myModule.createOrderEmail;
    


router.use(express.static(process.env.STATIC_DIR));


router.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

//const calculate_tax = async (orderAmount, currency) => {
//    const taxCalculation = await stripe.tax.calculations.create({
//        currency,
//        customer_details: {
//            address: {
//                line1: "10709 Cleary Blvd",
//                city: "Plantation",
//                state: "FL",
//                postal_code: "33322",
//                country: "US",
//            },
//            address_source: "shipping",
//        },
//        line_items: [
//            {
//                amount: orderAmount,
//                reference: "ProductRef",
//                tax_behavior: "exclusive",
//                tax_code: "txcd_30011000"
//            }
//        ],
//    });

//    return taxCalculation;
//};

router.post("/create_payment_intent",async (req, res) => {

  
    const { cart, email, userId, city,firstName, lastName, country, state, street1, street2,phoneNumber } = req.body;
    const stringForm = JSON.stringify(req.body.formValues)


    function getMonthInWords() {
      const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ];
    
      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();
      const currentMonthInWords = months[currentMonthIndex];
    
      return currentMonthInWords;
    }
    
    const currentMonth = getMonthInWords();
    const currentDate = new Date();



    console.log(userId)
    console.log(email)
    console.log(firstName)
    console.log(lastName)
    console.log(country)
    console.log(state)
    console.log(street1)
    console.log(street2)
    console.log(city)
    console.log(phoneNumber) 
    console.log(stringForm) 

    


    

    const carts = JSON.parse(cart)
    
 
    
   const total =  carts.map((item) => (
    item.price * 100
       
  ));
  const proIdCountPairs = carts.map((item) => ({ id: item.id, count: parseInt(item.count) }));

  //const total = parseFloat(totals)

  
    
        
         
        
      //let orderAmount = total;
      //let paymentIntent;

    try {
        //if (calculateTax) {
        //    let taxCalculation = await calculate_tax(orderAmount, "usd")

        //    paymentIntent = await stripe.paymentIntents.create({
        //        currency: 'usd',
        //        amount: taxCalculation.amount_total,
        //        automatic_payment_methods: { enabled: true },
        //        metadata: { tax_calculation: taxCalculation.id }
        //    });
        //}
        //else {
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'usd',
                amount: total,
                automatic_payment_methods: { enabled: true }
            });
        


        const createOrder = await pool.query(`INSERT INTO orders (user_id,order_id,firstname, lastname,cart,
        country, city, state, street1,street2, email, phone_number, payment_status, payment_intent, delivery_status, subtotal, total,date, month)
      VALUES('${userId}','${paymentIntent}','${firstName}','${lastName}','${cart}','${country}',
      '${city}','${state}','${street1}','${street2}','${email}','${phoneNumber}', 'paid','${paymentIntentId}',
      'pending','${total}','${total}','${currentDate}', '${currentMonth}')`);




        // await Promise.all(proIdCountPairs.map(async ({ id, count }) => {
        //   await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [count, id]);
        //     await pool.query('COMMIT');
        //   }))




        res.send({
            clientSecret: paymentIntent.client_secret,
           orders: createOrder.rows,
        });

    
      } catch (e) {
        return res.status(400).send({
          error: {
            message: e.message,
          },
        });
       }



  
  
  

  
    })

router.post('/webhook', async (req, res) => {
    let data, eventType;

    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        data = event.data;
        eventType = event.type;
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // we can retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }

    if (eventType === 'payment_intent.succeeded') {
        // Funds have been captured
        // Fulfill any orders, e-mail receipts, etc
        // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
        console.log('💰 Payment captured!');
    } else if (eventType === 'payment_intent.payment_failed') {
        console.log('❌ Payment failed.');
    }
    res.sendStatus(200);
});



    // Send publishable key and PaymentIntent details to client
    
    
        router.get('/session-status', async (req, res) => {
          const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        
          res.send({
            status: session.status,
            customer_email: session.customer_details.email
          });
        });
        

        // const send_to = email;
        // const subject = "New orders";
        // const sent_from = "olamuyiwavictor@outlook.com";
        // const message =  orderEmail(currentDate, paymentIntentId, carts,total)
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // await sendEmail(subject, message, send_to, sent_from);

      
      
      
 
  

  router.post("/payOnDelivery", async(req,res) => {
    const { cartItems,stock,totalPrice, email, city,userId, firstName, lastName, country, state, street1, street2,phoneNumber } = req.body;
    console.log(cartItems)
    console.log(email)
    console.log(city)
    console.log(userId)
    function getMonthInWords() {
      const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ];
    
      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();
      const currentMonthInWords = months[currentMonthIndex];
    
      return currentMonthInWords;
    }
    
    const currentMonth = getMonthInWords();
    const currentDate = new Date();


   
    const carts = JSON.parse(cartItems)
    const proIdCountPairs = carts.map((item) => ({ id: item.id, count: parseInt(item.count) }));


    const total = parseFloat(totalPrice)
    const cartImages = carts.map((item) => item.images)
    const title = carts.map((item) => item.title)
    const cartId = carts.map((item) =>item.id)
    
    console.log(cartItems)
    console.log(email)
    console.log(firstName)
    console.log(lastName)
    console.log(country)
    console.log(state)
    console.log(totalPrice)
    console.log(userId)
    console.log(currentMonth)
    console.log(stock)
    
const generateTransactionCode = () => {
  // Generate a random string of 6 characters
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += chars[crypto.randomInt(chars.length)];
  }

  return code;
};

    try {  
      const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += chars[crypto.randomInt(chars.length)];
  }
  const createOrder =await pool.query(`INSERT INTO orders (user_id,order_id,firstname, lastname,cart,
      country, city, state, street1,street2, email, phone_number, payment_status, delivery_status, subtotal, total, date,month)
    VALUES('${userId}','${code}','${firstName}','${lastName}','${cartItems}','${country}',
    '${city}','${state}','${street1}','${street2}','${email}','${phoneNumber}', 'pay on delivery',
    'pending','${total}','${total}', '${currentDate}', '${currentMonth}')` );

     
    
    
      await Promise.all(proIdCountPairs.map(async ({ id, count }) => {
      await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [count, id]);
        await pool.query('COMMIT');
      }))

        
        
              const send_to = email;
              const subject = "New orders";
              const sent_from = "olamuyiwavictor@outlook.com";
              const message =  orderEmail(currentDate, code, carts,total)
              await new Promise((resolve) => setTimeout(resolve, 1000));
              await sendEmail(subject, message, send_to, sent_from);
  
     
    res.json(createOrder.rows); 
 
  
    
} catch (err) {
  console.error(err.message)
    
  }
  })



module.exports=router;
