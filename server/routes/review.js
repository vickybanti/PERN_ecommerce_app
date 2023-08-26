const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");


router.get("/:productId", async(req,res)=>{
    const productId = req.params
    try {
        const getReview = await pool.query(`SELECT * FROM review WHERE product_id=${productId}`)

        res.json(getReview.rows)
    } catch (err) {
        console.error(err.message)
    }
})


router.post("/:productId", authorization, async(req, res)=>{
    const userId = req.user
    const {productId} = req.params
    const {productReview} = req.body
    try {
        const review = await pool.query(`INSERT INTO review (product_id, user_id review) 
        VALUES (${productId},'${userId}','${productReview}') WHERE product_id = ${productId}`)

        res.json(review.rows)
    } catch (err) {
        console.error(err.message)
    }
})



module.exports = router;