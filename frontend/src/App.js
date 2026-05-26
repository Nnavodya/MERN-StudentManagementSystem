//When using import counterClass from './components/counterClass' ,don't put counterClass.js because it will automatically look for the file with the name counterClass.js in the components folder. If we put counterClass.js it will give an error because it will look for a file with the name counterClass.js.js which does not exist. So we need to import it without the .js extension.
import './App.css';
import counterClass from './components/counterClass';

function App() {
  return (
    <div className="App">
      <h1>Student Management System</h1>
      <counterClass />
    </div>
  );
}

export default App;
