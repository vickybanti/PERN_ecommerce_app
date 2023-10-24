const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const stripe = require("stripe")("sk_test_51NDulnFA3ATF2zMu8VuG068289VxPGuC2xFdTBQFWiX09vP7y1AWJOLRoxEjurV7gjjZw8WZpnXYAhcqX7qA5jze00afTsR0gt")
const sendEmail = require("../sendEmail")

const myModule = require("../template");



//ORDER EMAIL

const deliveryEmail = myModule.packageDeliveredEmail;
    

    


      


//GET ALL ORDERS
router.get("/", async(req, res) => {
    try {
        //payload from authoriaztion has the user payload
        const newOrder = await pool.query(`SELECT * FROM orders ORDER BY id DESC`);
        res.json(newOrder.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});


//GET ALL ORDERS BY ID
router.get("/:userId", async(req, res) => {
    const {userId} = req.params
    try {
        //payload from authoriaztion has the user payload
        const newOrder = await pool.query(`SELECT * FROM orders WHERE user_id = '${userId}'`);
        res.json(newOrder.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

//GET AN ORDER
router.get("/id/:userId", async(req, res) => {
    const {userId} = req.params
    try {
        //payload from authoriaztion has the user payload
        const newOrder = await pool.query(`SELECT * FROM orders WHERE user_id = '${userId}'`);
        res.json(newOrder.rows[0]);
        console.log(res.json(newOrder.rows[0]))
    } catch (err) {
        console.error(err.message);
        
    }
});

router.get("/order/:id", async(req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const newOrder = await pool.query(`SELECT * FROM orders WHERE id = '${id}'`);
        const orders = res.json(newOrder.rows);
        console.log(orders)
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

//default shipping addrress
router.post("/address", async(req,res) => {
    const {  city,userId, firstName, lastName, country, state, street1 } = req.body;
    
    
    console.log(firstName)
    console.log(lastName)
    console.log(country)
    console.log(state)

    try {
        const createDefaultAddress = await pool.query(`UPDATE users SET firstname='${firstName}', lastname='${lastName}',
        city='${city}', state='${state}',street='${street1}',country='${country}' WHERE user_id='${userId}'`)
  
        res.json(createDefaultAddress.rows);
    } catch (err) {
        console.error(err.message)
    }
})




//UPDATE ORDER STATUS

router.put("/status/:id", async(req, res) => {
    const {id} = req.body
    try {
        //payload from authoriaztion has the user payload
        const updateOrder = await pool.query(`UPDATE orders SET delivery_status='delivered' WHERE id='${id}'`)
        
        const pro = await pool.query(`SELECT * FROM orders`);
        const allOrders = pro.rows;
            const email = allOrders.email;
              const send_to = email;
              const subject = "Items delivered successfully";
              const sent_from = "olamuyiwavictor.outlook.com";
              const message =  deliveryEmail(allOrders.date,allOrders.orderId,allOrders.cart,allOrders.total);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              await sendEmail(subject, message, send_to, sent_from);
            
      
        res.json(updateOrder.rows);

        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

router.put("/status/pending/:id", async(req, res) => {
    const {id} = req.body
    try {
        //payload from authoriaztion has the user payload
        const updateOrder = await pool.query(`UPDATE orders SET delivery_status='pending' WHERE id='${id}'`)
        const pro = await pool.query(`SELECT * FROM orders`);
        const allOrders = pro.rows;
            const email = allOrders.email;
              const send_to = email;
              const subject = "Items delivered successfully";
              const sent_from = "olamuyiwavictor.outlook.com";
              const message =  myModule.processOrderEmail(allOrders.date,allOrders.orderId,allOrders.cart,allOrders.total);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              await sendEmail(subject, message, send_to, sent_from);
            
       
        
        res.json(updateOrder.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});



router.get("/total/month", async(req, res) => {
    
    try {
        const getIncome = await pool.query(`SELECT sum(total) FROM orders`)
        res.json(getIncome.rows[0])
        
    } catch (err) {
        console.error(err.message)
    }
  

})


//DELETE 

module.exports = router;