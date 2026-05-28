// Register.js — Admin register page

import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match! ❌');
      toast.error('Passwords do not match! ❌');
      return;
    }

    // Password length check
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters! ❌');
      toast.error('Password must be at least 6 characters! ❌');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      toast.success('Registered successfully! Please login ✅');
      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed. Try again!';
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
                  📝 Admin Register
                </h2>
                <p style={{ color: '#a0aec0', textAlign: 'center', marginBottom: '30px' }}>
                  Create your admin account
                </p>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ccc' }}>👤 Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ccc' }}>📧 Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#ccc' }}>🔑 Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Min 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ backgroundColor: '#16213e', border: '1px solid #0f3460', color: '#fff' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#ccc' }}>🔑 Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
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
                      backgroundColor: '#11998e',
                      border: 'none',
                      padding: '12px',
                      fontWeight: 'bold',
                      marginBottom: '15px'
                    }}
                  >
                    {loading ? (
                      <><Spinner as="span" animation="border" size="sm" /> Registering...</>
                    ) : '📝 Register'}
                  </Button>

                  <p style={{ color: '#a0aec0', textAlign: 'center', marginTop: '10px' }}>
                    Already have an account?{' '}
                    <span
                      style={{ color: '#4e54c8', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => navigate('/login')}
                    >
                      Login here
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

export default Register;