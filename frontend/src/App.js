//When using import counterClass from './components/counterClass' ,don't put counterClass.js because it will automatically look for the file with the name counterClass.js in the components folder. If we put counterClass.js it will give an error because it will look for a file with the name counterClass.js.js which does not exist. So we need to import it without the .js extension.
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // importing React Router for navigation between pages
import Header from './components/Header'; //importing Header component from the components folder. We can use this component in our App component to display the header of our application. This will allow us to reuse the header component in different parts of our application without having to write the same code again. We can simply import the Header component and use it wherever we want to display the header in our application.
//although our counterClass name is like that ,when we impoert it we should use in as CounterClass and we should add component name as <CounterClass>
//because in the counterClass.js file we are exporting it as CounterClass and we should use the same name when we import it in the App.js file. If we use a different name it will give an error because it will not find the component with that name. So we should use the same name as we exported in the counterClass.js file when we import it in the App.js file.
import AllStudents from './components/AllStudents';
import CounterClass from './components/counterClass';
import CounterFunction from './components/CounterFunction';
import AddStudent from './components/AddStudent'; // importing AddStudent component to use in the route for adding a new student
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

          <AddStudent /> {/* This will render the AddStudent component on the home page ("/") */}

          {/* Route for viewing all students — navigating to /students will show the AllStudents component */}
          <Route path="/students" element={<AllStudents />} />

          {/* Route for adding a new student — navigating to /add-student will show the AddStudent form */}
          <Route path="/add-student" element={<AddStudent />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;