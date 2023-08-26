const jwt = require("jsonwebtoken");
require("dotenv").config();



module.exports = async (req, res, next) => {
    try {
        const jwToken = req.header("token");
        if (jwToken){
        } else{
            return res.status(403).json("Not authorized");
            
        }
          
        
        //check for a valid jwttoken. payload returns an object to be used within the routes
        const payload = jwt.verify(jwToken, process.env.jwtSecret);
        //uss the payload to request for the user token and access everythi in the routes
        req.user = payload.user;
        next(); 

        
    } catch (err) {
        console.error(err.message);
        res.status(403).json("Unathorized user");
    }

}
