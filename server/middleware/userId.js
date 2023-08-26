const jwt = require("jsonwebtoken");
require("dotenv").config();

const userIdMiddleware = async (req, res, next) => {
  try {
    const jwToken = req.header("token");
    if (!jwToken) {
      return res.status(403).json("Not authorized");
    }

    // Check for a valid jwttoken. payload returns an object to be used within the routes
    const payload = jwt.verify(jwToken, process.env.jwtSecret);
    // Use the payload to request the user token and access everything in the routes
    req.user = payload.user;


    next();

  } catch (err) {
    console.error(err.message);
    res.status(403).json("Unauthorized user");
  }
};


module.exports = { userIdMiddleware };
