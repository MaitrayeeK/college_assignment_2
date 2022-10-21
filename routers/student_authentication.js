const route = require("express").Router(); // Importing express router for use the routes
const { check, validationResult } = require('express-validator'); // Used for data validation
const jwt = require("jsonwebtoken");
const Student = require("../models/student"); // Importing model's file for database ops
const localStorage = require("localStorage");

route.get("/stud_login", (req, res) => {
    res.render("./Student/login");
})
route.post("/login", 
// Validation of user data
check('email').not().isEmpty().withMessage('E-mail is required.'),
check('password').not().isEmpty().withMessage('Please provide password.') , 
async (req,res) => {
    try {
        // Check user data
        let user = await Student.findOne({ email:req.body.email });
        if(user) {
            // Comparing hash password
                if (req.body.password === user.password) {
                    const data = user;

                    // Creating jwt token for authentication
                    const authToken = jwt.sign({user: data}, process.env.JWT_SECRET);
                    user = {
                        authtoken: authToken 
                    }
                    localStorage.setItem('token', authToken);
                    res.redirect("/student/getalluser");
                } else {
                    return res.send({ message: "Your password is incorrect", result: false});
                }
        } else {
            return res.send({ message: "Invalid credentials.", result: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Exception ocurred while login.", result: false});
    }
});

module.exports = route