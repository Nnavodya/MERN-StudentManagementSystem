// ===================================================
// AllStudents.js
// This component fetches all students from the backend
// and displays them in a table with a dashboard section.
// Features: search, delete, edit, dashboard stats cards
// ===================================================

import React, { useState, useEffect } from 'react';

// Importing Bootstrap components for layout and UI
import { Container, Table, Button, Alert, Form, Row, Col } from 'react-bootstrap';

// axios is used to make HTTP requests to the backend API
import axios from 'axios';

// ===== Added Toastify Imports =====
// Used for professional popup notifications

import { ToastContainer, toast } from 'react-toastify';

// Toastify CSS for notification styling
import 'react-toastify/dist/ReactToastify.css';

// useNavigate is used to redirect to other pages (update page)
import { useNavigate } from 'react-router-dom';

// AllStudents component - displays all students from the database in a table
function AllStudents() {

  // ===== State Declarations =====

  // state to hold the full list of students fetched from the database
  const [students, setStudents] = useState([]);

  // state to show error message if fetching students fails
  const [error, setError] = useState('');

  // state to show loading indicator while data is being fetched
  const [loading, setLoading] = useState(true);

  // state to store the search keyword entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // ===== Dashboard Statistics States =====
  // These states store student counts to display on dashboard cards

  // total number of students in the database
  const [totalStudents, setTotalStudents] = useState(0);

  // number of male students
  const [maleStudents, setMaleStudents] = useState(0);

  // number of female students
  const [femaleStudents, setFemaleStudents] = useState(0);

  // useNavigate hook - used to redirect to update page when Edit is clicked
  const navigate = useNavigate();

  // ===== useEffect =====
  // Runs once when the component first mounts
  // Calls fetchStudents to load data from backend

  useEffect(() => {
    fetchStudents();
  }, []);

  // ===== fetchStudents Function =====
  // Sends GET request to backend to fetch all students
  // Updates students list and dashboard statistics on success
  // Fixed API URL — added /api prefix to match backend route

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students/')
      .then((res) => {

        // store all students in state
        setStudents(res.data);

        // ===== Dashboard Statistics Calculations =====
        // Calculate and set total, male, and female student counts

        // total count is the length of the full students array
        setTotalStudents(res.data.length);

        // filter students whose gender is 'Male' and count them
        const maleCount = res.data.filter(
          (student) => student.gender === 'Male'
        ).length;

        // filter students whose gender is 'Female' and count them
        const femaleCount = res.data.filter(
          (student) => student.gender === 'Female'
        ).length;

        // update male and female counts in state
        setMaleStudents(maleCount);
        setFemaleStudents(femaleCount);

        // stop loading spinner after data is fetched
        setLoading(false);
      })
      .catch((err) => {
        // show error message if request fails
        setError('Error fetching students!');
        setLoading(false);
        console.log(err);
      });
  };

  // ===== deleteStudent Function =====
  // Sends DELETE request to backend to remove a student by MongoDB _id
  // After deletion, updates students list and recalculates dashboard stats
  // Fixed API URL — added /api prefix to match backend route

  const deleteStudent = (id) => {

    // show confirmation popup before proceeding with delete
    if (window.confirm('Are you sure you want to delete this student?')) {

      axios.delete(`http://localhost:5000/api/students/delete/${id}`)
        .then(() => {
          alert('Student deleted successfully! ✅');

          // remove the deleted student from state without refetching all data
          const updatedStudents = students.filter(student => student._id !== id);
          setStudents(updatedStudents);

          // ===== Recalculate Dashboard Statistics After Delete =====
          // Update counts based on the updated students list

          // update total count after deletion
          setTotalStudents(updatedStudents.length);

          // recount male students from updated list
          const maleCount = updatedStudents.filter(
            (student) => student.gender === 'Male'
          ).length;

          // recount female students from updated list
          const femaleCount = updatedStudents.filter(
            (student) => student.gender === 'Female'
          ).length;

          // update male and female counts in state
          setMaleStudents(maleCount);
          setFemaleStudents(femaleCount);
        })
        .catch((err) => {
          // show error if delete request fails
          alert('Error deleting student! ❌');
          console.log(err);
        });
    }
  };

  // ===== filteredStudents =====
  // Filters the students array based on the search term
  // Matches against name, email, or gender fields (case-insensitive)

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== JSX Return =====
  // Renders the dashboard stats, search bar, and students table

  return (
    <Container className="mt-5">

      {/* ===== Dashboard Section Title ===== */}
      {/* Heading displayed above the statistics cards */}

      <h2
        style={{
          fontWeight: 'bold',
          marginBottom: '25px',
          color: '#1a1a2e'
        }}
      >
        📊 Student Dashboard
      </h2>

      {/* ===== Dashboard Statistics Cards ===== */}
      {/* Three cards showing total, male, and female student counts */}
      {/* Each card has a hover animation using onMouseEnter/onMouseLeave */}

      <Row className="mb-4">

        {/* Total Students Card - purple gradient */}

        <Col md={4} className="mb-3">
          <div
            style={{
              background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
              borderRadius: '15px',
              padding: '25px',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: '0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            <h5>📚 Total Students</h5>
            {/* Display total student count from state */}
            <h2 style={{ fontWeight: 'bold' }}>{totalStudents}</h2>
          </div>
        </Col>

        {/* Male Students Card - green gradient */}

        <Col md={4} className="mb-3">
          <div
            style={{
              background: 'linear-gradient(135deg, #11998e, #38ef7d)',
              borderRadius: '15px',
              padding: '25px',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: '0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            <h5>👨 Male Students</h5>
            {/* Display male student count from state */}
            <h2 style={{ fontWeight: 'bold' }}>{maleStudents}</h2>
          </div>
        </Col>

        {/* Female Students Card - pink/blue gradient */}

        <Col md={4} className="mb-3">
          <div
            style={{
              background: 'linear-gradient(135deg, #fc466b, #3f5efb)',
              borderRadius: '15px',
              padding: '25px',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: '0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            <h5>👩 Female Students</h5>
            {/* Display female student count from state */}
            <h2 style={{ fontWeight: 'bold' }}>{femaleStudents}</h2>
          </div>
        </Col>

      </Row>

      {/* ===== Section Title and Add Button Row ===== */}
      {/* Title on left, Add New Student button on right */}

      <Row className="mb-4 align-items-center">
        <Col>
          <h2 style={{ color: '#1a1a2e' }}>👨‍🎓 All Students</h2>
        </Col>
        <Col className="text-end">
          {/* Navigate to /add-student page when clicked */}
          <Button
            onClick={() => navigate('/add-student')}
            style={{ backgroundColor: '#1a1a2e', border: 'none' }}>
            ➕ Add New Student
          </Button>
        </Col>
      </Row>

      {/* ===== Search Bar ===== */}
      {/* Filters the student table in real-time as user types */}

      <Row className="mb-3">
        <Col md={4}>
          {/* Search input — triggers filter on every keystroke via onChange */}
          <Form.Control
            type="text"
            placeholder="🔍 Search by name, email or gender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          {/* Show how many students match the current search */}
          <p className="mt-2 text-muted">
            Showing: <strong>{filteredStudents.length}</strong> student(s)
          </p>
        </Col>
      </Row>

      {/* ===== Error Alert ===== */}
      {/* Shows only if fetching students from backend fails */}

      {error && <Alert variant="danger">{error}</Alert>}

      {/* ===== Loading Indicator or Students Table ===== */}
      {/* Shows loading text while data is being fetched */}
      {/* Renders the table once loading is complete */}

      {loading ? (

        // loading indicator shown while API request is in progress
        <p>⏳ Loading students...</p>

      ) : (

        // ===== Modern Students Table =====
        // Added shadow, rounded corners and cleaner UI
        // Note: JSX comments inside ternary must be inside a tag, not as standalone

        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}
        >

          <Table striped bordered hover responsive>

            {/* Table Header Row */}
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

            {/* Table Body — renders filtered student rows */}
            <tbody>
              {filteredStudents.length === 0 ? (

                // show empty state UI if no students match the search
                <tr>
                  <td colSpan="6" className="text-center">

                    {/* ===== Empty State UI ===== */}
                    {/* Displays when no students match search results */}

                    <div style={{ padding: '30px' }}>

                      {/* Empty state icon */}
                      <h1 style={{ fontSize: '60px' }}>📭</h1>

                      {/* Empty state title */}
                      <h4 style={{ color: '#1a1a2e' }}>No Students Found</h4>

                      {/* Empty state description */}
                      <p style={{ color: '#777' }}>
                        Try changing the search keyword or add a new student.
                      </p>

                    </div>

                  </td>
                </tr>

              ) : (

                // map over filtered students and render a row for each
                filteredStudents.map((student, index) => (
                  <tr
  key={student._id}

  // ===== Row Hover Animation =====
  // Slightly lifts row for modern UI feel

  style={{
    transition: '0.2s'
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.01)';
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
  }}
>

                    {/* Row number — starts from 1 */}

                    <td>{index + 1}</td>

                    {/* Student details from database */}
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.gender}</td>

                    {/* Action buttons for each student row */}
                    <td>

                      {/* Edit button — navigates to update page with student _id in URL */}
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/update-student/${student._id}`)}>
                        ✏️ Edit
                      </Button>

                      {/* Delete button — calls deleteStudent with this student's _id */}
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
  );
}

// Exporting AllStudents so it can be used in App.js as a route component
export default AllStudents;