import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from './components/container/';
import Notificator from './components/notificator/';
import './App.css';

class App extends Component {
  render() {
    const { notificationData, notificationKey } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">pipedrive</div> 
          <Container />
          <Notificator notificationData={notificationData} key={notificationKey} />
        </header>        
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {
    notificationData: state.app.notificationData,
    notificationKey: state.app.notificationKey,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
