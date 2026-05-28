const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = process.env.MONGODB_URL;

// MongoDB connection
mongoose.connect(URL)
  .then(() => {
    console.log('MongoDB connection established successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Routes
const studentRouter = require('./routes/Students.js');
const authRouter = require('./routes/auth.js');

app.use("/students", studentRouter);
app.use("/api/auth", authRouter); // Auth routes: /api/auth/login and /api/auth/register

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});