// AllStudents.js — Dashboard with improved table, pagination and sorting

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
import { FaUsers, FaMale, FaFemale, FaEdit, FaTrash, FaPlus, FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdDashboard, MdBarChart, MdPieChart, MdHistory } from 'react-icons/md';

function AllStudents() {

  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalStudents, setTotalStudents] = useState(0);
  const [maleStudents, setMaleStudents] = useState(0);
  const [femaleStudents, setFemaleStudents] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Sorting state
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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
          // Reset to page 1 after delete
          setCurrentPage(1);
        })
        .catch((err) => {
          toast.error('Error deleting student! ❌');
          console.log(err);
        });
    }
  };

  // Handle column sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Get sort icon for column
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort size={11} style={{ opacity: 0.4, marginLeft: '4px' }} />;
    return sortOrder === 'asc'
      ? <FaSortUp size={11} style={{ color: '#4F46E5', marginLeft: '4px' }} />
      : <FaSortDown size={11} style={{ color: '#4F46E5', marginLeft: '4px' }} />;
  };

  // Filter students
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortField) return 0;
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  const indexOfFirst = (currentPage - 1) * studentsPerPage;
  const indexOfLast = indexOfFirst + studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirst, indexOfLast);

  const pieData = [
    { name: 'Male', value: maleStudents },
    { name: 'Female', value: femaleStudents }
  ];
  const PIE_COLORS = ['#4F46E5', '#ec4899'];
  const barData = buildMonthlyData(students);

  const statCards = [
    {
      icon: <FaUsers size={32} />,
      label: 'Total Students',
      value: totalStudents,
      gradient: 'linear-gradient(135deg, #4F46E5, #818cf8)',
      shadow: 'rgba(79,70,229,0.35)',
      trend: '👥 All registered'
    },
    {
      icon: <FaMale size={32} />,
      label: 'Male Students',
      value: maleStudents,
      gradient: 'linear-gradient(135deg, #06B6D4, #22d3ee)',
      shadow: 'rgba(6,182,212,0.35)',
      trend: `${totalStudents > 0 ? ((maleStudents / totalStudents) * 100).toFixed(0) : 0}% of total`
    },
    {
      icon: <FaFemale size={32} />,
      label: 'Female Students',
      value: femaleStudents,
      gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
      shadow: 'rgba(236,72,153,0.35)',
      trend: `${totalStudents > 0 ? ((femaleStudents / totalStudents) * 100).toFixed(0) : 0}% of total`
    }
  ];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Container className="mt-5 page-fade">

        {/* Dashboard Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #4F46E5, #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(79,70,229,0.3)'
          }}>
            <MdDashboard size={22} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontWeight: '700', color: '#0d1b2a', margin: 0, letterSpacing: '-0.3px' }}>
              Student Dashboard
            </h4>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
              Manage and monitor student records
            </p>
          </div>
        </div>

        {/* Stat Cards */}
        <Row className="mb-4">
          {statCards.map((card, index) => (
            <Col md={4} className="mb-3" key={index}>
              <div className="card-hover" style={{
                background: card.gradient, borderRadius: '18px',
                padding: '24px', color: '#fff',
                boxShadow: `0 8px 24px ${card.shadow}`,
                cursor: 'pointer', position: 'relative', overflow: 'hidden'
              }} onClick={() => navigate('/students')}>
                <div style={{
                  position: 'absolute', top: '-20px', right: '-20px',
                  width: '100px', height: '100px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }} />
                <div style={{
                  position: 'absolute', bottom: '-30px', right: '30px',
                  width: '70px', height: '70px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.08)'
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {card.icon}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '42px', fontWeight: '700', lineHeight: '1' }}>{card.value}</div>
                  </div>
                </div>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '15px', opacity: 0.95 }}>{card.label}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.75 }}>{card.trend}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Charts */}
        <Row className="mb-4">
          <Col md={5} className="mb-4">
            <div className="section-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <MdPieChart size={20} color="#4F46E5" />
                <h6 style={{ color: '#0d1b2a', margin: 0, fontWeight: '600' }}>Gender Distribution</h6>
              </div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <MdBarChart size={20} color="#4F46E5" />
                <h6 style={{ color: '#0d1b2a', margin: 0, fontWeight: '600' }}>Monthly Registrations</h6>
              </div>
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

        {/* Recent Activity */}
        <div className="section-card mb-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <MdHistory size={20} color="#4F46E5" />
            <h6 style={{ color: '#0d1b2a', margin: 0, fontWeight: '600' }}>Recent Activity</h6>
          </div>
          {recentActivity.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No recent activity found.</p>
          ) : (
            recentActivity.map((activity, index) => (
              <div key={index} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 15px', marginBottom: '10px', borderRadius: '10px',
                backgroundColor: '#f8fafc',
                borderLeft: `4px solid ${activity.gender.toLowerCase() === 'male' ? '#4F46E5' : '#ec4899'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {activity.gender.toLowerCase() === 'male'
                    ? <FaMale size={20} color="#4F46E5" />
                    : <FaFemale size={20} color="#ec4899" />
                  }
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

        {/* Table header row */}
        <Row className="mb-4 align-items-center">
          <Col>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaUsers size={20} color="#4F46E5" />
              <h5 style={{ color: '#0d1b2a', fontWeight: '700', margin: 0 }}>All Students</h5>
            </div>
          </Col>
          <Col className="text-end">
            <Button onClick={() => navigate('/add-student')}
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #818cf8)',
                border: 'none', padding: '10px 20px', fontWeight: '600',
                borderRadius: '10px', boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}>
              <FaPlus size={13} /> Add New Student
            </Button>
          </Col>
        </Row>

        {/* Search bar */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by name, email or gender..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="search-input"
              style={{ borderRadius: '10px', padding: '10px 15px', border: '1.5px solid #e2e8f0', fontSize: '14px' }}
            />
          </Col>
          <Col>
            <p className="mt-2" style={{ color: '#64748b', fontSize: '14px' }}>
              Showing: <strong style={{ color: '#4F46E5' }}>{filteredStudents.length}</strong> student(s)
              {totalPages > 1 && (
                <span style={{ marginLeft: '8px', color: '#94a3b8' }}>
                  — Page {currentPage} of {totalPages}
                </span>
              )}
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
          <div className="section-card" style={{ padding: '0', overflow: 'hidden' }}>
            <Table className="table-modern mb-0" responsive>
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>

                  {/* Sortable Name column */}
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('name')}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Name {getSortIcon('name')}
                    </span>
                  </th>

                  {/* Sortable Email column */}
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('email')}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Email {getSortIcon('email')}
                    </span>
                  </th>

                  {/* Sortable Age column */}
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('age')}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Age {getSortIcon('age')}
                    </span>
                  </th>

                  {/* Sortable Gender column */}
                  <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('gender')}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Gender {getSortIcon('gender')}
                    </span>
                  </th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.length === 0 ? (
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
                  currentStudents.map((student, index) => (
                    <tr key={student._id}>
                      <td style={{ color: '#64748b', fontWeight: '500' }}>
                        {indexOfFirst + index + 1}
                      </td>
                      <td style={{ fontWeight: '600', color: '#0d1b2a' }}>{student.name}</td>
                      <td style={{ color: '#64748b', fontSize: '13px' }}>{student.email}</td>
                      <td style={{ fontWeight: '500' }}>{student.age}</td>
                      <td>
                        <span className={student.gender.toLowerCase() === 'male' ? 'badge-male' : 'badge-female'}>
                          {student.gender.toLowerCase() === 'male'
                            ? <><FaMale size={11} /> {student.gender}</>
                            : <><FaFemale size={11} /> {student.gender}</>
                          }
                        </span>
                      </td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2"
                          style={{ borderRadius: '8px', fontWeight: '600', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => navigate(`/update-student/${student._id}`)}>
                          <FaEdit size={11} /> Edit
                        </Button>
                        <Button variant="danger" size="sm"
                          style={{ borderRadius: '8px', fontWeight: '600', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => deleteStudent(student._id)}>
                          <FaTrash size={11} /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 20px', borderTop: '1px solid #f1f5f9',
                backgroundColor: '#fafbff'
              }}>
                {/* Page info */}
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  Showing <strong style={{ color: '#4F46E5' }}>{indexOfFirst + 1}</strong> to{' '}
                  <strong style={{ color: '#4F46E5' }}>{Math.min(indexOfLast, sortedStudents.length)}</strong> of{' '}
                  <strong style={{ color: '#4F46E5' }}>{sortedStudents.length}</strong> students
                </p>

                {/* Page buttons */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>

                  {/* Previous button */}
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      padding: '6px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0',
                      backgroundColor: currentPage === 1 ? '#f8fafc' : '#fff',
                      color: currentPage === 1 ? '#94a3b8' : '#4F46E5',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '13px', fontWeight: '500', transition: '0.2s'
                    }}
                  >
                    <FaChevronLeft size={11} /> Prev
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      style={{
                        width: '34px', height: '34px', borderRadius: '8px',
                        border: '1.5px solid',
                        borderColor: currentPage === page ? '#4F46E5' : '#e2e8f0',
                        backgroundColor: currentPage === page ? '#4F46E5' : '#fff',
                        color: currentPage === page ? '#fff' : '#64748b',
                        cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                        transition: '0.2s'
                      }}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next button */}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '6px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0',
                      backgroundColor: currentPage === totalPages ? '#f8fafc' : '#fff',
                      color: currentPage === totalPages ? '#94a3b8' : '#4F46E5',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '13px', fontWeight: '500', transition: '0.2s'
                    }}
                  >
                    Next <FaChevronRight size={11} />
                  </button>

                </div>
              </div>
            )}

          </div>
        )}

      </Container>
    </>
  );
}

export default AllStudents;