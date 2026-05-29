// ===================================================
// Footer.js
// Footer component displayed at the bottom of every page.
// Contains system name, quick links, tech stack badges,
// copyright info and GitHub link.
// ===================================================

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Link component from react-router-dom for internal navigation
import { Link } from 'react-router-dom';

// Footer component - renders at the bottom of every page via App.js
function Footer() {

  // get current year dynamically for copyright text
  const currentYear = new Date().getFullYear();

  return (

    <footer style={{
      backgroundColor: '#1a1a2e',
      color: '#fff',
      marginTop: '60px',
      paddingTop: '40px',
      paddingBottom: '20px'
    }}>

      <Container>

        {/* ===== Footer Top Section ===== */}
        {/* Three columns: brand info, quick links, tech stack */}

        <Row className="mb-4">

          {/* Column 1 - Brand / System Name */}

          <Col md={4} className="mb-4 mb-md-0">

            {/* System name and logo icon */}

            <h5 style={{
              color: '#fff',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              🎓 Student MS
            </h5>

            {/* Short description of the system */}

            <p style={{
              color: '#aaa',
              fontSize: '14px',
              lineHeight: '1.7',
              marginBottom: '0'
            }}>
              A full-stack student management system built using the MERN stack.
              Developed as part of internship preparation.
            </p>

          </Col>

          {/* Column 2 - Quick Navigation Links */}

          <Col md={4} className="mb-4 mb-md-0">

            <h6 style={{
              color: '#fff',
              fontWeight: '600',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontSize: '13px',
              letterSpacing: '1px'
            }}>
              Quick Links
            </h6>

            {/* Internal navigation links using react-router-dom Link */}

            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0'
            }}>

              {/* Home page link */}

              <li style={{ marginBottom: '10px' }}>
                <Link
                  to="/"
                  style={{
                    color: '#aaa',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: '0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#aaa'}
                >
                  🏠 Home
                </Link>
              </li>

              {/* All students page link */}

              <li style={{ marginBottom: '10px' }}>
                <Link
                  to="/students"
                  style={{
                    color: '#aaa',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: '0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#aaa'}
                >
                  👨‍🎓 All Students
                </Link>
              </li>

              {/* Add student page link */}

              <li style={{ marginBottom: '10px' }}>
                <Link
                  to="/add-student"
                  style={{
                    color: '#aaa',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: '0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#aaa'}
                >
                  ➕ Add Student
                </Link>
              </li>

            </ul>

          </Col>

          {/* Column 3 - Tech Stack Badges */}

          <Col md={4}>

            <h6 style={{
              color: '#fff',
              fontWeight: '600',
              marginBottom: '15px',
              textTransform: 'uppercase',
              fontSize: '13px',
              letterSpacing: '1px'
            }}>
              Built With
            </h6>

            {/* Tech stack pills/badges */}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>

              {/* React badge */}

              <span style={{
                backgroundColor: '#20232a',
                color: '#61dafb',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                border: '1px solid #61dafb33'
              }}>
                ⚛️ React
              </span>

              {/* Node.js badge */}

              <span style={{
                backgroundColor: '#20232a',
                color: '#68a063',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                border: '1px solid #68a06333'
              }}>
                🟢 Node.js
              </span>

              {/* Express badge */}

              <span style={{
                backgroundColor: '#20232a',
                color: '#fff',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                border: '1px solid #ffffff33'
              }}>
                🚀 Express
              </span>

              {/* MongoDB badge */}

              <span style={{
                backgroundColor: '#20232a',
                color: '#4db33d',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                border: '1px solid #4db33d33'
              }}>
                🍃 MongoDB
              </span>

              {/* Bootstrap badge */}

              <span style={{
                backgroundColor: '#20232a',
                color: '#7952b3',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                border: '1px solid #7952b333'
              }}>
                🅱️ Bootstrap
              </span>

            </div>

          </Col>

        </Row>

        {/* ===== Footer Bottom Section ===== */}
        {/* Divider line, copyright text and GitHub link */}

        <hr style={{
          borderColor: '#333',
          marginBottom: '20px'
        }} />

        <Row className="align-items-center">

          {/* Copyright text - left side */}

          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <p style={{
              color: '#888',
              fontSize: '13px',
              margin: '0'
            }}>
              © {currentYear} Nethmi Navodya. All rights reserved.
            </p>
          </Col>

          {/* GitHub link - right side */}

          <Col md={6} className="text-center text-md-end">
            <a
              href="https://github.com/Nnavodya"
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#aaa',
                textDecoration: 'none',
                fontSize: '13px',
                transition: '0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}
            >
              🔗 GitHub — Nnavodya
            </a>
          </Col>

        </Row>

      </Container>

    </footer>

  );

}

// Exporting Footer component to be used in App.js
export default Footer;