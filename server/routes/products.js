const router = require("express").Router();
const pool = require("../db");
const fs = require('fs');
const multer = require('multer');
const sendEmail = require("../sendEmail")

const myModule = require("../template");



//ORDER EMAIL
const stockEmail = myModule.outOfStock;
const reStockEmail = myModule.reStock
    

    


router.get("/", async (req, res) => {
    try {
      const pro = await pool.query(`SELECT * FROM products`);
      const allProducts = pro.rows;
  
      const admin = await pool.query(`SELECT * FROM users WHERE isadmin=true`);
      const adminEmail = admin.rows;
  
      for (const users of adminEmail) {
        const user = users.email;
        console.log(user)
  
        for (const product of allProducts) {
          const productId = product.id;
          const stock = product.stock;
  
          if (stock === 0) {
            const id = productId;
            const subject = "You are out of stock";
            const sent_from = "olamuyiwavictor@outlook.com";
            const send_to = user;
            const message = stockEmail(stock,id);
            await sendEmail(subject, message, send_to, sent_from);
          } else if (stock <= 5) {
            const id = productId;
            const send_to = user;
            const subject = "Few Items Left";
            const sent_from = "olamuyiwavictor.outlook.com";
            const message =reStockEmail(id);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await sendEmail(subject, message, send_to, sent_from);
          }
        }
      }
  
      // Send the response after all emails are sent
      res.json(allProducts);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  
router.get("/:id", async(req, res) => {
    const {id} = req.params
    try {
        const cat = await pool.query(`SELECT cat_title FROM products WHERE id = ${id}`);
        const getCat = cat.rows[0].cat_title
        console.log(getCat)
        if(getCat){
            const product = await pool.query(`SELECT * FROM products WHERE cat_title = '${getCat}' LIMIT 10`)
            res.json(product.rows)
        }
    } catch (err) {
        console.error(err.message)
    }
})


module.exports = router;
