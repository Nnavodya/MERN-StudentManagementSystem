import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

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

  // handleChange is called every time the user types in a form field
  // it updates the formData state with the new value
  const handleChange = (e) => {
    setFormData({
      ...formData, // keep existing form data
      [e.target.name]: e.target.value // update only the changed field
    });
  };

  // handleSubmit is called when the user clicks the submit button
  // it sends the form data to the backend API
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload on form submit

    // sending POST request to backend to add new student
    axios.post('http://localhost:5000/students/add', formData)
      .then((res) => {
        setSuccessMessage('Student added successfully! ✅'); // show success message
        setErrorMessage(''); // clear error message
        // reset form fields after successful submission
        setFormData({
          name: '',
          email: '',
          age: '',
          gender: ''
        });
      })
      .catch((err) => {
        setErrorMessage('Error adding student. Please try again! ❌'); // show error message
        setSuccessMessage(''); // clear success message
        console.log(err);
      });
  };

  return (
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
            <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>
              ➕ Add New Student
            </h2>

            {/* Success message - shows after successful form submission */}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}

            {/* Error message - shows if form submission fails */}
            {errorMessage && (
              <Alert variant="danger">{errorMessage}</Alert>
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
                  name="name" // name matches formData key
                  placeholder="Enter student full name"
                  value={formData.name}
                  onChange={handleChange} // update state on change
                  required // field is required
                  style={{
                    backgroundColor: '#16213e',
                    border: '1px solid #0f3460',
                    color: '#fff'
                  }}
                />
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
                    border: '1px solid #0f3460',
                    color: '#fff'
                  }}
                />
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
                  min="1" // minimum age value
                  max="100" // maximum age value
                  style={{
                    backgroundColor: '#16213e',
                    border: '1px solid #0f3460',
                    color: '#fff'
                  }}
                />
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
                    style={{
                      backgroundColor: '#0f3460',
                      border: 'none',
                      padding: '10px'
                    }}
                  >
                    ➕ Add Student
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
  );
}

export default AddStudent; // exporting AddStudent component for use in App.js