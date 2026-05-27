import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// UpdateStudent component - Form to update an existing student's details
function UpdateStudent() {

  // useParams gets :id from URL — e.g /update-student/abc123 → id = abc123
  const { id } = useParams();

  // useNavigate redirects to another page after update
  const navigate = useNavigate();

  // state to store form data pre-filled with existing student data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  // state for success and error messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect fetches existing student data when component loads
  useEffect(() => {
    axios.get(`http://localhost:5000/students/get/${id}`)
      .then((res) => {
        // pre-fill form with existing student data
        setFormData({
          name: res.data.student.name,
          email: res.data.student.email,
          age: res.data.student.age,
          gender: res.data.student.gender
        });
      })
      .catch((err) => {
        setErrorMessage('Error fetching student data! ❌');
        console.log(err);
      });
  }, [id]);

  // handleChange updates formData state when user edits fields
  const handleChange = (e) => {
    setFormData({
      ...formData, // keep existing data unchanged
      [e.target.name]: e.target.value // update only changed field
    });
  };

  return (
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

            <Form>
              {/* Name field - pre-filled */}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ccc' }}>👤 Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                />
              </Form.Group>

              {/* Email field - pre-filled */}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ccc' }}>📧 Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                />
              </Form.Group>

              {/* Age field - pre-filled */}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#ccc' }}>🎂 Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                />
              </Form.Group>

              {/* Gender field - pre-filled */}
              <Form.Group className="mb-4">
                <Form.Label style={{ color: '#ccc' }}>⚥ Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              {/* Buttons */}
              <Row>
                <Col>
                  <Button variant="primary" type="submit" className="w-100"
                    style={{ backgroundColor: '#0f3460', border: 'none', padding: '10px' }}>
                    ✏️ Update Student
                  </Button>
                </Col>
                <Col>
                  {/* Cancel - goes back without saving */}
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
  );
}

export default UpdateStudent; // exporting UpdateStudent component for use in App.js