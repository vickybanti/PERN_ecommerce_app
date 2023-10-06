const router = require("express").Router();
const pool = require("../db");




router.get("/", async (req, res) => {
    try {
        const allUsers = await pool.query(`SELECT * FROM users`);
        res.json(allUsers.rows);
    } catch (err) {
        console.log(err.message);
        
    }
});

router.delete("/delete/:userId", async (req, res) => {
    const {userId} = req.params
    try {
        const delUser = await pool.query(`DELETE FROM users WHERE user_id='${userId}'`);
        res.json(delUser.rows[0]);
    } catch (err) {
        console.log(err.message);
        
    }
});




router.put("/admin/:idd", async(req, res) => {
    const {id} = req.body
    console.log(req.body)
    try {

            const update = await pool.query(`UPDATE users SET isadmin='true' WHERE user_id='${id}'`)
            res.json(update.rows)
       
        
    } catch (err) {
        console.error(err.message)
    }
});

router.put("/notadmin/:id", async(req, res) => {
    const {id} = req.body
    console.log(req.body)
    try {

            const update = await pool.query(`UPDATE users SET isadmin='false' WHERE user_id='${id}'`)
            res.json(update.rows)
       
        
    } catch (err) {
        console.error(err.message)
    }
});

module.exports = router;