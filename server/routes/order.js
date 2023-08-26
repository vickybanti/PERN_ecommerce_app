const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const stripe = require("stripe")("sk_test_51NDulnFA3ATF2zMu8VuG068289VxPGuC2xFdTBQFWiX09vP7y1AWJOLRoxEjurV7gjjZw8WZpnXYAhcqX7qA5jze00afTsR0gt")



//GET ALL ORDERS
// router.get("/", async(req, res) => {
//     try {
//         //payload from authoriaztion has the user payload
//         const newOrder = await pool.query(`SELECT * FROM orders`);
//         res.json(newOrder.rows);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("Server error")
//     }
// });

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

//GET ALL ORDERS BY ID
router.get("/:id", async(req, res) => {
    const {userId} = req.params
    const {id} = req.params
    try {
        //payload from authoriaztion has the user payload
        const newOrder = await pool.query(`SELECT * FROM orders WHERE user_id = '${userId}'ORDER BY DESC`);
        res.json(newOrder.rows);
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

router.put("/:userId", authorization, async(req, res) => {
    const userId = req.user
    try {
        //payload from authoriaztion has the user payload
        const updateOrder = await pool.query(`UPDATE orders SET(delivery_status="delivered" WHERE user_id=${userId}) RETURNING *`)
        res.json(updateOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});


router.get("/month", async(req, res) => {
    const month = new Date().getMonth();
    try {
        const getIncome = await pool.query(`SELECT SUM(amount) FROM orders GROUP BY month LIMIT 2`)
        res.json(getIncome.rows)
        
        
    } catch (err) {
        console.error(err.message)
    }

    res.send({url: session.url});

})
//DELETE 

module.exports = router;