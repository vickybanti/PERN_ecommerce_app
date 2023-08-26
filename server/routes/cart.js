const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");


// router.post("/", async(req, res) => {
//     const {id} = req.params
//     const {count} = req.params

//     try {
//         //payload from authoriaztion has the user payload
//         const newCart = await pool.query(`INSERT INTO cartswithoutuser (product_id, count)
//         VALUES (${id}, 1)`)
//         res.json(newCart.rows);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("Server error")
//     }
// });

router.post("/", authorization, async (req, res) => {
  const user_id = req.user; // Accessing the user_id from authorization payload

  const { count, id } = req.body;
  console.log(user_id);

  try {
    
      const newCart = await pool.query(
        `INSERT INTO carts (user_id, product_id, count) VALUES ('${user_id}', '${id}', '${count}')`
      );
      res.json({ user_id: user_id, data: newCart.rows });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

  

//INSERT INTO CART BY GUEST




//GET carts by user
router.get("/:user_id", authorization, async(req, res) => {
    const {user_id} = req.params;
    console.log(user_id)
    try {
        //payload from authoriaztion has the user payload
        const newCart = await pool.query(`SELECT * FROM products
        JOIN carts ON carts.product_id = products.id WHERE user_id =${user_id}`)
        res.json(newCart.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

//UPDATE CART

router.put("/:user_id", authorization, async(req, res) => {
    const {id} = req.params
    const {user_id} = req.params
    try {
        //payload from authoriaztion has the user payload
        const updateCart = await pool.query(`UPDATE carts SET(product_id=${id})
WHERE user_id=${user_id} RETURNING * `)
        res.json(updateCart.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error")
    }
});

//DELETE 
router.delete("/delete/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteProduct = await pool.query(`DELETE FROM carts WHERE product_id=${id}`)
        if(deleteProduct){
            console.log("Successful")
        }
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;