const router = require("express").Router();
const pool = require("../db");


router.get("/", async(req, res)=>{
    try {
        //product_title, cat_title
        const {title} = req.query;
        const product_search = await pool.query(` SELECT * FROM products WHERE title ILIKE '%${title}%' `);
        res.json(product_search.rows);
    } catch (error) {
        console.error(error.message)
    }
})



router.get("/:note", async(req, res) => {
    try {
        const { note } = req.query;
        //specify the column

        const search = await pool.query("SELECT * FROM products WHERE 'title' || ' ' || 'desc' LIKE $1",[`%${note}%`] );

         res.json(search.rows);
        
    } catch (err) {
        console.error(err.message);        
    }
}  )
module.exports = router;

