const route = require("express").Router(); // Importing express router for use the routes
const checktoken = require("../middleware/checktoken")
const Student = require("../models/student"); // Importing model's file for database ops

route.get("/add_user", (req,res) => {
    res.render("./Student/add");
})

route.post("/add", (req,res) => {
    console.log(req.body)
    var user = new Student({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roll_no: req.body.rno,
        semester: req.body.sem
    });
    user.save((err,user) => {
        if (err) return console.error(err);
        id=user._id;
        console.log(user._id + " saved to user collection.");	      
        res.redirect("/student/getalluser");
    });
})

route.get("/getalluser", checktoken,
// Using asynchronous function for send the responses
async (req,res)=>{
    try {
        const user = await Student.find().select("-password");
        res.render("./Student/list", { data: user, result: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal error ocurred.", result: false});
    }
});

route.get("/edit/:id", (req, res) => {
    Student.findById({"_id":req.params.id}, (err, user) => {
        if(err) console.log(err);
        console.log(user);
        res.render("./Student/edit",{user: user});
    });
});

route.post("/update", (req, res) => {
    console.log(req.body)
    Student.findOneAndUpdate({"_id":req.body._id},
    {
        name: req.body.name,
        email: req.body.email,
        roll_no: req.body.rno,
        semester: req.body.sem
    }, {new: true}, (err, user) => {
        if(err) console.log("Error occurred!");
        res.redirect("/student/getalluser");
    });
});

route.get("/delete/:id", (req,res) => {
    Student.findOneAndRemove({"_id":req.params.id}, (err, user) => {
        if(err) console.log(err);
        res.redirect("/student/getalluser");
    });
});

module.exports = route;