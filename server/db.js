const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool(
    process.env.DB_URL,
    {
    user: "root",
    password: "VCK8SpcMfWAm3wEjXBo4GZSyMWRZP7Yf",
    host:"dpg-cl2dpobmgg9c73aqoshg-a",
    port: 5432,
    database: "moore_r5hq",
    
});

module.exports = pool;