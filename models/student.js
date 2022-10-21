const mongoose =require("../config/mongodb"); // Importing config file for database connection

// Collection schema(structure of document)
var StudentSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true},
    password: String,
    roll_no: Number,
    semester: Number
});

// Model of users collection
var Student = mongoose.model('students',StudentSchema);
Student.createIndexes();
// Exporting User model to import in anywhere
module.exports = Student;