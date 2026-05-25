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

module.exports = router; // 