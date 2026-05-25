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

// MongoDB connect
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connection established successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Student MS API is running!' });
});


const studentRoutes = require('./routes/Students.js');
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});