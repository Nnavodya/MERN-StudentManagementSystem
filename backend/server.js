const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // FIXED (replaces body-parser)
app.use(express.urlencoded({ extended: true }));

const URL = process.env.MONGODB_URL;

// MongoDB connection
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully!');
});

// Routes
const studentRouter = require('./routes/Students.js');
app.use("/students", studentRouter); // Fixed: changed from /api/students to /students to match frontend axios calls

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});