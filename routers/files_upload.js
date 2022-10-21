const route = require("express").Router();
const multer = require("multer");
const fs = require("fs");

var options = multer.diskStorage({
    destination : function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') 
        {
            return cb('Invalid file format');
        }
        cb(null, './uploads');
    } ,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: options });

route.get("/add", (req,res) => {
    res.render("./File_upload/add_file");
});

route.post("/upload_singal", upload.single("image"), (req, res) => {
    console.log(req.file.filename)
    res.render("./File_upload/display_file",{image: req.file.filename})
});

module.exports = route;