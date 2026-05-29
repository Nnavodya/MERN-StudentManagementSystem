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
  const [recentActivity, setRecentActivity] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    const interval = setInterval(() => fetchStudents(), 30000);
    return () => clearInterval(interval);
  }, []);

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

  const pieData = [
    { name: 'Male', value: maleStudents },
    { name: 'Female', value: femaleStudents }
  ];
  const PIE_COLORS = ['#4F46E5', '#ec4899'];
  const barData = buildMonthlyData(students);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Container className="mt-5 page-fade">

        <h2 style={{ fontWeight: '700', marginBottom: '25px', color: '#0d1b2a', letterSpacing: '-0.5px' }}>
          📊 Student Dashboard
        </h2>

        {/* Stat cards */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <div className="card-hover" style={{
              background: 'linear-gradient(135deg, #4F46E5, #818cf8)',
              borderRadius: '16px', padding: '28px', color: '#fff',
              boxShadow: '0 4px 15px rgba(79,70,229,0.3)', cursor: 'pointer'
            }} onClick={() => navigate('/students')}>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.85, fontWeight: '500' }}>📚 Total Students</p>
              <div className="stat-number">{totalStudents}</div>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div className="card-hover" style={{
              background: 'linear-gradient(135deg, #06B6D4, #22d3ee)',
              borderRadius: '16px', padding: '28px', color: '#fff',
              boxShadow: '0 4px 15px rgba(6,182,212,0.3)', cursor: 'pointer'
            }} onClick={() => navigate('/students')}>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.85, fontWeight: '500' }}>👨 Male Students</p>
              <div className="stat-number">{maleStudents}</div>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <div className="card-hover" style={{
              background: 'linear-gradient(135deg, #ec4899, #f472b6)',
              borderRadius: '16px', padding: '28px', color: '#fff',
              boxShadow: '0 4px 15px rgba(236,72,153,0.3)', cursor: 'pointer'
            }} onClick={() => navigate('/students')}>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.85, fontWeight: '500' }}>👩 Female Students</p>
              <div className="stat-number">{femaleStudents}</div>
            </div>
          </Col>
        </Row>

        {/* Charts Row */}
        <Row className="mb-4">
          <Col md={5} className="mb-4">
            <div className="section-card">
              <h6 style={{ color: '#0d1b2a', marginBottom: '20px', fontWeight: '600' }}>
                🥧 Gender Distribution
              </h6>
              {totalStudents === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', paddingTop: '40px' }}>No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
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

          <Col md={7} className="mb-4">
            <div className="section-card">
              <h6 style={{ color: '#0d1b2a', marginBottom: '20px', fontWeight: '600' }}>
                📈 Monthly Registrations
              </h6>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Poppins' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fontFamily: 'Poppins' }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>

        {/* Recent Activity Feed */}
        <div className="section-card mb-4">
          <h6 style={{ color: '#0d1b2a', marginBottom: '20px', fontWeight: '600' }}>
            🏆 Recent Activity
          </h6>
          {recentActivity.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>No recent activity found.</p>
          ) : (
            recentActivity.map((activity, index) => (
              <div key={index} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 15px', marginBottom: '10px', borderRadius: '10px',
                backgroundColor: '#f8fafc',
                borderLeft: `4px solid ${activity.gender.toLowerCase() === 'male' ? '#4F46E5' : '#ec4899'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '22px' }}>
                    {activity.gender.toLowerCase() === 'male' ? '👨' : '👩'}
                  </span>
                  <span style={{ color: '#1e293b', fontWeight: '500', fontSize: '14px' }}>
                    {activity.message}
                  </span>
                </div>
                <span style={{
                  color: '#64748b', fontSize: '12px',
                  backgroundColor: '#e0e7ff', padding: '4px 10px', borderRadius: '20px', fontWeight: '500'
                }}>
                  {activity.time}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Section title and Add button */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h4 style={{ color: '#0d1b2a', fontWeight: '700' }}>👨‍🎓 All Students</h4>
          </Col>
          <Col className="text-end">
            <Button onClick={() => navigate('/add-student')}
              style={{ backgroundColor: '#4F46E5', border: 'none', padding: '10px 20px', fontWeight: '600' }}>
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
              className="search-input"
              style={{ borderRadius: '10px', padding: '10px 15px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
            />
          </Col>
          <Col>
            <p className="mt-2" style={{ color: '#64748b', fontSize: '14px' }}>
              Showing: <strong style={{ color: '#4F46E5' }}>{filteredStudents.length}</strong> student(s)
            </p>
          </Col>
        </Row>

        {error && <Alert variant="danger" style={{ borderRadius: '10px' }}>{error}</Alert>}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div className="spinner-border" style={{ color: '#4F46E5' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p style={{ color: '#64748b', marginTop: '15px', fontSize: '14px' }}>Loading students...</p>
          </div>
        ) : (
          <div className="section-card table-modern" style={{ padding: '0', overflow: 'hidden' }}>
            <Table className="table-modern mb-0" responsive>
              <thead>
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
                      <div style={{ padding: '40px' }}>
                        <div style={{ fontSize: '60px', marginBottom: '10px' }}>📭</div>
                        <h5 style={{ color: '#0d1b2a', fontWeight: '600' }}>No Students Found</h5>
                        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                          Try changing the search keyword or add a new student.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr key={student._id}>
                      <td style={{ color: '#64748b', fontWeight: '500' }}>{index + 1}</td>
                      <td style={{ fontWeight: '600', color: '#0d1b2a' }}>{student.name}</td>
                      <td style={{ color: '#64748b', fontSize: '13px' }}>{student.email}</td>
                      <td style={{ fontWeight: '500' }}>{student.age}</td>
                      <td>
                        <span className={student.gender.toLowerCase() === 'male' ? 'badge-male' : 'badge-female'}>
                          {student.gender}
                        </span>
                      </td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2"
                          style={{ borderRadius: '8px', fontWeight: '600', fontSize: '12px' }}
                          onClick={() => navigate(`/update-student/${student._id}`)}>
                          ✏️ Edit
                        </Button>
                        <Button variant="danger" size="sm"
                          style={{ borderRadius: '8px', fontWeight: '600', fontSize: '12px' }}
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