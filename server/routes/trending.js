
const router = require("express").Router();
const pool = require("../db");

const cors = require("cors")

app.use(cors({
    origin: 'https://pern-ecommerce-app.vercel.app/',
  }));
  



router.get("/", cors(),async (req,res) => {
    try {
        const allProducts = await pool.query(`SELECT * FROM products WHERE type='trending'`);
        res.json(allProducts.rows);
    } catch (err) {
        console.log(err.message);
        
    }})


   
module.exports=router