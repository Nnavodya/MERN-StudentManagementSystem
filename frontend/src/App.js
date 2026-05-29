// App.js — Main app with protected routes using PrivateRoute

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import AllStudents from './components/AllStudents';
import UpdateStudent from './components/UpdateStudent';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>

          {/* Public routes — accessible without login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes — redirect to /login if not authenticated */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/students" element={<PrivateRoute><AllStudents /></PrivateRoute>} />
          <Route path="/add-student" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
          <Route path="/update-student/:id" element={<PrivateRoute><UpdateStudent /></PrivateRoute>} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;