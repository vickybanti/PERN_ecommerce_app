const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const refreshToken = req.body.token;

        try {
            if (!refreshToken){
                return res.status(403).json("Not authorized");
            }
              
            
            //check for a valid jwttoken. payload returns an object to be used within the routes
            const payload = jwt.verify(refreshToken, process.env.refreshSecret);
            //uss the payload to request for the user token and access everythi in the routes
            req.user = payload.user;
            next(); 
    
            
        } catch (err) {
            console.error(err.message);
            res.status(403).json("Unathorized user");
        }
    
}
    