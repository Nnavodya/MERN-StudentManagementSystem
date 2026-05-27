import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'react-router-dom/Link'; // Importing Link component for client-side navigation

// Header component - Navigation bar for Student Management System
function Header() {
  return (
    // dark variant navbar with dark background color
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#1a1a2e' }}>
      <Container>

        {/* Brand/Logo - clicking takes to home page */}
        <Navbar.Brand href="/">
          🎓 Student MS
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="student-ms-navbar" />

        {/* Collapsible nav links */}
        <Navbar.Collapse id="student-ms-navbar">
          <Nav className="ms-auto"> {/* ms-auto pushes links to the right */}

            {/* Home link */}
            <Nav.Link href="/">
              🏠 Home
            </Nav.Link>

            {/* View all students link */}
            <Nav.Link href="/students">
              👨‍🎓 Students
            </Nav.Link>

            {/* Add new student link */}
            <Nav.Link href="/add-student">
              ➕ Add Student
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header; // exporting Header component for use in App.js