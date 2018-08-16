import React, { Component } from 'react';
import { Input, Button, Pagination  } from 'antd';
import ListItem from '../listItem/';
import './index.css';

const Search = Input.Search;

class Container extends Component {
  render() {
    return (
      <div className="app-container">
          <h3 className="list-header">People's List</h3>
          <Button icon="plus">Add a Person</Button>&nbsp;&nbsp;
          <Search
            placeholder="search..."
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <div>
            <ul className="users-list">
                <li>
                  <ListItem />
                </li>
                <li>
                  <ListItem />
                </li>
            </ul>
          </div>
          <Pagination defaultCurrent={1} total={50} />
      </div>
    );
  }
}

export default Container;
