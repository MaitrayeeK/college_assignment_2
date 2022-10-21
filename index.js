const express = new require("express");
const app = express()
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('uploads'))

app.listen(8080, (err,res) => {
    if(err) console.log("Server not connected")

    console.log("Server is listening on 8080.")
})