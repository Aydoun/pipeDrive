import React, { Component } from 'react';
import './index.css';

class Container extends Component {
  render() {
    return (
      <div className="app-container">
          <h3 className="list-header">People's List</h3>
          <div className="user-list__wrapper">
            
            <ul className="users-list">
            <div className="line-divider"></div>
                <li>Baby</li>
                <li>Love</li>
            </ul>
          </div>
          
      </div>
    );
  }
}

export default Container;
