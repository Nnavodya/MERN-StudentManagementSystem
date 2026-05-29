// Header.js — Improved Navbar with better spacing, hover effects and smooth transitions

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
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <>
      {/* ===== Improved Navbar ===== */}
      <Navbar
        expand="lg"
        variant="dark"
        style={{
          background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2f4a 100%)',
          borderBottom: '1px solid rgba(99,179,237,0.15)',
          padding: '0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <Container style={{ padding: '14px 24px' }}>

          {/* Brand */}
          <Navbar.Brand
            as={NavLink}
            to="/"
            style={{
              color: '#e2e8f0',
              fontWeight: '700',
              fontSize: '22px',
              letterSpacing: '0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#63b3ed'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#e2e8f0'}
          >
            🎓 Student MS
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="student-ms-navbar"
            style={{
              borderColor: 'rgba(99,179,237,0.3)',
              padding: '6px 10px'
            }}
          />

          <Navbar.Collapse id="student-ms-navbar">
            <Nav className="ms-auto" style={{ alignItems: 'center', gap: '4px', padding: '8px 0' }}>

              {token ? (
                <>
                  {/* Nav Links with smooth hover */}
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
                        color: isActive ? '#63b3ed' : '#a0aec0',
                        backgroundColor: isActive ? 'rgba(99,179,237,0.12)' : 'transparent',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontWeight: isActive ? '600' : '400',
                        fontSize: '15px',
                        transition: 'all 0.25s ease',
                        border: isActive ? '1px solid rgba(99,179,237,0.2)' : '1px solid transparent'
                      })}
                      onMouseEnter={(e) => {
                        if (!e.currentTarget.style.backgroundColor.includes('0.12')) {
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)';
                          e.currentTarget.style.color = '#e2e8f0';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!e.currentTarget.style.backgroundColor.includes('0.12')) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#a0aec0';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {link.label}
                    </Nav.Link>
                  ))}

                  {/* Divider */}
                  <div style={{
                    width: '1px', height: '28px',
                    backgroundColor: 'rgba(99,179,237,0.2)',
                    margin: '0 8px'
                  }} />

                  {/* Search Box */}
                  <Form onSubmit={handleSearch}>
                    <InputGroup style={{ width: '220px' }}>
                      <Form.Control
                        type="text"
                        placeholder="Search student..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(99,179,237,0.25)',
                          borderRight: 'none',
                          color: '#e2e8f0',
                          fontSize: '13px',
                          borderRadius: '8px 0 0 8px',
                          transition: 'all 0.25s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.backgroundColor = 'rgba(99,179,237,0.1)';
                          e.target.style.borderColor = '#63b3ed';
                          e.target.style.boxShadow = '0 0 0 3px rgba(99,179,237,0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.backgroundColor = 'rgba(255,255,255,0.07)';
                          e.target.style.borderColor = 'rgba(99,179,237,0.25)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: '#4F46E5',
                          border: '1px solid #4F46E5',
                          borderLeft: 'none',
                          borderRadius: '0 8px 8px 0',
                          padding: '0 14px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3730a3'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}
                      >
                        🔍
                      </Button>
                    </InputGroup>
                  </Form>

                  {/* Divider */}
                  <div style={{
                    width: '1px', height: '28px',
                    backgroundColor: 'rgba(99,179,237,0.2)',
                    margin: '0 8px'
                  }} />

                  {/* User Avatar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(99,179,237,0.15)',
                    cursor: 'default'
                  }}>
                    <div style={{
                      width: '30px', height: '30px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4F46E5, #06B6D4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: '700', color: '#fff',
                      boxShadow: '0 2px 8px rgba(79,70,229,0.4)'
                    }}>
                      {username ? username.slice(0, 2).toUpperCase() : 'U'}
                    </div>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>
                      {username}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    style={{
                      color: '#fc8181',
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(252,129,129,0.3)',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      transition: 'all 0.25s ease',
                      marginLeft: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(252,129,129,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(252,129,129,0.5)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(252,129,129,0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    🚪 Logout
                  </button>

                </>
              ) : (
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  style={({ isActive }) => ({
                    color: isActive ? '#63b3ed' : '#a0aec0',
                    backgroundColor: isActive ? 'rgba(99,179,237,0.12)' : 'transparent',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontWeight: '500',
                    fontSize: '15px',
                    transition: 'all 0.25s ease'
                  })}
                >
                  🔐 Login
                </Nav.Link>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered size="sm">
        <Modal.Header closeButton style={{
          background: 'linear-gradient(135deg, #0d1b2a, #1a2f4a)',
          borderBottom: '1px solid rgba(99,179,237,0.15)'
        }}>
          <Modal.Title style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600' }}>
            🚪 Confirm Logout
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{
          background: 'linear-gradient(135deg, #0d1b2a, #1a2f4a)',
          color: '#a0aec0', fontSize: '14px', padding: '20px 24px'
        }}>
          Are you sure you want to logout?
        </Modal.Body>

        <Modal.Footer style={{
          background: 'linear-gradient(135deg, #0d1b2a, #1a2f4a)',
          borderTop: '1px solid rgba(99,179,237,0.15)',
          gap: '8px'
        }}>
          <Button variant="outline-secondary" size="sm"
            style={{ borderRadius: '8px', fontSize: '13px' }}
            onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleLogout}
            style={{
              background: 'linear-gradient(135deg, #fc8181, #f56565)',
              border: 'none', borderRadius: '8px',
              fontSize: '13px', fontWeight: '600',
              boxShadow: '0 2px 8px rgba(252,129,129,0.3)'
            }}>
            Yes, Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;