// ===================================================
// Header.js
// Navigation bar with logout support
// Theme: Midnight Blue (#0d1b2a)
// ===================================================

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  // get token and username from localStorage
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  // ===== Added logout confirmation modal state =====
  // Controls whether the logout confirmation modal is visible

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ===== handleLogout =====
  // Removes token and username from localStorage and redirects to login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setShowLogoutModal(false);
    navigate('/login');
  };

  // ===== Active link style =====
  // Applied to the currently active NavLink

  const activeLinkStyle = {
    color: '#63b3ed',
    backgroundColor: 'rgba(99,179,237,0.12)',
    borderRadius: '6px',
    padding: '6px 12px',
    fontWeight: '500'
  };

  // ===== Default link style =====
  // Applied to inactive NavLinks

  const defaultLinkStyle = {
    color: '#a0aec0',
    padding: '6px 12px',
    transition: '0.2s'
  };

  return (

    <>

      {/* ===== Midnight Blue Navbar ===== */}
      {/* Background: #0d1b2a — deep midnight blue */}

      <Navbar
        expand="lg"
        variant="dark"
        style={{
          backgroundColor: '#0d1b2a',
          borderBottom: '1px solid #1e3a5f',
          padding: '10px 0'
        }}
      >
        <Container>

          {/* ===== Brand / Logo ===== */}
          {/* Displayed on left side of navbar */}

          <Navbar.Brand
            as={NavLink}
            to="/"
            style={{
              color: '#e2e8f0',
              fontWeight: '600',
              fontSize: '18px',
              letterSpacing: '0.5px'
            }}
          >
            🎓 Student MS
          </Navbar.Brand>

          {/* ===== Mobile Hamburger Toggle ===== */}
          {/* Shown on small screens — collapses nav links */}

          <Navbar.Toggle
            aria-controls="student-ms-navbar"
            style={{ borderColor: '#2d4a6b' }}
          />

          <Navbar.Collapse id="student-ms-navbar">
            <Nav className="ms-auto" style={{ alignItems: 'center', gap: '4px' }}>

              {token ? (

                // ===== Logged in — show nav links =====

                <>

                  {/* Home link */}

                  <Nav.Link
                    as={NavLink}
                    to="/"
                    end
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : defaultLinkStyle
                    }
                  >
                    🏠 Home
                  </Nav.Link>

                  {/* Students link */}

                  <Nav.Link
                    as={NavLink}
                    to="/students"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : defaultLinkStyle
                    }
                  >
                    👨‍🎓 Students
                  </Nav.Link>

                  {/* Add Student link */}

                  <Nav.Link
                    as={NavLink}
                    to="/add-student"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : defaultLinkStyle
                    }
                  >
                    ➕ Add Student
                  </Nav.Link>

                  {/* ===== User Avatar with initials ===== */}
                  {/* Shows first 2 letters of username in a styled circle */}

                  <Nav.Link
                    disabled
                    style={{
                      color: '#a0aec0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 10px'
                    }}
                  >

                    {/* Initials circle */}

                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: '#1e3a5f',
                      border: '1.5px solid #63b3ed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#63b3ed'
                    }}>
                      {/* Get first 2 letters of username and uppercase */}
                      {username ? username.slice(0, 2).toUpperCase() : 'U'}
                    </div>

                    {/* Username text */}
                    <span style={{ fontSize: '13px' }}>{username}</span>

                  </Nav.Link>

                  {/* ===== Logout Button ===== */}
                  {/* Opens confirmation modal before logging out */}

                  <Nav.Link
                    onClick={() => setShowLogoutModal(true)}
                    style={{
                      color: '#fc8181',
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #fc818133',
                      marginLeft: '4px',
                      transition: '0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fc818122';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    🚪 Logout
                  </Nav.Link>

                </>

              ) : (

                // ===== Not logged in — show Login link only =====

                <Nav.Link
                  as={NavLink}
                  to="/login"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : defaultLinkStyle
                  }
                >
                  🔐 Login
                </Nav.Link>

              )}

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* ===== Logout Confirmation Modal ===== */}
      {/* Shows when logout button is clicked — prevents accidental logout */}

      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
        size="sm"
      >

        <Modal.Header
          closeButton
          style={{ backgroundColor: '#0d1b2a', borderBottom: '1px solid #1e3a5f' }}
        >
          <Modal.Title style={{ color: '#e2e8f0', fontSize: '16px' }}>
            🚪 Confirm Logout
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: '#0d1b2a', color: '#a0aec0', fontSize: '14px' }}>
          Are you sure you want to logout?
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: '#0d1b2a', borderTop: '1px solid #1e3a5f' }}>

          {/* Cancel button — close modal without logging out */}

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </Button>

          {/* Confirm logout button */}

          <Button
            size="sm"
            onClick={handleLogout}
            style={{
              backgroundColor: '#fc8181',
              border: 'none',
              color: '#fff'
            }}
          >
            Yes, Logout
          </Button>

        </Modal.Footer>

      </Modal>

    </>

  );

}

export default Header;