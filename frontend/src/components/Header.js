// ===================================================
// Header.js
// Navigation bar with logout support and search bar
// Theme: Midnight Blue (#0d1b2a)
// ===================================================

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  // get token and username from localStorage
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  // ===== Logout confirmation modal state =====
  // Controls whether the logout confirmation modal is visible

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ===== Search state =====
  // Stores the current search input value typed by user

  const [searchTerm, setSearchTerm] = useState('');

  // ===== handleLogout =====
  // Removes token and username from localStorage and redirects to login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setShowLogoutModal(false);
    navigate('/login');
  };

  // ===== handleSearch =====
  // Navigates to /students page with search query in URL params

  const handleSearch = (e) => {
    e.preventDefault();

    // if search term is empty, do nothing
    if (!searchTerm.trim()) return;

    // navigate to students page with search query as URL param
    navigate(`/students?search=${searchTerm.trim()}`);

    // clear search input after search
    setSearchTerm('');
  };

  // ===== Active link style =====
  // Applied to the currently active NavLink
  // ===== Increased font size to 16px for better readability =====

  const activeLinkStyle = {
    color: '#63b3ed',
    backgroundColor: 'rgba(99,179,237,0.12)',
    borderRadius: '6px',
    padding: '6px 14px',
    fontWeight: '500',
    fontSize: '16px'
  };

  // ===== Default link style =====
  // Applied to inactive NavLinks
  // ===== Increased font size to 16px for better readability =====

  const defaultLinkStyle = {
    color: '#a0aec0',
    padding: '6px 14px',
    transition: '0.2s',
    fontSize: '16px'
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
          padding: '12px 0'
        }}
      >
        <Container>

          {/* ===== Brand / Logo ===== */}
          {/* ===== Increased font size to 22px for strong brand presence ===== */}

          <Navbar.Brand
            as={NavLink}
            to="/"
            style={{
              color: '#e2e8f0',
              fontWeight: '700',
              fontSize: '22px',
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
            <Nav className="ms-auto" style={{ alignItems: 'center', gap: '6px' }}>

              {token ? (

                // ===== Logged in — show nav links and search =====

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

                  {/* ===== Search Box with Icon ===== */}
                  {/* Always visible search input with search icon button */}
                  {/* Submits on button click or pressing Enter */}

                  <Form
                    onSubmit={handleSearch}
                    style={{ marginLeft: '8px' }}
                  >
                    <InputGroup style={{ width: '220px' }}>

                      {/* Search text input */}

                      <Form.Control
                        type="text"
                        placeholder="Search student..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          backgroundColor: '#1e3a5f',
                          border: '1px solid #2d5a8e',
                          borderRight: 'none',
                          color: '#e2e8f0',
                          fontSize: '14px',
                          borderRadius: '8px 0 0 8px'
                        }}
                      />

                      {/* Search icon button */}

                      <Button
                        type="submit"
                        style={{
                          backgroundColor: '#63b3ed',
                          border: '1px solid #63b3ed',
                          borderLeft: 'none',
                          borderRadius: '0 8px 8px 0',
                          padding: '0 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {/* Search icon using unicode */}
                        <span style={{ fontSize: '15px' }}>🔍</span>
                      </Button>

                    </InputGroup>
                  </Form>

                  {/* ===== User Avatar with initials ===== */}
                  {/* Shows first 2 letters of username in a styled circle */}

                  <Nav.Link
                    disabled
                    style={{
                      color: '#a0aec0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 10px',
                      fontSize: '15px'
                    }}
                  >

                    {/* Initials circle */}

                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#1e3a5f',
                      border: '1.5px solid #63b3ed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#63b3ed'
                    }}>
                      {/* Get first 2 letters of username and uppercase */}
                      {username ? username.slice(0, 2).toUpperCase() : 'U'}
                    </div>

                    {/* Username text */}
                    <span style={{ fontSize: '15px' }}>{username}</span>

                  </Nav.Link>

                  {/* ===== Logout Button ===== */}
                  {/* Opens confirmation modal before logging out */}
                  {/* ===== Increased font size to 15px ===== */}

                  <Nav.Link
                    onClick={() => setShowLogoutModal(true)}
                    style={{
                      color: '#fc8181',
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: '1px solid #fc818133',
                      marginLeft: '4px',
                      transition: '0.2s',
                      fontSize: '15px'
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