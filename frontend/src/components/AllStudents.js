import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate redirects to update page

// AllStudents component - displays all students from the database in a table
function AllStudents() {

  // state to hold list of students fetched from database
  const [students, setStudents] = useState([]);

  // state to show error message if fetching fails
  const [error, setError] = useState('');

  // state to show loading text while fetching data
  const [loading, setLoading] = useState(true);

  // state to store search term entered by user
  const [searchTerm, setSearchTerm] = useState('');

  // useNavigate hook - redirects to update page when edit button clicked
  const navigate = useNavigate();

  // useEffect runs when component first loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // fetchStudents - GET request to fetch all students
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

  // deleteStudent - DELETE request to delete student by MongoDB id
  const deleteStudent = (id) => {
    // window.confirm shows popup before deleting
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`http://localhost:5000/students/delete/${id}`)
        .then(() => {
          alert('Student deleted successfully! ✅');
          // filter out deleted student from state without refetching
          setStudents(students.filter(student => student._id !== id));
        })
        .catch((err) => {
          alert('Error deleting student! ❌');
          console.log(err);
        });
    }
  };

  // filteredStudents - filters students by name, email or gender
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">

      {/* Title and Add button */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 style={{ color: '#1a1a2e' }}>👨‍🎓 All Students</h2>
        </Col>
        <Col className="text-end">
          <Button
            onClick={() => navigate('/add-student')}
            style={{ backgroundColor: '#1a1a2e', border: 'none' }}>
            ➕ Add New Student
          </Button>
        </Col>
      </Row>

      {/* Search bar */}
      <Row className="mb-3">
        <Col md={4}>
          {/* real-time search — filters on every keystroke */}
          <Form.Control
            type="text"
            placeholder="🔍 Search by name, email or gender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          <p className="mt-2 text-muted">
            Total: <strong>{filteredStudents.length}</strong>
          </p>
        </Col>
      </Row>

      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading or Table */}
      {loading ? (
        <p>⏳ Loading students...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No students found! 😕</td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>
                    {/* Edit button - navigates to update page with student id */}
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => navigate(`/update-student/${student._id}`)}>
                      ✏️ Edit
                    </Button>

                    {/* Delete button - deletes student by id */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteStudent(student._id)}>
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AllStudents; // Exporting the AllStudents component for use in other parts of the app, such as App.js where it is displayed on the home page and students page.