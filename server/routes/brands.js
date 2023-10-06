const router = require("express").Router();
const pool = require("../db");


router.get("/", async (req, res) => {
    try{
        const brands = await pool.query(`SELECT * FROM brands`);
        res.json(brands.rows);        
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);

    }
})


router.get("/:brand", async (req, res) => {
    try{
        const {brand} = req.params;
        const brandPro = await pool.query(`SELECT * FROM products WHERE brand_title ='${brand}'`);
        res.json(brandPro.rows);        
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);

    }
})
module.exports = router;