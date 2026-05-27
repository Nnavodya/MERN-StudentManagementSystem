//When using import counterClass from './components/counterClass' ,don't put counterClass.js because it will automatically look for the file with the name counterClass.js in the components folder. If we put counterClass.js it will give an error because it will look for a file with the name counterClass.js.js which does not exist. So we need to import it without the .js extension.
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // importing React Router for navigation between pages
import Header from './components/Header'; //importing Header component from the components folder. We can use this component in our App component to display the header of our application. This will allow us to reuse the header component in different parts of our application without having to write the same code again. We can simply import the Header component and use it wherever we want to display the header in our application.
import AddStudent from './components/AddStudent'; // importing AddStudent component to use in the route for adding a new student
import AllStudents from './components/AllStudents'; // importing AllStudents component to display all students list
import UpdateStudent from './components/UpdateStudent'; // importing UpdateStudent component to use in the route for updating a student
import 'bootstrap/dist/css/bootstrap.min.css'; //importing bootstrap css file to use bootstrap classes in our components. This will allow us to use bootstrap classes in our components to style them easily without writing custom CSS. We can use bootstrap classes like btn, btn-primary, container, row, col, etc. in our components to style them according to our needs. This will save us time and effort in writing custom CSS for styling our components.

function App() {
  return (
    // Router wraps the entire app to enable navigation between pages
    <Router>
      <div>
        {/* Header is outside Routes so it appears on every page */}
        <Header />

        {/* Routes define which component to show for each URL path */}
        <Routes>
          {/* Home page - shows all students by default */}
          <Route path="/" element={<AllStudents />} />

          {/* Route for viewing all students */}
          <Route path="/students" element={<AllStudents />} />

          {/* Route for adding a new student */}
          <Route path="/add-student" element={<AddStudent />} />

          {/* Route for updating a student - :id is the MongoDB id passed in the URL */}
          <Route path="/update-student/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; // exporting App component as the default export of this module so it can be imported and used in other parts of the application, such as index.js where it is rendered to the DOM.