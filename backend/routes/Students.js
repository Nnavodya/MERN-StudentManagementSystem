const router = require("express").Router();
let Student = require("../models/Student");

// POST - Add student
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        email,
        age,
        gender
    });

    newStudent.save()
        .then(() => res.json("Student added successfully!"))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

//router to get all students details to the frontend from the database
router.route("/").get((req, res) => {
    Student.find()
        .then((students) => res.json(students))
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

//http://localhost:5000/api/students/update/:id
//router.route("/update/:id"),by using this we can fetch the user id after the above comment's url /update part.
//router to update the student details.This will update only user we need to update.Not updating every users details.Mongodb automatically giving us a unique id for each user.Using that id we can update the user details.
//router.route("/update/:id").put((req, res) => {--- IGNORE --- ,this is always similar to router.route("/update/:id").post((req, res) => {
router.route("/update/:id").post(async(req, res) => {
    let userId = req.params.id;
    const { name, email, age, gender } = req.body; //fetching the user id from the url and storing it in a variable called userId
    const updateStudent = {
        name,
        email,
        age: Number(age),
        gender
    };
//await is used to wait for the promise to resolve before moving on to the next line of code. This is useful when you want to perform an asynchronous operation, such as updating a student in the database, and you want to ensure that the operation is completed before sending a response back to the client.
    const update = await Student.findByIdAndUpdate(userId, updateStudent).then(() => {
        res.status(200).send({ status: "Student updated", student: update })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    });
});

//this is the router to delete the student details.Using the user id we can delete the user details from the database.Also we can use the same user id to update the user details from the database.Using the same user id we can perform both update and delete operations on the user details from the database.
router.route("/delete/:id").delete(async(req, res) => {
    let userId = req.params.id;
    //findByIdAndDelete is a mongoose method that is used to delete a document from the database based on the id. It takes the id as a parameter and deletes the document that matches the id from the database. It returns a promise that resolves to the deleted document if it was found and deleted, or null if no document was found with the given id.
    await Student.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "Student deleted" });
    }).catch((err) => {
        console.log(err);
        //res.status(500).send({ status: "Error with deleting data", error: err.message });--- IGNORE --- ,this is always similar to res.status(500).send({ status: "Error with deleting data", error: err.message });
        res.status(500).send({ status: "Error with deleting data", error: err.message });
    });
});

module.exports = router;  