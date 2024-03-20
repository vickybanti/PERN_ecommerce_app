const { resolve } = require("path");
// Replace if using a different env file or config
require("dotenv").config();
const router = require("express").Router();
const express = require("express")
const pool = require("../db");
const crypto = require("crypto");
const stripe = require("stripe")('sk_test_51NDulnFA3ATF2zMu8VuG068289VxPGuC2xFdTBQFWiX09vP7y1AWJOLRoxEjurV7gjjZw8WZpnXYAhcqX7qA5jze00afTsR0gt')
const sendEmail = require("../sendEmail")

const myModule = require("../template");



//ORDER EMAIL
const orderEmail = myModule.createOrderEmail;
    


router.use(express.static(process.env.STATIC_DIR));


router.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

router.get("/config", (req, res) => {
  res.json({
    publishableKey: "pk_test_51NDulnFA3ATF2zMuXsGjxz0JMzcX6Hj0QEQRBDx2RenNEnv3yz2R0WxB9cmSBhwrYzSMHago4LCa6nYPrSUkwBMu00Nx7VrwrY"
  });
});

router.post("/create-payment-intent", async function handlePaymentIntent (req, res)  {

  
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
    
 
    
   const totals =  carts.map((item) => (
    item.price * 100
       
  ));
  const proIdCountPairs = carts.map((item) => ({ id: item.id, count: parseInt(item.count) }));

  const total = parseFloat(totals)

  try {
    
        
         
        
    const paymentIntent = stripe.paymentIntents.create({
      currency: 'USD',
      amount: total,
      payment_method_types:["card"],
      automatic_payment_methods: { enabled: true }
    });
          const paymentIntentId = paymentIntent.id
          console.log(paymentIntentId)
          
    const createOrder =await pool.query(`INSERT INTO orders (user_id,order_id,firstname, lastname,cart,
        country, city, state, street1,street2, email, phone_number, payment_status, payment_intent, delivery_status, subtotal, total,date, month)
      VALUES('${userId}','${paymentIntent}','${firstName}','${lastName}','${cart}','${country}',
      '${city}','${state}','${street1}','${street2}','${email}','${phoneNumber}', 'paid','${paymentIntentId}',
      'pending','${total}','${total}','${currentDate}', '${currentMonth}')` );

      

    
      // await Promise.all(proIdCountPairs.map(async ({ id, count }) => {
      //   await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [count, id]);
      //     await pool.query('COMMIT');
      //   }))
  
          
          console.log(paymentIntent.client_secret)
               
      
        res.send({
          publishableKey: "pk_test_51NDulnFA3ATF2zMuXsGjxz0JMzcX6Hj0QEQRBDx2RenNEnv3yz2R0WxB9cmSBhwrYzSMHago4LCa6nYPrSUkwBMu00Nx7VrwrY",
          client_secret: paymentIntent.id,
          // orders: createOrder.rows,
        });


      } catch (err) {
        console.error(err.message)
          
        }
        
  
  
  

  
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
