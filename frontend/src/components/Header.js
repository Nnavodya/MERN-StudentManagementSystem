// Header.js — Updated with Dark/Light Mode Toggle + Improved Search Bar

import React, { useState, useEffect } from 'react';
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

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // =========================
  // Dark Mode State
  // =========================
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'light' ? false : true;
  });

  // Apply theme to body
  useEffect(() => {

    if (darkMode) {
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#ffffff';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
      localStorage.setItem('theme', 'light');
    }

    document.body.style.transition = 'all 0.3s ease';

  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    navigate(`/students?search=${searchTerm.trim()}`);
    setSearchTerm('');
  };

  // Theme Colors
  const theme = {
    background: darkMode
      ? 'linear-gradient(135deg, #0d1b2a 0%, #1a2f4a 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',

    text: darkMode ? '#e2e8f0' : '#0f172a',

    subText: darkMode ? '#a0aec0' : '#475569',

    border: darkMode
      ? 'rgba(99,179,237,0.15)'
      : 'rgba(99,102,241,0.15)',

    searchBg: darkMode
      ? 'rgba(255,255,255,0.07)'
      : '#ffffff',

    cardBg: darkMode
      ? 'rgba(255,255,255,0.05)'
      : '#ffffff'
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        expand="lg"
        style={{
          background: theme.background,
          borderBottom: `1px solid ${theme.border}`,
          padding: '0',
          boxShadow: darkMode
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : '0 4px 20px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
      >

        <Container style={{ padding: '14px 24px' }}>

          {/* Brand */}
          <Navbar.Brand
            as={NavLink}
            to="/"
            style={{
              color: theme.text,
              fontWeight: '700',
              fontSize: '22px',
              letterSpacing: '0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: '0.3s'
            }}
          >
            🎓 Student MS
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

            <Nav
              className="ms-auto"
              style={{
                alignItems: 'center',
                gap: '8px'
              }}
            >

              {token ? (
                <>

                  {/* Navigation Links */}
                  {[
                    { to: '/', label: '🏠 Home', end: true },
                    { to: '/students', label: '👨‍🎓 Students' },
                    { to: '/add-student', label: '➕ Add Student' }
                  ].map((link) => (

                    <Nav.Link
                      key={link.to}
                      as={NavLink}
                      to={link.to}
                      end={link.end}
                      style={({ isActive }) => ({
                        color: isActive ? '#6366f1' : theme.subText,
                        backgroundColor: isActive
                          ? 'rgba(99,102,241,0.12)'
                          : 'transparent',

                        borderRadius: '10px',
                        padding: '8px 16px',
                        fontWeight: isActive ? '600' : '500',
                        transition: 'all 0.25s ease'
                      })}
                    >
                      {link.label}
                    </Nav.Link>

                  ))}

                  {/* Search Bar */}
                  <Form onSubmit={handleSearch}>

                    <InputGroup
                      style={{
                        width: '250px',
                        marginLeft: '8px'
                      }}
                    >

                      {/* Search Icon */}
                      <InputGroup.Text
                        style={{
                          background: theme.searchBg,
                          border: '1px solid #cbd5e1',
                          borderRight: 'none',
                          borderRadius: '14px 0 0 14px',
                          color: '#6366f1'
                        }}
                      >
                        🔍
                      </InputGroup.Text>

                      {/* Search Input */}
                      <Form.Control
                        type="text"
                        placeholder="Search student..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          backgroundColor: theme.searchBg,
                          border: '1px solid #cbd5e1',
                          borderLeft: 'none',
                          color: theme.text,
                          borderRadius: '0 14px 14px 0',
                          padding: '10px 14px',
                          fontSize: '14px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#6366f1';
                          e.target.style.boxShadow =
                            '0 0 10px rgba(99,102,241,0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#cbd5e1';
                          e.target.style.boxShadow = 'none';
                        }}
                      />

                    </InputGroup>

                  </Form>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    style={{
                      border: 'none',
                      background: darkMode
                        ? 'rgba(255,255,255,0.08)'
                        : '#ffffff',
                      color: darkMode ? '#facc15' : '#4f46e5',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '18px',
                      transition: 'all 0.3s ease',
                      boxShadow: darkMode
                        ? '0 4px 12px rgba(0,0,0,0.3)'
                        : '0 4px 12px rgba(99,102,241,0.15)'
                    }}
                  >
                    {darkMode ? '☀️' : '🌙'}
                  </button>

                  {/* User */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      background: theme.cardBg,
                      border: `1px solid ${theme.border}`
                    }}
                  >

                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg,#4F46E5,#06B6D4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: '13px'
                      }}
                    >
                      {username
                        ? username.slice(0, 2).toUpperCase()
                        : 'U'}
                    </div>

                    <span
                      style={{
                        color: theme.text,
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {username}
                    </span>

                  </div>

                  {/* Logout */}
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    style={{
                      color: '#ef4444',
                      background: 'transparent',
                      border: '1px solid rgba(239,68,68,0.3)',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: '600',
                      transition: '0.3s'
                    }}
                  >
                    🚪 Logout
                  </button>

                </>
              ) : (

                <Nav.Link
                  as={NavLink}
                  to="/login"
                  style={{
                    color: theme.text,
                    fontWeight: '500'
                  }}
                >
                  🔐 Login
                </Nav.Link>

              )}

            </Nav>

          </Navbar.Collapse>

        </Container>

      </Navbar>

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >

        <Modal.Header
          closeButton
          style={{
            background: theme.background,
            borderBottom: `1px solid ${theme.border}`
          }}
        >
          <Modal.Title
            style={{
              color: theme.text
            }}
          >
            🚪 Confirm Logout
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            background: theme.background,
            color: theme.subText
          }}
        >
          Are you sure you want to logout?
        </Modal.Body>

        <Modal.Footer
          style={{
            background: theme.background,
            borderTop: `1px solid ${theme.border}`
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Modal.Footer>

      </Modal>
    </>
  );
}

export default Header;