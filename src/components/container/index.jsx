import React, { Component } from 'react';
import { Input, Button, Pagination, Modal } from 'antd';
import { connect } from 'react-redux';
import ListItem from '../listItem/';
import './index.css';

const Search = Input.Search;

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  render() {
    const { visible } = this.state;
    return (
      <div className="app-container">
          <h3 className="list-header">People's List</h3>
          <Button 
            type="primary" 
            icon="plus"
            onClick={() => this.setState({ visible: true })}
          >
              Add a Person
          </Button>&nbsp;&nbsp;
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
          <Modal 
            title="Title"
            visible={visible}
            onCancel={() => this.setState({ visible: false })}
          />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
