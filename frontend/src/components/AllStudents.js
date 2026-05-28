// AllStudents.js — Fetches and displays all students with search, delete, and edit features

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AllStudents() {

  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Dashboard statistics
  const [totalStudents, setTotalStudents] = useState(0);
  const [maleStudents, setMaleStudents] = useState(0);
  const [femaleStudents, setFemaleStudents] = useState(0);

  const navigate = useNavigate();

  // Fetch students once on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // GET all students from backend and update stats
  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students/')
      .then((res) => {
        setStudents(res.data);
        setTotalStudents(res.data.length);
        // ✅ Fixed — case insensitive filter
        setMaleStudents(res.data.filter((s) => s.gender.toLowerCase() === 'male').length);
        setFemaleStudents(res.data.filter((s) => s.gender.toLowerCase() === 'female').length);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching students!');
        toast.error('Failed to fetch students!');
        setLoading(false);
        console.log(err);
      });
  };

  // DELETE student by ID and update state without refetching
  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`http://localhost:5000/api/students/delete/${id}`)
        .then(() => {
          toast.success('Student deleted successfully! ✅');
          const updatedStudents = students.filter(student => student._id !== id);
          setStudents(updatedStudents);
          setTotalStudents(updatedStudents.length);
          // ✅ Fixed — uses updatedStudents (not res.data) with case insensitive filter
          setMaleStudents(updatedStudents.filter((s) => s.gender.toLowerCase() === 'male').length);
          setFemaleStudents(updatedStudents.filter((s) => s.gender.toLowerCase() === 'female').length);
        })
        .catch((err) => {
          toast.error('Error deleting student! ❌');
          console.log(err);
        });
    }
  };

  // Filter students by name, email, or gender based on search input
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Container className="mt-5">

        <h2 style={{ fontWeight: 'bold', marginBottom: '25px', color: '#1a1a2e' }}>
          📊 Student Dashboard
        </h2>

        {/* Dashboard stat cards */}
        <Row className="mb-4">

          <Col md={4} className="mb-3">
            <div
              style={{
                background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
                borderRadius: '15px',
                padding: '25px',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: '0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <h5>📚 Total Students</h5>
              <h2 style={{ fontWeight: 'bold' }}>{totalStudents}</h2>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div
              style={{
                background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                borderRadius: '15px',
                padding: '25px',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: '0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <h5>👨 Male Students</h5>
              <h2 style={{ fontWeight: 'bold' }}>{maleStudents}</h2>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div
              style={{
                background: 'linear-gradient(135deg, #fc466b, #3f5efb)',
                borderRadius: '15px',
                padding: '25px',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: '0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <h5>👩 Female Students</h5>
              <h2 style={{ fontWeight: 'bold' }}>{femaleStudents}</h2>
            </div>
          </Col>

        </Row>

        {/* Page title and Add button */}
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
            <Form.Control
              type="text"
              placeholder="🔍 Search by name, email or gender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col>
            <p className="mt-2 text-muted">
              Showing: <strong>{filteredStudents.length}</strong> student(s)
            </p>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <p>⏳ Loading students...</p>
        ) : (
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}
          >
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
                  // Empty state when no search results found
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div style={{ padding: '30px' }}>
                        <h1 style={{ fontSize: '60px' }}>📭</h1>
                        <h4 style={{ color: '#1a1a2e' }}>No Students Found</h4>
                        <p style={{ color: '#777' }}>
                          Try changing the search keyword or add a new student.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      style={{ transition: '0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.age}</td>
                      <td>{student.gender}</td>
                      <td>
                        {/* Navigate to update page with student ID */}
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/update-student/${student._id}`)}>
                          ✏️ Edit
                        </Button>
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
          </div>
        )}

      </Container>
    </>
  );
}

export default AllStudents;