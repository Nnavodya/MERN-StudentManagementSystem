import React , {useState} from "react";

function CounterFunction() {

  let[number,setNumber] = useState(0); //useState is a React hook that allows us to add state to functional components. It returns an array with two elements: the current state value (number) and a function to update that state (setNumber). We initialize the state with 0, which means the counter will start at 0.
  
  function increment() {
    setNumber(++number ); //setNumber is the function that we use to update the state. We call it with the new value of number, which is the current value of number plus 1. This will update the counter value in the state, which will trigger a re-render of the component to reflect the new counter value in the UI.
  }
  return (
    <div>
      <h3>Functional Component</h3>
      <h1>Counter = {number}</h1>
      <button onClick={increment}>Increment</button>

      </div>
  );
}

export default CounterFunction;