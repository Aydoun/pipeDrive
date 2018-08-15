import React, { Component } from 'react';
import Container from './components/container/';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">pipedrive</div> 
          <Container />
        </header>        
      </div>
    );
  }
}

export default App;
