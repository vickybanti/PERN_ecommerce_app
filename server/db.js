const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "victormania",
    host:"localhost",
    port: 5432,
    database: "moore"
    
});

module.exports = pool;