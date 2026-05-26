import React, { Component } from 'react';

// CounterClass is a React class component that manages a counter using React's built-in state management.
// The constructor initializes the component with a state object containing a 'number' property set to 0.
// super() is called to invoke the parent React.Component constructor, which is required in class components.
// The render method returns JSX that displays the current value of 'number' from the component's state.
// this.state.number accesses the number property from the component's state and displays it inside an <h1> tag.
class CounterClass extends Component {
    constructor() {
        super(); // calling the parent React.Component constructor — required in every class component constructor
        this.increment = this.increment.bind(this); // binding the increment method to the current instance of CounterClass to ensure it has the correct 'this' context when called
        this.state = {
          number: 0 // initializing state with number set to 0 — this is the counter's starting value
        };
    }

    increment = () => {
      //this is state function that is used to update the state of the component. It takes an object as an argument and updates the state with the new values provided in the object. In this case, we are updating the number property of the state by incrementing it by 1.
        this.setState({ 
          number:++this.state.number // incrementing the number property in state by 1 using the pre-increment operator. This will update the counter value in the state, which will trigger a re-render of the component to reflect the new counter value in the UI.
        }); // incrementing the counter by updating the state with the new value of number
    }

    render() {
      return (
        // returning JSX to display the current counter value from state
        <div>
          <h1>Counter = {this.state.number}</h1>
          <button onClick={this.increment}>Increment</button>
          {/* this.state.number accesses the number property from state and displays it dynamically */}
        </div>
      );
    }
}

export default CounterClass; // exporting the CounterClass component for use in other parts of the application  