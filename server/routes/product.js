const router = require("express").Router();
const pool = require("../db");
const fs = require('fs');
const multer = require('multer'); 


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
   
   cb(null, `image-${Date.now()}` + path.extname(file.originalname))
      //path.extname get the uploaded file extension
  }
});
const multerFilter = (req, file, cb) => {
   
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
             // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(null, true)
    
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

router.get("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        
        const product = await pool.query(`SELECT * FROM products WHERE id = ${id}`)
        res.json(product.rows);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

router.post("/add",  upload.array('images'), async (req, res) => {
    const { title, description, cat, price, oldPrice,stock,sizes,type } = req.body;
    

// Step 1: Remove the surrounding double quotes
console.log(sizes)
console.log(type)


// Step 1: Extract the string from the array
const inputString = sizes[0];

// Step 2: Split the string by commas
const stringArray = inputString.split(',');

// Step 3: Convert each substring to an integer
const sizeInt = stringArray.map(size => size);

console.log(sizeInt);
      
    console.log(req.body)
    const imageFiles = req.body.images
    console.log(imageFiles)
    const imageDataArray = imageFiles.map((images) => fs.readFileSync(`uploads/shoes/${images}`));
    console.log(imageDataArray);
     
  
    try {
      // const imageValues = images.map((image) => {
      //   const base64Image = image.buffer.toString('base64');
      //   return base64Image;
      //     });
      //     console.log(imageValues)


      const imageValues = imageDataArray.map((imageData) => Buffer.from(imageData));
      console.log(imageValues)


      
      const add = await pool.query(
        `INSERT INTO products (title, "desc", cat_title, price, oldprice,stock,sizes, images, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [title, description, cat, price, oldPrice, stock,sizeInt,imageValues,type]
    );
      
      res.json(add.rows);
      console.log("Successful");
      
    
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

router.delete("/delete/:id", async (req, res) => {
    try{
        const { id } = req.params;
        
        const product = await pool.query(`DELETE FROM products WHERE id = ${id}`)
        res.json(product.rows);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})



router.put("/edit/:id", upload.array('images'), async (req, res) => {
  const { id } = req.params;

  // Collect only the fields that have been edited

  const {editedFields} = req.body;
  if (req.body.title !== undefined) editedFields.title = req.body.title;
  if (req.body.description !== undefined) editedFields.desc = req.body.description;
  if (req.body.cat !== undefined) editedFields.cat_title = req.body.cat;
  if (req.body.brand !== undefined) editedFields.brand_title = req.body.brand;
  if (req.body.price !== undefined) editedFields.price = req.body.price;
  if (req.body.oldPrice !== undefined) editedFields.oldprice = req.body.oldPrice;
  if (req.body.stock !== undefined) editedFields.stock = req.body.stock;
  if (req.body.sizes !== undefined) editedFields.sizes = req.body.sizes;
  if (req.body.type !== undefined) editedFields.type = req.body.type;
  console.log(editedFields)

  // Handle images separately
  let imageValues = [];
  if (req.body.images !== undefined) {
    const imageFiles = req.body.images;
    const imageDataArray = imageFiles.map((image) => fs.readFileSync(`uploads/shoes/${image}`));
    imageValues = imageDataArray.map((imageData) => Buffer.from(imageData));
  }

  try {
    const updateQuery = generateUpdateQuery(editedFields);
    console.log(updateQuery)

    // If there are edited fields, update the database
    if (updateQuery !== "") {
      console.log(updateQuery)
      const add = await pool.query(`UPDATE products SET ${updateQuery} WHERE id='${id}'`);
      res.json(add.rows);
      console.log(res.json(add.rows))
      console.log("Successful");
    } else {
      // No fields to update
      res.json({ message: "No fields to update" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to generate the SET part of the SQL query
function generateUpdateQuery(editedFields) {
  const updateQueryParts = [];
  for (const key in editedFields) {
    if (editedFields.hasOwnProperty(key)) {
      updateQueryParts.push(`${key}='${editedFields[key]}'`);
    }
  }
  return updateQueryParts.join(', ');
}



module.exports = router;

