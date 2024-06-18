// Replace if using a different env file or config
require("dotenv").config();
const router = require("express").Router();
const pool = require("../db");
const crypto = require("crypto");
const sendEmail = require("../sendEmail")
const myModule = require("../template");



const { resolve } = require('path');
// Replace if using a different env file or config
const calculateTax = false;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
   
});



console.log(stripe)
//ORDER EMAIL
const orderEmail = myModule.createOrderEmail;
    

router.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return total;
};

router.post("/create_payment_intent", async (req, res) => {




    const { cartTitle, cartPrice, count, total } = req.body;
    console.log(cartItems)
    const stringForm = JSON.stringify(req.body.formValues)




    //function getMonthInWords() {
    //    const months = [
    //        "January", "February", "March", "April",
    //        "May", "June", "July", "August",
    //        "September", "October", "November", "December"
    //    ];

    //    const currentDate = new Date();
    //    const currentMonthIndex = currentDate.getMonth();
    //    const currentMonthInWords = months[currentMonthIndex];

    //    return currentMonthInWords;
    //}

    //const currentMonth = getMonthInWords();
    //const currentDate = new Date();







    

    const lineItems = {
        price_data: {
            currency: "usd",
            product_data: {
                name: cartTitle,
                price: cartPrice
            },
            unit_amount: total

        },
        quantity: count

    }

    const session = await stripe.checkouts.session.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "",
        cancel_url: ""
    })

    res.json({ id: session.id })
})


   
    //const proIdCountPairs = carts.map((item) => ({ id: item.id, count: parseInt(item.count) }));



    //const total = parseFloat(totals)






    //const paymentIntent = await stripe.paymentIntents.create({
    //    amount: calculateOrderAmount(carts),
    //    currency: "usd",
    //    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    //    automatic_payment_methods: {
    //        enabled: true,
    //    },
    //});

    //console.log(paymentIntent)

    //const createOrder = await pool.query(`INSERT INTO orders (user_id,order_id,firstname, lastname,cart,
    //    country, city, state, street1,street2, email, phone_number, payment_status, payment_intent, delivery_status, subtotal, total,date, month)
    //  VALUES('${userId}','${paymentIntent}','${firstName}','${lastName}','${cart}','${country}',
    //  '${city}','${state}','${street1}','${street2}','${email}','${phoneNumber}', 'paid','${paymentIntentId}',
    //  'pending','${total}','${total}','${currentDate}', '${currentMonth}')`);




    // await Promise.all(proIdCountPairs.map(async ({ id, count }) => {
    //   await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [count, id]);
    //     await pool.query('COMMIT');
    //   }))




//    res.send({
//        clientSecret: paymentIntent.client_secret,
//        orders: createOrder.rows,
//    });


//});



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
