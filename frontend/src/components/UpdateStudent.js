import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // useParams gets :id from URL

// UpdateStudent component - Form to update an existing student
function UpdateStudent() {

  // useParams gets the student id from URL e.g /update-student/abc123
  const { id } = useParams();

  return (
    <Container className="mt-5">
      <h2>✏️ Update Student</h2>
      <p>Updating student with ID: {id}</p>
    </Container>
  );
}

export default UpdateStudent; // exporting UpdateStudent component for use in App.js