import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form';

class App extends Component {
  render() {    
    return (
      <div className="App">
        <div className="header"></div>
        <div className="content">
          <h2>List of participants</h2>
          
          {/* Form goes here */}
          <Form />
         
        </div>
      </div>
    );
  }
}

export default App;
