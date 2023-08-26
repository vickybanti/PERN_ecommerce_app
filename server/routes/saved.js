const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");



router.get("/",authorization, async(req, res) => {
    const userId = req.user
    try {
        const saved = await pool.query(`SELECT * FROM saveditems WHERE user_id=${userId}`)
        res.json(saved)
    } catch (err) {
        console.error(err.message)
    }
})

router.post("/:id", authorization, async(req, res) => {
    const {id} = req.params
    const userId = req.user
    try {
        const addSaved = await pool.query(`INSERT INTO saveditems (product_id, user_id) VALUES ('${id}', '${userId}')`)
        res.json(addSaved)
    } catch (err) {
        console.error(err.message)
    }
})







module.exports = router;