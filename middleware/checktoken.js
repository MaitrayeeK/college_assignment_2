const jwt = require("jsonwebtoken")
const localStorage = require("localStorage");

// Get authorization token and verify token
const checktoken = (req, res, next) => {
    const auth = localStorage.getItem('token');
    if(!auth) {
        res.status(401).send({ message: "Please authenticate using valid token."})
    } else {
        try {
            const data = jwt.verify(auth, process.env.JWT_SECRET)
            req.user = data.user;
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ message: "Please authenticate using valid token."})
        }
    }
}

module.exports = checktoken