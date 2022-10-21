require("dotenv").config() // dontenv file for configuration
const express = require("express");
const app = express();
const authentication_route = require("./routers/student_authentication");
const student_route = require("./routers/student_crud");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('uploads'));

app.use("/auth", authentication_route);
app.use("/student", student_route);

app.listen(8080, (err,res) => {
    if(err) console.log("Server not connected");

    console.log("Server is listening on 8080.");
});