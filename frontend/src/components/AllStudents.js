import React, { useState, useEffect } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

// AllStudents component - displays all students from the database in a table
function AllStudents() {

  // state to hold list of students fetched from database
  const [students, setStudents] = useState([]);

  // state to show error message if fetching fails
  const [error, setError] = useState('');

  // state to show loading text while fetching data
  const [loading, setLoading] = useState(true);

  // useEffect runs when component first loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // fetchStudents - sends GET request to backend
  const fetchStudents = () => {
    axios.get('http://localhost:5000/students/')
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
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
        // Students table
        <Table striped bordered hover responsive>
          <thead style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No students found!</td>
              </tr>
            ) : (
              // map() loops through each student and creates a table row
              students.map((student, index) => (
                <tr key={student._id}> {/* key prop uses MongoDB _id */}
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AllStudents; // Exporting the AllStudents component for use in other parts of the app