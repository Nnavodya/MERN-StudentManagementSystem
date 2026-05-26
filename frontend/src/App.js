//When using import counterClass from './components/counterClass' ,don't put counterClass.js because it will automatically look for the file with the name counterClass.js in the components folder. If we put counterClass.js it will give an error because it will look for a file with the name counterClass.js.js which does not exist. So we need to import it without the .js extension.
import './App.css';
//although our counterClass name is like that ,when we impoert it we should use in as CounterClass and we should add component name as <CounterClass>
//because in the counterClass.js file we are exporting it as CounterClass and we should use the same name when we import it in the App.js file. If we use a different name it will give an error because it will not find the component with that name. So we should use the same name as we exported in the counterClass.js file when we import it in the App.js file.
import CounterClass from './components/counterClass';
import CounterFunction from './components/CounterFunction';
import 'bootstrap/dist/css/bootstrap.min.css'; //importing bootstrap css file to use bootstrap classes in our components. This will allow us to use bootstrap classes in our components to style them easily without writing custom CSS. We can use bootstrap classes like btn, btn-primary, container, row, col, etc. in our components to style them according to our needs. This will save us time and effort in writing custom CSS for styling our components.

function App() {
  return (
    <div className="App">
      <h1>Student Management System</h1>
      <CounterClass />
      <CounterFunction />
    </div>
  );
}

export default App;
