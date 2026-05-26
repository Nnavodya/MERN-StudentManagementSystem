import React , {useState} from "react";
import './App.css';
import CounterClass from './components/counterClass';

function CounterFunction() {

  let[number,setNumber] = useState(0); //useState is a React hook that allows us to add state to functional components. It returns an array with two elements: the current state value (number) and a function to update that state (setNumber). We initialize the state with 0, which means the counter will start at 0.
  return (
    <div>
      <h3>Functional Component</h3>
      <h1>Counter = {number}</h1>
      <button>Increment</button>

      </div>
  );
}