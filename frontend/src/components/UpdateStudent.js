import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// UpdateStudent component - Form to update an existing student's details
function UpdateStudent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', age: '', gender: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch existing student data when component loads
  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/get/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.student.name,
          email: res.data.student.email,
          age: res.data.student.age,
          gender: res.data.student.gender
        });
      })
      .catch((err) => {
        setErrorMessage('Error fetching student data! ❌');
        toast.error('Error fetching student data! ❌');
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send PUT request to update student
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/students/update/${id}`, formData)
      .then(() => {
        setSuccessMessage('Student updated successfully! ✅');
        setErrorMessage('');
        toast.success('Student updated successfully! ✅');
        // Redirect to students list after 1.5 seconds
        setTimeout(() => navigate('/students'), 1500);
      })
      .catch((err) => {
        setErrorMessage('Error updating student. Please try again! ❌');
        setSuccessMessage('');
        toast.error('Error updating student! ❌');
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <div style={{
              backgroundColor: '#1a1a2e',
              borderRadius: '15px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>

              <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
                ✏️ Update Student
              </h2>

              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit}>

                {/* Name field - pre-filled with existing student name */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#ccc' }}>👤 Full Name</Form.Label>
                  <Form.Control
                    type="text" name="name"
                    placeholder="Enter student full name"
                    value={formData.name}
                    onChange={handleChange} required
                    style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                  />
                </Form.Group>

                {/* Email field - pre-filled with existing student email */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#ccc' }}>📧 Email Address</Form.Label>
                  <Form.Control
                    type="email" name="email"
                    placeholder="Enter student email"
                    value={formData.email}
                    onChange={handleChange} required
                    style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                  />
                </Form.Group>

                {/* Age field - pre-filled with existing student age */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#ccc' }}>🎂 Age</Form.Label>
                  <Form.Control
                    type="number" name="age"
                    placeholder="Enter student age"
                    value={formData.age}
                    onChange={handleChange} required min="1" max="100"
                    style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                  />
                </Form.Group>

                {/* Gender field - pre-filled with existing student gender */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: '#ccc' }}>⚥ Gender</Form.Label>
                  <Form.Select
                    name="gender" value={formData.gender}
                    onChange={handleChange} required
                    style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                {/* Update and Cancel buttons */}
                <Row>
                  <Col>
                    <Button variant="primary" type="submit" className="w-100"
                      style={{ backgroundColor: '#0f3460', border: 'none', padding: '10px' }}>
                      ✏️ Update Student
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-secondary" className="w-100"
                      style={{ padding: '10px' }}
                      onClick={() => navigate('/students')}>
                      ❌ Cancel
                    </Button>
                  </Col>
                </Row>

              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateStudent;