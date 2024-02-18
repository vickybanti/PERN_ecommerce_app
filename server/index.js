const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const authorization = require("./middleware/authorization")
const bodyParser = require('body-parser');
const fs = require('fs');



// Set a higher limit for the request body size'''
app.use(cors({
    origin: '*',
  }));
  

app.use(bodyParser.json({ limit: '100000000000mb' }));
app.use(bodyParser.urlencoded({ limit: '10000000000mb', extended: true }));





//middleware
app.use(express.static("public"));
app.use(express.json());

//register and login routes
app.set('view engine', "ejs");

//login routes
app.use("/auth", require("./routes/jwAuth"));


app.use("/dashboard", require("./routes/dashboard"));

// CARTS

app.use("/cart", require("./routes/cart"))

app.use("/order", require("./routes/order"))
app.use("/create-checkout-session", require("./routes/stripe"))
app.use("/products", require("./routes/products"))
app.use("/product", require("./routes/product"),express.static('images'))
app.use("/search", require("./routes/search"))
app.use("/categories", require("./routes/categories"))
app.use("/brands", require("./routes/brands"))
app.use("/review", require("./routes/review"))
app.use("/saveditems", require("./routes/saved"));

app.use("/checkout", require("./routes/checkout"))
app.use("/users", require("./routes/users"))
app.use("/trending", require("./routes/trending"))
app.use("/newproducts", require("./routes/newproducts"))


//  const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/checkout',
//     createProxyMiddleware({
//       target: 'https://mooreserver.onrender.com',
//       changeOrigin: true,
//     })
//   );
// };



//ROUTES//

//create a product

//get all products




app.post('/image', async (req, res) => {
  // Read the image files as binary data
  const imageFiles = [
    'uploads/alex_hddife_6w_Wi_Zl_A2n0_Q_unsplash_27082891e3.jpeg',
  ];
  const imageDataArray = imageFiles.map((image) => fs.readFileSync(image));
  console.log(imageDataArray);

  try {
    const imageValues = imageDataArray.map((imageData) => Buffer.from(imageData));

    const query = `UPDATE products SET images=$1 WHERE id=32`;
    const upload = await pool.query(query, [imageValues]);

    const success = res.json(upload.rows);
    console.log(success);
  } catch (err) {
    console.error(err.message);
  }
});

// Other routes and middleware


  
// get the new arrivals of product



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

// app.get("/trending", async (req,res) => {
//     try {
//         const allProducts = await pool.query(`SELECT * FROM products WHERE type='trending'`);
//         res.json(allProducts.rows);
//     } catch (err) {
//         console.log(err.message);
        
//     }})


    app.get("/size/:size", async (req,res) => {
        const {size} = req.params
        try {
            const allProducts = await pool.query(`SELECT * FROM products WHERE '${size}' = ANY (sizes);`);
            res.json(allProducts.rows);
        } catch (err) {
            console.log(err.message);
            
        }})
    
app.get("/price", async (req, res) => {
    try {
        // Assuming the products table has a column named "price" for product prices
        const query = await pool.query (`SELECT * FROM products ORDER BY price ASC`);
        const response = res.json(query.rows);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
    });
    

    app.get("/price/desc", async (req, res) => {
        try {
            // Assuming the products table has a column named "price" for product prices
            const query = await pool.query (`SELECT * FROM products ORDER BY price DESC`);
            const response = res.json(query.rows);
            
    
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "An error occurred while fetching products." });
        }
        });
        
    



app.listen(5000, () =>{
    console.log("server has started on port 5000");
});
