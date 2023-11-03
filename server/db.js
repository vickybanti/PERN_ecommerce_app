const Pool = require("pg").Pool;

const pool = new Pool({
    user: "moore",
    password: "VCK8SpcMfWAm3wEjXBo4GZSyMWRZP7Yf",
    host:"localhost",
    port: 5432,
    database: "moore",
    url:"postgres://moore:VCK8SpcMfWAm3wEjXBo4GZSyMWRZP7Yf@dpg-ckg00ugeksbs73de48ig-a.oregon-postgres.render.com/moore"
    
});

module.exports = pool;