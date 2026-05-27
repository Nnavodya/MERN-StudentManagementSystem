import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import axios from 'axios';

// AllStudents component - displays all students from the database
function AllStudents() {

  // state to hold list of students fetched from database
  const [students, setStudents] = useState([]);

  // state to show error message if fetching fails
  const [error, setError] = useState('');

  // state to show loading text while fetching data
  const [loading, setLoading] = useState(true);

  // useEffect runs when component first loads (mounts)
  // empty array [] means it runs only once
  useEffect(() => {
    fetchStudents();
  }, []);

  // fetchStudents - sends GET request to backend to get all students
  const fetchStudents = () => {
    axios.get('http://localhost:5000/students/')
      .then((res) => {
        setStudents(res.data); // store fetched students in state
        setLoading(false); // hide loading text
      })
      .catch((err) => {
        setError('Error fetching students!');
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Container className="mt-5">
      <h2>👨‍🎓 All Students</h2>

      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading state */}
      {loading ? (
        <p>⏳ Loading students...</p>
      ) : (
        <p>Total Students: {students.length}</p>
      )}
    </Container>
  );
}

export default AllStudents; // Exporting the AllStudents component for use in other parts of the app