
const Pool = require("pg").Pool;
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

PGHOST='ep-tiny-dawn-81761022.us-east-2.aws.neon.tech'
PGDATABASE='db'
PGUSER='postgres'
PGPASSWORD='8trenzYqTu6V'
ENDPOINT_ID='ep-tiny-dawn-81761022'



// const pool = new Pool({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: 'require',
//   connection: {
//     options: `project=${ENDPOINT_ID}`,
//   },
// });

// const pool = new Pool({
//     connectionString: 'postgresql://postgres:8trenzYqTu6V@ep-tiny-dawn-81761022.us-east-2.aws.neon.tech/db?sslmode=require' + '?sslmode=require',

//   });



// // async function getPgVersion() {
// //   const result = await pool(`select version()`);
// //   console.log(result);
// // }

// // getPgVersion();

 const pool = new Pool({
  host:'localhost',
  database: 'moore',
  username: 'postgres',
  password: 'victormania',
  port: 5432,
  
});





 module.exports = pool;