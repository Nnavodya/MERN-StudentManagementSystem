import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'; // NavLink highlights the active page automatically

// Header component - Navigation bar for Student Management System
function Header() {
  return (
    // dark variant navbar with dark background color
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#1a1a2e' }}>
      <Container>

        {/* Brand/Logo - NavLink used instead of href for React Router navigation */}
        <Navbar.Brand as={NavLink} to="/">
          🎓 Student MS
        </Navbar.Brand>

        {/* Toggle button for mobile view - shows hamburger menu on small screens */}
        <Navbar.Toggle aria-controls="student-ms-navbar" />

        {/* Collapsible nav links - collapses on small screens */}
        <Navbar.Collapse id="student-ms-navbar">
          <Nav className="ms-auto"> {/* ms-auto pushes links to the right */}

            {/* NavLink highlights the active page automatically */}
            <Nav.Link as={NavLink} to="/">🏠 Home</Nav.Link>
            <Nav.Link as={NavLink} to="/students">👨‍🎓 Students</Nav.Link>
            <Nav.Link as={NavLink} to="/add-student">➕ Add Student</Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header; // exporting Header component for use in App.js