import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Header component - Navigation bar for Student Management System
function Header() {
  return (
    // dark variant navbar with dark background color
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#1a1a2e' }}>
      <Container>

        {/* Brand/Logo */}
        <Navbar.Brand href="/">
          🎓 Student MS
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="student-ms-navbar" />

        {/* Collapsible nav links */}
        <Navbar.Collapse id="student-ms-navbar">
          <Nav className="ms-auto">
            <Nav.Link href="/">🏠 Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header; // exporting Header component for use in App.js