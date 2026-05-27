import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import AllStudents from './components/AllStudents';
import UpdateStudent from './components/UpdateStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        {/* Header appears on every page */}
        <Header />

        <Routes>
          {/* Home page - welcome landing page */}
          <Route path="/" element={<Home />} />

          {/* Students page - shows all students table */}
          <Route path="/students" element={<AllStudents />} />

          {/* Add new student */}
          <Route path="/add-student" element={<AddStudent />} />

          {/* Update student - :id is MongoDB document id */}
          <Route path="/update-student/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;