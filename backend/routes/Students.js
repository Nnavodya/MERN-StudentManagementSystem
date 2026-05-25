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

module.exports = router;  