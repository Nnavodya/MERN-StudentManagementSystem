// Home.js — Welcome landing page for Student Management System

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();

  // Quick stats state
  const [totalStudents, setTotalStudents] = useState(0);
  const [maleStudents, setMaleStudents] = useState(0);
  const [femaleStudents, setFemaleStudents] = useState(0);

  // Fetch student counts for quick stats
  useEffect(() => {
    axios.get('http://localhost:5000/api/students/')
      .then((res) => {
        setTotalStudents(res.data.length);
        setMaleStudents(res.data.filter((s) => s.gender.toLowerCase() === 'male').length);
        setFemaleStudents(res.data.filter((s) => s.gender.toLowerCase() === 'female').length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingTop: '60px' }}>
      <Container>

        {/* Welcome Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          borderRadius: '20px',
          padding: '60px 40px',
          color: '#fff',
          textAlign: 'center',
          marginBottom: '40px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
        }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px' }}>
            🎓 Student Management System
          </h1>
          <p style={{ fontSize: '18px', color: '#a0aec0', marginBottom: '30px' }}>
            Manage your students easily — add, view, edit, and delete student records.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <Button
              onClick={() => navigate('/students')}
              style={{ backgroundColor: '#4e54c8', border: 'none', padding: '12px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}
            >
              👨‍🎓 View All Students
            </Button>
            <Button
              onClick={() => navigate('/add-student')}
              style={{ backgroundColor: '#11998e', border: 'none', padding: '12px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}
            >
              ➕ Add New Student
            </Button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <Row className="mb-4">

          <Col md={4} className="mb-3">
            <div style={{
              background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
              borderRadius: '15px', padding: '25px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)', textAlign: 'center',
              transition: '0.3s', cursor: 'pointer'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
              onClick={() => navigate('/students')}
            >
              <h2 style={{ fontSize: '40px', fontWeight: 'bold' }}>{totalStudents}</h2>
              <h5>📚 Total Students</h5>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div style={{
              background: 'linear-gradient(135deg, #11998e, #38ef7d)',
              borderRadius: '15px', padding: '25px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)', textAlign: 'center',
              transition: '0.3s', cursor: 'pointer'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
              onClick={() => navigate('/students')}
            >
              <h2 style={{ fontSize: '40px', fontWeight: 'bold' }}>{maleStudents}</h2>
              <h5>👨 Male Students</h5>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div style={{
              background: 'linear-gradient(135deg, #fc466b, #3f5efb)',
              borderRadius: '15px', padding: '25px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)', textAlign: 'center',
              transition: '0.3s', cursor: 'pointer'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
              onClick={() => navigate('/students')}
            >
              <h2 style={{ fontSize: '40px', fontWeight: 'bold' }}>{femaleStudents}</h2>
              <h5>👩 Female Students</h5>
            </div>
          </Col>

        </Row>

        {/* Feature Cards */}
        <Row>

          <Col md={4} className="mb-4">
            <div style={{
              background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
              borderRadius: '15px', padding: '30px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)', transition: '0.3s',
              cursor: 'pointer', height: '100%'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
              onClick={() => navigate('/students')}
            >
              <h2 style={{ fontSize: '40px' }}>📋</h2>
              <h5 style={{ fontWeight: 'bold' }}>View Students</h5>
              <p style={{ color: '#dde' }}>Browse all registered students with search and filter options.</p>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <div style={{
              background: 'linear-gradient(135deg, #11998e, #38ef7d)',
              borderRadius: '15px', padding: '30px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)', transition: '0.3s',
              cursor: 'pointer', height: '100%'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
              onClick={() => navigate('/add-student')}
            >
              <h2 style={{ fontSize: '40px' }}>➕</h2>
              <h5 style={{ fontWeight: 'bold' }}>Add Student</h5>
              <p style={{ color: '#dfe' }}>Register a new student with name, email, age and gender.</p>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <div style={{
              background: 'linear-gradient(135deg, #fc466b, #3f5efb)',
              borderRadius: '15px', padding: '30px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)', transition: '0.3s',
              cursor: 'pointer', height: '100%'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
              onClick={() => navigate('/students')}
            >
              <h2 style={{ fontSize: '40px' }}>✏️</h2>
              <h5 style={{ fontWeight: 'bold' }}>Edit & Delete</h5>
              <p style={{ color: '#edf' }}>Update or remove student records quickly and easily.</p>
            </div>
          </Col>

        </Row>

      </Container>
    </div>
  );
}

export default Home;