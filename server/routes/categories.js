const router = require("express").Router();
const pool = require("../db");


router.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        console.log(id)
        const catPro = await pool.query(`SELECT * FROM categories 
        LEFT JOIN products ON products.cat_id = categories.id
        WHERE categories.id =${id}`);
        res.json(catPro.rows);        
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);

    }
})

router.get("/browseCategories/:title", async (req, res) => {
    try{
        const {title} = req.params;
        console.log(title)
        const catPro = await pool.query(`SELECT * FROM products 
        WHERE title ILIKE'%${title}%'`);
        res.json(catPro.rows);        
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);

    }
})


router.get("/", async (req, res) => {
    try {
        const allCategories = await pool.query(`SELECT * FROM categories`);
        res.json(allCategories.rows);
    } catch (err) {
        console.log(err.message);
        
    }
})


module.exports = router;