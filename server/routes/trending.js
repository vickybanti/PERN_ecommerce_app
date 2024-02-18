
const router = require("express").Router();
const pool = require("../db");

app.get("/newproducts", async (req,res) => {
    try {
        const allProducts = await pool.query(`SELECT * FROM products WHERE type='newArrivals'`);
        res.json(allProducts.rows);
    } catch (err) {
        console.log(err.message);
        
    }})

//get the title of new arrival
app.get("/type", async (req, res) => {
    try {
        const productType = await pool.query(`SELECT DISTINCT type FROM products WHERE type='newArrivals'`);
        res.json(productType.rows);
    } catch (err) {
        console.error(err.message);
        
    }
})


//FILTERS

// get the trending product

app.get("/trending", async (req,res) => {
    try {
        const allProducts = await pool.query(`SELECT * FROM products WHERE type='trending'`);
        res.json(allProducts.rows);
    } catch (err) {
        console.log(err.message);
        
    }})


   
module.exports=router