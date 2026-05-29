import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner
} from 'react-bootstrap';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// AddStudent component - Form to add a new student to the database
function AddStudent() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    age: ''
  });

  const validateField = (name, value) => {

    let error = '';

    if (name === 'name') {
      if (!value.trim()) {
        error = 'Name is required.';
      } else if (value.trim().length < 3) {
        error = 'Name must contain at least 3 characters.';
      }
    }

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = 'Email is required.';
      } else if (!emailPattern.test(value.trim())) {
        error = 'Please enter a valid email address.';
      }
    }

    if (name === 'age') {
      if (!value) {
        error = 'Age is required.';
      } else if (value < 1 || value > 100) {
        error = 'Age must be between 1 and 100.';
      }
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error
    }));

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (trimmedName.length < 3) {
      setErrorMessage('Name must contain at least 3 characters ❌');
      setSuccessMessage('');
      toast.error('Name must contain at least 3 characters ❌');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address ❌');
      setSuccessMessage('');
      toast.error('Please enter a valid email address ❌');
      return;
    }

    if (formData.age < 1 || formData.age > 100) {
      setErrorMessage('Age must be between 1 and 100 ❌');
      setSuccessMessage('');
      toast.error('Age must be between 1 and 100 ❌');
      return;
    }

    setLoading(true);

    try {

      await axios.post('http://localhost:5000/api/students/add', formData);

      setSuccessMessage('Student added successfully! ✅');
      setErrorMessage('');
      toast.success('Student added successfully! ✅');

      setFormData({ name: '', email: '', age: '', gender: '' });
      setValidationErrors({ name: '', email: '', age: '' });

      // Navigate to students page after 1 second so recent activity feed updates
      setTimeout(() => navigate('/students'), 1000);

    } catch (err) {

      if (err.response?.data?.error?.includes('duplicate')) {
        setErrorMessage('Email already exists ❌');
        toast.error('Email already exists ❌');
      } else {
        setErrorMessage('Error adding student. Please try again! ❌');
        toast.error('Error adding student ❌');
      }

      setSuccessMessage('');
      console.log(err);

    } finally {
      setLoading(false);
    }

  };

  return (

    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>

            {/* Form card */}
            <div style={{
              backgroundColor: '#1a1a2e',
              borderRadius: '15px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>

              <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
                ➕ Add New Student
              </h2>

              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit}>

                {/* Name field */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#ccc' }}>👤 Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter student full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: '#16213e',
                      border: validationErrors.name ? '1px solid #ff4d4f' : '1px solid #0f3460',
                      color: '#fff',
                      transition: '0.3s',
                      boxShadow: validationErrors.name ? '0 0 10px rgba(255,77,79,0.5)' : 'none'
                    }}
                  />
                  {validationErrors.name && (
                    <small style={{ color: '#ff4d4f' }}>{validationErrors.name}</small>
                  )}
                </Form.Group>

                {/* Email field */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#ccc' }}>📧 Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter student email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: '#16213e',
                      border: validationErrors.email ? '1px solid #ff4d4f' : '1px solid #0f3460',
                      color: '#fff',
                      transition: '0.3s',
                      boxShadow: validationErrors.email ? '0 0 10px rgba(255,77,79,0.5)' : 'none'
                    }}
                  />
                  {validationErrors.email && (
                    <small style={{ color: '#ff4d4f' }}>{validationErrors.email}</small>
                  )}
                </Form.Group>

                {/* Age field */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#ccc' }}>🎂 Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    placeholder="Enter student age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="1"
                    max="100"
                    style={{
                      backgroundColor: '#16213e',
                      border: validationErrors.age ? '1px solid #ff4d4f' : '1px solid #0f3460',
                      color: '#fff',
                      transition: '0.3s',
                      boxShadow: validationErrors.age ? '0 0 10px rgba(255,77,79,0.5)' : 'none'
                    }}
                  />
                  {validationErrors.age && (
                    <small style={{ color: '#ff4d4f' }}>{validationErrors.age}</small>
                  )}
                </Form.Group>

                {/* Gender field */}
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

                {/* Submit and Reset buttons */}
                <Row>
                  <Col>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      disabled={loading}
                      style={{
                        backgroundColor: '#0f3460',
                        border: 'none',
                        padding: '10px',
                        transition: '0.3s',
                        fontWeight: '600',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          {' '}Adding Student...
                        </>
                      ) : (
                        '➕ Add Student'
                      )}
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      variant="outline-secondary"
                      type="reset"
                      className="w-100"
                      style={{ padding: '10px' }}
                      onClick={() => {
                        setFormData({ name: '', email: '', age: '', gender: '' });
                        setValidationErrors({ name: '', email: '', age: '' });
                      }}
                    >
                      🔄 Reset
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

export default AddStudent;