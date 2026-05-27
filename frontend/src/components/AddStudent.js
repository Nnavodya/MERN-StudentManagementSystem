import React, { useState } from 'react';

// ===== Added Spinner component =====
// Spinner is used to show loading animation while form is submitting

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

// ===== Added React Toastify =====
// Toastify is used to show professional popup notifications

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// AddStudent component - Form to add a new student to the database
function AddStudent() {

  // state to store form data - each field matches the Student model in the backend
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  // state to show success or error message after form submission
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ===== Added loading state =====
  // This state is used to disable the submit button
  // and show loading spinner while data is being sent to backend

  const [loading, setLoading] = useState(false);

  // handleChange is called every time the user types in a form field
  // it updates the formData state with the new value

  // handleChange is called every time the user types in a form field
// it updates the formData state with the new value

const handleChange = (e) => {

  // ===== Added real-time validation support =====
  // Updates form data instantly while typing

  const { name, value } = e.target;

  setFormData({
  ...formData,
  [name]: value
});

// ===== Added real-time validation call =====

validateField(name, value);

};

  // handleSubmit is called when the user clicks the submit button
  // it sends the form data to the backend API

  const handleSubmit = async (e) => {

    e.preventDefault(); // prevent page reload on form submit

    // ===== Added input validation =====

    // remove extra spaces from inputs

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    // validate name length

    if (trimmedName.length < 3) {

      setErrorMessage('Name must contain at least 3 characters ❌');
      setSuccessMessage('');

      // ===== Added toast error message =====

      toast.error('Name must contain at least 3 characters ❌');

      return;

    }

    // validate email format

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {

      setErrorMessage('Please enter a valid email address ❌');
      setSuccessMessage('');

      // ===== Added toast error message =====

      toast.error('Please enter a valid email address ❌');

      return;

    }

    // validate age range

    if (formData.age < 1 || formData.age > 100) {

      setErrorMessage('Age must be between 1 and 100 ❌');
      setSuccessMessage('');

      // ===== Added toast error message =====

      toast.error('Age must be between 1 and 100 ❌');

      return;

    }

    // ===== Added loading state =====

    setLoading(true);

    try {

      // sending POST request to backend to add new student

      const res = await axios.post(
        'http://localhost:5000/students/add',
        formData
      );

      // success message after adding student

      setSuccessMessage('Student added successfully! ✅');
      setErrorMessage('');

      // ===== Added success toast =====

      toast.success('Student added successfully! ✅');

      // reset form fields after successful submission

      setFormData({
        name: '',
        email: '',
        age: '',
        gender: ''
      });

    } catch (err) {

      // ===== Added duplicate email handling =====
      // Shows proper message if email already exists

      if (err.response?.data?.error?.includes('duplicate')) {

        setErrorMessage('Email already exists ❌');

        // ===== Added duplicate email toast =====

        toast.error('Email already exists ❌');

      } else {

        setErrorMessage('Error adding student. Please try again! ❌');

        // ===== Added general error toast =====

        toast.error('Error adding student ❌');

      }

      setSuccessMessage('');

      console.log(err);

    } finally {

      // stop loading spinner

      setLoading(false);

    }

  };

  // ===== Added validation state =====
// Stores validation errors for each field

const [validationErrors, setValidationErrors] = useState({
  name: '',
  email: '',
  age: ''
});

  return (

    <>

      {/* ===== Added Toast Container ===== */}
      {/* This component displays toast notifications */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

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

              {/* Form title */}

              <h2 style={{
                color: '#fff',
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                ➕ Add New Student
              </h2>

              {/* Success message - shows after successful form submission */}

              {successMessage && (
                <Alert variant="success">
                  {successMessage}
                </Alert>
              )}

              {/* Error message - shows if form submission fails */}

              {errorMessage && (
                <Alert variant="danger">
                  {errorMessage}
                </Alert>
              )}

              {/* Add Student Form */}

              <Form onSubmit={handleSubmit}>

                {/* Name field */}

                <Form.Group className="mb-3">

                  <Form.Label style={{ color: '#ccc' }}>
                    👤 Full Name
                  </Form.Label>

                  <Form.Control
  type="text"
  name="name"
  placeholder="Enter student full name"
  value={formData.name}
  onChange={handleChange}
  required

  // ===== Added dynamic validation border =====

  style={{
    backgroundColor: '#16213e',
    border: validationErrors.name
      ? '1px solid #ff4d4f'
      : '1px solid #0f3460',
    color: '#fff',
    transition: '0.3s',
    boxShadow: validationErrors.name
      ? '0 0 10px rgba(255,77,79,0.5)'
      : 'none'
  }}
/>

{/* ===== Added real-time name validation message ===== */}

{validationErrors.name && (
  <small style={{ color: '#ff4d4f' }}>
    {validationErrors.name}
  </small>
)}

                </Form.Group>

                

                {/* Email field */}

                <Form.Group className="mb-3">

                  <Form.Label style={{ color: '#ccc' }}>
                    📧 Email Address
                  </Form.Label>

                  <Form.Control
  type="email"
  name="email"
  placeholder="Enter student email"
  value={formData.email}
  onChange={handleChange}
  required
  style={{
    backgroundColor: '#16213e',
    border: validationErrors.email
      ? '1px solid #ff4d4f'
      : '1px solid #0f3460',
    color: '#fff',
    transition: '0.3s',
    boxShadow: validationErrors.email
      ? '0 0 10px rgba(255,77,79,0.5)'
      : 'none'
  }}
/>

 {/* ===== Added real-time email validation message ===== */}

{validationErrors.email && (
  <small style={{ color: '#ff4d4f' }}>
    {validationErrors.email}
  </small>
)}

                </Form.Group>

                {/* Age field */}

                <Form.Group className="mb-3">

                  <Form.Label style={{ color: '#ccc' }}>
                    🎂 Age
                  </Form.Label>

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
    border: validationErrors.age
      ? '1px solid #ff4d4f'
      : '1px solid #0f3460',
    color: '#fff',
    transition: '0.3s',
    boxShadow: validationErrors.age
      ? '0 0 10px rgba(255,77,79,0.5)'
      : 'none'
  }}
/>

{/* ===== Added real-time age validation message ===== */}

{validationErrors.age && (
  <small style={{ color: '#ff4d4f' }}>
    {validationErrors.age}
  </small>
)}

                </Form.Group>

                {/* Gender field - dropdown select */}

                <Form.Group className="mb-4">

                  <Form.Label style={{ color: '#ccc' }}>
                    ⚥ Gender
                  </Form.Label>

                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: '#16213e',
                      border: '1px solid #0f3460',
                      color: '#fff'
                    }}
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

                    {/* Submit button - sends form data to backend */}

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      disabled={loading}
                      style={{
                        backgroundColor: '#0f3460',
                        border: 'none',
                        padding: '10px'
                      }}
                    >

                      {/* ===== Added loading spinner inside button ===== */}

                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          {' '}Adding Student...
                        </>
                      ) : (
                        '➕ Add Student'
                      )}

                    </Button>

                  </Col>

                  <Col>

                    {/* Reset button - clears all form fields */}

                    <Button
                      variant="outline-secondary"
                      type="reset"
                      className="w-100"
                      style={{ padding: '10px' }}
                      onClick={() => setFormData({
                        name: '',
                        email: '',
                        age: '',
                        gender: ''
                      })}
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

export default AddStudent; // exporting AddStudent component for use in App.js