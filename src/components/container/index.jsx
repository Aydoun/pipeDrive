import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Pagination, Modal, Divider, Spin } from 'antd';
import ListItem from '../listItem/';
import { getUserList } from '../../actions/users';
import { initials } from '../../utils/';
import './index.css';

const Search = Input.Search;

class Container extends Component {
  constructor(props) {
    super(props);
    this.userClick = this.userClick.bind(this);
    this.getSearchList = this.getSearchList.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.isSearchBarEmpty = this.isSearchBarEmpty.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      visible: false,
      currentPage: 1,
      pageSize: 10,
      subUserList: [],
      searchValue: '',
    }
  }

  isSearchBarEmpty(e) {
    const value = e.target.value;

    if(typeof value !== 'undefined' && value.length === 0) {
      // Empty Search Bar
      this.setState(prevState => {
        return {
          searchValue: '',
          currentPage: 1,
        };
      });
    }
  }

  userClick(userId) {
    console.log(userId);
  }

  onPaginationChange(page, pageSize) {
    this.setState(prevState => {
      return {
        currentPage: page,
      };
    });
  }

  onSearch(value) {
    this.setState(prevState => {
      return {
        searchValue: value,
        currentPage: 1,
      };
    });
  }

  getSearchList() {
    const { searchValue } = this.state;
    const { userList } = this.props;
    let subList = userList;

    if(searchValue) {
      const lowerSearchValue = searchValue.toLowerCase();
      subList = userList.filter(l => l.name.toLowerCase().indexOf(lowerSearchValue) >= 0)
    }

    return subList;
  }

  componentDidMount() {
    this.props.getUserList();
  }

  render() {
    const { currentPage, pageSize } = this.state;
    const { listLoading } = this.props;
    const subList = this.getSearchList();
    const finalList = subList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const userListLength = subList.length;

    return (
      <div className="app-container">
          <h3 className="list-header">People's List</h3>
          <Divider />
          <Button 
            type="primary" 
            icon="plus"
            onClick={() => this.setState({ visible: true })}
          >
              Add a Person
          </Button>&nbsp;&nbsp;
          <Search
            placeholder="search..."
            onChange={this.isSearchBarEmpty}
            onSearch={this.onSearch}
            style={{ width: 200 }}
          />
          <div style={{ marginTop: 12 }}>
            { listLoading && <Spin /> }
          </div>
          <div>
            <ul className="users-list">
                {
                  userListLength > 0 ? finalList.map(ele => {
                    return (
                      <li key={ele.id}>
                        <ListItem      
                          userName={ele.name}
                          userInitials={initials(ele.first_name, ele.last_name)}
                          onUserClick={() => this.userClick(ele.id)}
                        />
                      </li>
                    )
                  }) : (
                    <li className="empty-results">No Results Found...</li>
                  )
                }
            </ul>
          </div>
          <Pagination 
            defaultCurrent={1} 
            total={userListLength} 
            showQuickJumper 
            pageSize={10}
            current={currentPage}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            onChange={this.onPaginationChange}
          />
          <Modal 
            title="Title"
            visible={false}
            onCancel={() => this.setState({ visible: false })}
          />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserList }, dispatch);
}

function mapStateToProps(state) {
  return {
    userList: state.users.userList,
    listLoading: state.users.listLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
