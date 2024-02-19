const router = require("express").Router();
const pool = require("../db");
const cors = require("cors");

router.use(cors({
    origin: "https://pern-ecommerce-app.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
  }));
  

router.get("/",cors(), async (req,res) => {
    try {
        const allProducts = await pool.query(`SELECT * FROM products WHERE type='newArrivals'`);
        res.json(allProducts.rows);
    } catch (err) {
        console.log(err.message);
        
    }})


module.exports=router