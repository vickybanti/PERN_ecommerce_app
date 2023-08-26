module.exports = function(req, res, next) {
    const {email, password} = req.body;

    function validEmail(email) {
        //learn reg x for email validation
        return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9]+(\.[a-z]{2,4})$/.test(email);
    }

    if(req.path === "/register") {
        if(![email, password].every(Boolean))
        return res.status(401).send("Missing credentials");

    }else if(req.path === "/login") {
        if(![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials")
        } else if(!validEmail(email)) {
            return res.status(401).json("Invalid email");
        }
    }

    next();
};