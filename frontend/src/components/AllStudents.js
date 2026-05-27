import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// AllStudents component - displays all students from the database
function AllStudents() {

  // state to hold list of students fetched from database
  const [students, setStudents] = useState([]);

  return (
    <Container className="mt-5">
      <h2>👨‍🎓 All Students</h2>
    </Container>
  );
}

export default AllStudents; // Exporting the AllStudents component for use in other parts of the app