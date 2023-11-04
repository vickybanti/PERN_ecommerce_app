const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool(
   
    {
    user: "root",
    password: "BueoUo0Zfbdy3brSuoQ7QSpqG00FLxvS",
    host:"dpg-cl2dpobmgg9c73aqoshg-a",
    port: 5432,
    database: "moore_r5hq",
    
});

module.exports = pool;