
const router = require("express").Router();
const pool = require("../db");





router.get("/", async (req,res) => {
    try {
        const allProducts = await pool.query(`SELECT * FROM products WHERE type='trending'`);
        res.json(allProducts.rows);
    } catch (err) {
        console.log(err.message);
        
    }})


   
module.exports=router