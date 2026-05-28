// AllStudents.js — Student dashboard with pie chart, bar chart, and recent activity feed

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

function AllStudents() {

  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalStudents, setTotalStudents] = useState(0);
  const [maleStudents, setMaleStudents] = useState(0);
  const [femaleStudents, setFemaleStudents] = useState(0);

  // Recent activity feed state
  const [recentActivity, setRecentActivity] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  // Build recent activity list from students (last 5 added)
  const buildRecentActivity = (data) => {
    const sorted = [...data]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((s) => ({
        id: s._id,
        message: `${s.name} was added`,
        time: new Date(s.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric'
        }),
        gender: s.gender
      }));
    setRecentActivity(sorted);
  };

  // Build monthly registrations data for bar chart
  const buildMonthlyData = (data) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const counts = Array(12).fill(0);
    data.forEach((s) => {
      const month = new Date(s.createdAt).getMonth();
      counts[month]++;
    });
    return months.map((month, i) => ({ month, count: counts[i] }));
  };

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students/')
      .then((res) => {
        setStudents(res.data);
        setTotalStudents(res.data.length);
        setMaleStudents(res.data.filter((s) => s.gender.toLowerCase() === 'male').length);
        setFemaleStudents(res.data.filter((s) => s.gender.toLowerCase() === 'female').length);
        buildRecentActivity(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching students!');
        toast.error('Failed to fetch students!');
        setLoading(false);
        console.log(err);
      });
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`http://localhost:5000/api/students/delete/${id}`)
        .then(() => {
          toast.success('Student deleted successfully! ✅');
          const updatedStudents = students.filter(student => student._id !== id);
          setStudents(updatedStudents);
          setTotalStudents(updatedStudents.length);
          setMaleStudents(updatedStudents.filter((s) => s.gender.toLowerCase() === 'male').length);
          setFemaleStudents(updatedStudents.filter((s) => s.gender.toLowerCase() === 'female').length);
          buildRecentActivity(updatedStudents);
        })
        .catch((err) => {
          toast.error('Error deleting student! ❌');
          console.log(err);
        });
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pie chart data
  const pieData = [
    { name: 'Male', value: maleStudents },
    { name: 'Female', value: femaleStudents }
  ];
  const PIE_COLORS = ['#4e54c8', '#fc466b'];

  // Bar chart data
  const barData = buildMonthlyData(students);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Container className="mt-5">

        <h2 style={{ fontWeight: 'bold', marginBottom: '25px', color: '#1a1a2e' }}>
          📊 Student Dashboard
        </h2>

        {/* Stat cards */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <div style={{
              background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
              borderRadius: '15px', padding: '25px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: '0.3s', cursor: 'pointer'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <h5>📚 Total Students</h5>
              <h2 style={{ fontWeight: 'bold' }}>{totalStudents}</h2>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div style={{
              background: 'linear-gradient(135deg, #11998e, #38ef7d)',
              borderRadius: '15px', padding: '25px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: '0.3s', cursor: 'pointer'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <h5>👨 Male Students</h5>
              <h2 style={{ fontWeight: 'bold' }}>{maleStudents}</h2>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div style={{
              background: 'linear-gradient(135deg, #fc466b, #3f5efb)',
              borderRadius: '15px', padding: '25px', color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: '0.3s', cursor: 'pointer'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <h5>👩 Female Students</h5>
              <h2 style={{ fontWeight: 'bold' }}>{femaleStudents}</h2>
            </div>
          </Col>
        </Row>

        {/* Charts Row */}
        <Row className="mb-4">

          {/* Pie Chart — Male vs Female */}
          <Col md={5} className="mb-4">
            <div style={{
              backgroundColor: '#fff', borderRadius: '15px', padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
              <h5 style={{ color: '#1a1a2e', marginBottom: '20px', fontWeight: 'bold' }}>
                🥧 Gender Distribution
              </h5>
              {totalStudents === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', paddingTop: '40px' }}>
                  No data available
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </Col>

          {/* Bar Chart — Monthly Registrations */}
          <Col md={7} className="mb-4">
            <div style={{
              backgroundColor: '#fff', borderRadius: '15px', padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
              <h5 style={{ color: '#1a1a2e', marginBottom: '20px', fontWeight: 'bold' }}>
                📈 Monthly Registrations
              </h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4e54c8" radius={[6, 6, 0, 0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>

        </Row>

        {/* Recent Activity Feed */}
        <Row className="mb-4">
          <Col>
            <div style={{
              backgroundColor: '#fff', borderRadius: '15px', padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
              <h5 style={{ color: '#1a1a2e', marginBottom: '20px', fontWeight: 'bold' }}>
                🏆 Recent Activity
              </h5>

              {recentActivity.length === 0 ? (
                <p style={{ color: '#999' }}>No recent activity found.</p>
              ) : (
                recentActivity.map((activity, index) => (
                  <div key={index} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 15px', marginBottom: '10px', borderRadius: '10px',
                    backgroundColor: '#f8f9ff',
                    borderLeft: `4px solid ${activity.gender.toLowerCase() === 'male' ? '#4e54c8' : '#fc466b'}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '22px' }}>
                        {activity.gender.toLowerCase() === 'male' ? '👨' : '👩'}
                      </span>
                      <span style={{ color: '#1a1a2e', fontWeight: '500' }}>
                        {activity.message}
                      </span>
                    </div>
                    <span style={{
                      color: '#999', fontSize: '13px',
                      backgroundColor: '#eef0ff', padding: '4px 10px', borderRadius: '20px'
                    }}>
                      {activity.time}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Col>
        </Row>

        {/* Section title and Add button */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 style={{ color: '#1a1a2e' }}>👨‍🎓 All Students</h2>
          </Col>
          <Col className="text-end">
            <Button
              onClick={() => navigate('/add-student')}
              style={{ backgroundColor: '#1a1a2e', border: 'none' }}>
              ➕ Add New Student
            </Button>
          </Col>
        </Row>

        {/* Search bar */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="🔍 Search by name, email or gender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col>
            <p className="mt-2 text-muted">
              Showing: <strong>{filteredStudents.length}</strong> student(s)
            </p>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <p>⏳ Loading students...</p>
        ) : (
          <div style={{
            backgroundColor: '#fff', padding: '20px',
            borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <Table striped bordered hover responsive>

              <thead style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div style={{ padding: '30px' }}>
                        <h1 style={{ fontSize: '60px' }}>📭</h1>
                        <h4 style={{ color: '#1a1a2e' }}>No Students Found</h4>
                        <p style={{ color: '#777' }}>
                          Try changing the search keyword or add a new student.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      style={{ transition: '0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.age}</td>
                      <td>{student.gender}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/update-student/${student._id}`)}>
                          ✏️ Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteStudent(student._id)}>
                          🗑️ Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </Table>
          </div>
        )}

      </Container>
    </>
  );
}

export default AllStudents;