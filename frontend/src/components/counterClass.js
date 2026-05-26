import React, { Component } from 'react';

// CounterClass is a React class component that manages a counter using React's built-in state management.
// The constructor initializes the component with a state object containing a 'number' property set to 0.
// super() is called to invoke the parent React.Component constructor, which is required in class components.
// The render method returns JSX that displays the current value of 'number' from the component's state.
// this.state.number accesses the number property from the component's state and displays it inside an <h1> tag.
class CounterClass extends Component {
    constructor() {
        super(); // calling the parent React.Component constructor — required in every class component constructor
        this.state = {
          number: 0 // initializing state with number set to 0 — this is the counter's starting value
        };
    }
    render() {
      return (
        // returning JSX to display the current counter value from state
        <div>
          <h1>Counter = {this.state.number}</h1>
          {/* this.state.number accesses the number property from state and displays it dynamically */}
        </div>
      );
    }
}

export default CounterClass; // exporting the CounterClass component for use in other parts of the application  