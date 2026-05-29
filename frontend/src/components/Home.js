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

  // Recent students state
  const [recentStudents, setRecentStudents] = useState([]);

  // Fetch student data for stats and recent students
  useEffect(() => {
    axios.get('http://localhost:5000/api/students/')
      .then((res) => {
        setTotalStudents(res.data.length);
        setMaleStudents(res.data.filter((s) => s.gender.toLowerCase() === 'male').length);
        setFemaleStudents(res.data.filter((s) => s.gender.toLowerCase() === 'female').length);

        // Get last 3 added students sorted by createdAt
        const sorted = [...res.data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setRecentStudents(sorted);
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
        <Row className="mb-4">

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

        {/* Recent Students Preview */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h5 style={{ color: '#1a1a2e', fontWeight: 'bold', margin: 0 }}>
              🕐 Recently Added Students
            </h5>
            <Button
              onClick={() => navigate('/students')}
              style={{ backgroundColor: '#1a1a2e', border: 'none', fontSize: '14px', padding: '6px 16px', borderRadius: '8px' }}
            >
              View All →
            </Button>
          </div>

          {recentStudents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
              <h3>📭</h3>
              <p>No students added yet.</p>
              <Button
                onClick={() => navigate('/add-student')}
                style={{ backgroundColor: '#11998e', border: 'none', borderRadius: '8px' }}
              >
                ➕ Add First Student
              </Button>
            </div>
          ) : (
            recentStudents.map((student, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                marginBottom: '10px',
                borderRadius: '10px',
                backgroundColor: '#f8f9ff',
                borderLeft: `4px solid ${student.gender.toLowerCase() === 'male' ? '#4e54c8' : '#fc466b'}`,
                transition: '0.2s',
                cursor: 'pointer'
              }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eef0ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9ff'}
                onClick={() => navigate('/students')}
              >
                {/* Student avatar and name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '28px' }}>
                    {student.gender.toLowerCase() === 'male' ? '👨' : '👩'}
                  </span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#1a1a2e' }}>{student.name}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#999' }}>{student.email}</p>
                  </div>
                </div>

                {/* Age and gender badges */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    backgroundColor: '#eef0ff', color: '#4e54c8',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: '500'
                  }}>
                    Age: {student.age}
                  </span>
                  <span style={{
                    backgroundColor: student.gender.toLowerCase() === 'male' ? '#e8f5e9' : '#fce4ec',
                    color: student.gender.toLowerCase() === 'male' ? '#11998e' : '#fc466b',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: '500'
                  }}>
                    {student.gender}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </Container>
    </div>
  );
}

export default Home;