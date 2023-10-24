const jwt = require("jsonwebtoken");
require("dotenv").config();

function refreshGenerator(user_id) {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.refreshSecret, {expiresIn : "30s"});
}
module.exports = refreshGenerator;