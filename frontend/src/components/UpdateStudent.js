import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// UpdateStudent component - Form to update an existing student
function UpdateStudent() {

  // useParams gets the student id from URL
  const { id } = useParams();

  // state to store form data - pre-filled with existing student data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  // state for error message
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect fetches existing student data when component loads
  useEffect(() => {
    axios.get(`http://localhost:5000/students/get/${id}`)
      .then((res) => {
        // pre-fill form with existing student data from database
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
  }, [id]); // re-runs if id changes

  return (
    <Container className="mt-5">
      <h2>✏️ Update Student: {formData.name}</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Container>
  );
}

export default UpdateStudent; // exporting UpdateStudent component for use in App.js