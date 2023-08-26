const router  = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const refreshGenerator = require("../utils/refreshgenerator");
const validator = require("../middleware/validator")
const authorization = require("../middleware/authorization")
const refresh = require("../middleware/refresh")



//registering

router.post("/register",validator, async(req,res) => {
    try {
        //destructure the req.body(name, email, password)
        const { email, password} = req.body

        const user =  await pool.query("SELECT * FROM users WHERE email = $1",[email]);

        if (user.rows.length > 0) {
            return res.status(401).send("user already exists");
        
        }

        //bcrypt the password

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //enter a new user
        const date = new Date()
        const created = new Date().getMonth();
        const newUser = await pool.query(`INSERT INTO users (email, password, createdat, updatedat, isadmin) VALUES ('${email}','${bcryptPassword}','${created}','${created}','false' ) RETURNING*`);

        //generating a user token

        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
        
    }

   
});


//login route
let refreshTokens = []

router.post("/refresh", refresh,async(req, res)=> {
    const user = req.user
    const refreshToken = req.body.token;

    try {
        refreshTokens = refreshTokens.filter((token)=> token !== refreshToken)
        const newToken = jwtGenerator(user)
        const newRefreshToken = refreshGenerator(user)
        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            token: newToken,
            refreshToken : newRefreshToken
        })
    } catch (err) {
        console.error(err.message)
    }
})

router.post("/login",validator, async (req, res) => {

    try {
        //destructuring the req.body
        const {email, password} = req.body;


        //check if user doesn't exist

        const user  = await pool.query(`SELECT * FROM users WHERE email='${email}'`);
        if (user.rows.length === 0) {
            return res.status(500).send("email is incorrect")
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) {

            return res.status(401).json("Invalid password");
        }
        const user_id = user.rows[0].user_id
        const token = jwtGenerator(user_id);
        const refreshToken = refreshGenerator(user_id);
        refreshTokens.push(refreshToken)
        console.log(refreshTokens)

        res.json({user_id, token, refreshToken})  
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
        
    }
})

//logout route

router.post("/logout", authorization, (req, res) => {
    try {
        const refreshToken = req.body.token;
        console.log(refreshToken)
  
    // Remove the refresh token from the array
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
    res.status(200).json("Logout successful");
  
    } catch (err) {
        console.error(err.message)
    }
});  
    
  

//reset password

router.put("/reset",validator, async(req,res) => {
    try {
        const {password,newPassword,email} = req.body;
        console.log(email)
        console.log(password)
        console.log(newPassword)
        
        const user  = await pool.query(`SELECT * FROM users WHERE email='${email}'`);
        if (user.rows.length === 0) {
            return res.status(500).send("email is incorrect")
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) {
            console.log("Invalid password...")

            // return res.status(401).send("Invalid password");
        } else{
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
    
            const bcryptPassword = await bcrypt.hash(newPassword, salt);
            const updatePassword = await pool.query(`UPDATE users SET password='${bcryptPassword}' WHERE email='${email}'`)
        
            
           const updatedResult = res.json(updatePassword.rows)

            console.log(updatedResult)
        }
    } catch (err) {
       console.error(err.message)
    }
})

//delete user

router.delete("/delete/:user",authorization, async(req, res) =>{
    try {
        const {password, user} = req.body
        console.log(password)
        console.log(req.user)
        
        
        const getPassword = await query(`SELECT password FROM users WHERE user_id = ${user}`)

        if (password === getPassword){


    console.log("user_id=",user_id)
    console.log("req.user=",req.user)
    
    const delQuery = await pool.query(`DELETE FROM users WHERE user_id='${req.user}'`)
    if (delQuery){
        res.status(200).json("User has been deleted")
    } else {
    
        res.status(403).json("Wrong password.Not allowed to delete the user")
    }
}
    } catch (err) {
        console.error(err.message)
    }
    
})
//get all users 
router.get("/users", async (req, res) => {
    try {
        const users = await pool.query(`SELECT * FROM users`)
        res.json(users.rows)
        
    } catch (err) {
        console.error(err.message)
    }
})

//get user by id

router.get("/user/:userId", async (req, res) => {
    const {userId} = req.params
    try {
        const users = await pool.query(`SELECT * FROM users WHERE user_id='${userId}'`)
        res.json(users.rows)
        
    } catch (err) {
        console.error(err.message)
    }
})

router.delete("/:userId", async (req, res) => {
    const {userId} = req.params
    try {
        const users = await pool.query(`DELETE FROM users CASCADE WHERE user_id='${userId}'`)
        res.json(users.rows)
        
    } catch (err) {
        console.error(err.message)
    }
})

router.get("/stats", async (req, res) => {
    try {
      const getActive = await pool.query(`
      SELECT TO_CHAR(current_date, 'Month') AS current_month,
       COUNT(DISTINCT usename) AS active_users
FROM pg_stat_activity
WHERE state = 'active' AND usename IS NOT NULL
GROUP BY current_month
ORDER BY current_month;


      `);
      const active = getActive.rows[0];
      console.log('Month:', active.current_month);
      console.log('Active Users:', active.active_users);
      res.json(active);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// router.get("/stats/:user_id", async (req, res) => {
//     const {user_id} =req.params
//     const time = new Date().getSeconds();
//     const timeOut = time - 5
//     console.log(timeOut)

//     try {
//         const user = await pool.query(`SELECT * FROM usersonline WHERE user_id=${user_id}` )
//         if (user===NULL){
//             await pool.query(`INSERT INTO usersonline(user_id, time) VALUES (${user_id}, ${time})`)
//         } else {
//             await pool.query(`UPDATE usersonline SET time = ${time}`)
//         }
//         const usersOnline = await pool.query(`SELECT * FROM usersonline WHERE time > ${timeOut}`)
//         res.status(200).json(usersOnline);
//     } catch (error) {
//         res.status(500).json(error)
        
//     }
// })

module.exports = router;