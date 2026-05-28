// Header.js — Navigation bar with logout support

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  // Remove token and username from localStorage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: '#1a1a2e' }}>
      <Container>

        <Navbar.Brand as={NavLink} to="/">
          🎓 Student MS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="student-ms-navbar" />

        <Navbar.Collapse id="student-ms-navbar">
          <Nav className="ms-auto">

            {token ? (
              // Show nav links only when logged in
              <>
                <Nav.Link as={NavLink} to="/">🏠 Home</Nav.Link>
                <Nav.Link as={NavLink} to="/students">👨‍🎓 Students</Nav.Link>
                <Nav.Link as={NavLink} to="/add-student">➕ Add Student</Nav.Link>

                {/* Show logged in username */}
                <Nav.Link disabled style={{ color: '#a0aec0' }}>
                  👤 {username}
                </Nav.Link>

                {/* Logout button */}
                <Nav.Link
                  onClick={handleLogout}
                  style={{
                    color: '#fc466b',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  🚪 Logout
                </Nav.Link>
              </>
            ) : (
              // Show Login link only when not logged in
              <Nav.Link as={NavLink} to="/login">🔐 Login</Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;