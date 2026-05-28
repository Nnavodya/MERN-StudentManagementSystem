// Login.js — Admin login page

import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Save token and username to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);

      toast.success('Login successful! ✅');

      // Redirect to home after short delay
      setTimeout(() => navigate('/'), 1000);

    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Try again!';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingTop: '80px' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={5}>
              <div style={{
                backgroundColor: '#1a1a2e',
                borderRadius: '15px',
                padding: '40px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
              }}>

                <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '10px' }}>
                  🔐 Admin Login
                </h2>
                <p style={{ color: '#a0aec0', textAlign: 'center', marginBottom: '30px' }}>
                  Sign in to manage students
                </p>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ccc' }}>📧 Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#ccc' }}>🔑 Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100"
                    disabled={loading}
                    style={{
                      backgroundColor: '#4e54c8',
                      border: 'none',
                      padding: '12px',
                      fontWeight: 'bold',
                      marginBottom: '15px'
                    }}
                  >
                    {loading ? (
                      <><Spinner as="span" animation="border" size="sm" /> Logging in...</>
                    ) : '🔐 Login'}
                  </Button>

                  {/* Link to Register page */}
                  <p style={{ color: '#a0aec0', textAlign: 'center', marginTop: '10px' }}>
                    Don't have an account?{' '}
                    <span
                      style={{ color: '#4e54c8', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => navigate('/register')}
                    >
                      Register here
                    </span>
                  </p>

                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;