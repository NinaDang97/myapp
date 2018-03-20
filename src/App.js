import React, { Component } from 'react';
import './App.css';
import ParticipantList from './Components/ParticipantList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        rdmPartList: []
    }
  }
  componentDidMount(){
    fetch("https://randomuser.me/api/?results=20")
    .then((response) => response.json())
    .then((responseData) => {
        let rdmPartList = responseData.results.map((element, i) => {
          return {
              name: `${element.name.first} ${element.name.last}`,
              email: element.email,
              number: element.phone,
              show: true
          }
        });
      this.setState({rdmPartList});
    })
    .catch((err) => alert(err));
  }
  
  render() {    
    return (
      <div className="App">
          <div className="header">
            <img src='logo.png' alt='logo' />
          </div>
          <div className="content">
            <h2>List of participants</h2>            
              <ParticipantList 
                rdmPartList={this.state.rdmPartList}
               />
          </div>
      </div>
    );
  }
}

export default App;
