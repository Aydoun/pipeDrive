import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Pagination, Modal, Spin } from 'antd';
import SortedList from '../dnd/';
import AddForm from '../userAdd/';
import UserDetails from '../userDetails/';
import { getUserList, selectUser, addUser } from '../../actions/users';

import './index.css';

const Search = Input.Search;

class Container extends Component {
  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
    this.getSearchList = this.getSearchList.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.isSearchBarEmpty = this.isSearchBarEmpty.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
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

  submitData(data) {
    this.props.addUser(data);
  }

  componentDidMount() {
    this.props.getUserList();
  }

  render() {
    const { currentPage, pageSize } = this.state;
    const { listLoading, userDetailModal, userAddModal, addUserLoading } = this.props;
    const subList = this.getSearchList();
    const finalList = subList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const userListLength = subList.length;

    return (
      <div className="app-container">
          <h3 className="list-header">People's List</h3>
          <div style={{ padding : '12px 15px'}}>
            <Button 
              type="primary" 
              icon="plus"
              onClick={() => this.props.toggleAddModal(true)}
            >
                Add a Person
            </Button>
            <Search
              placeholder="Search..."
              onChange={this.isSearchBarEmpty}
              onSearch={this.onSearch}
              style={{ width: 200, float: 'right' }}
            />
            <div style={{ marginTop: 12 }}>
                { listLoading && <Spin style={{}}/> }
                {
                  userListLength > 0 ? <SortedList list={finalList}/> : (
                    <li className="empty-results">No Results Found...</li>
                  )
                }
            </div>
            <Pagination 
              style={{ float: 'right', paddingBottom: 24 }}
              defaultCurrent={1} 
              total={userListLength} 
              showQuickJumper 
              pageSize={10}
              current={currentPage}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              onChange={this.onPaginationChange}
            />
          </div>    
          <Modal 
            title="Add Person"
            visible={userAddModal}
            destroyOnClose
            onCancel={() => this.props.toggleAddModal(false)}
            width={415}
            footer={[
              <Button 
                key="back" 
                onClick={() => this.props.toggleAddModal(false)}
                style={{ color: '#444', fontWeight: 700 }}
              >
                Back
              </Button>,
            ]}
          >
            <AddForm submitData={this.submitData} loading={addUserLoading}/>
          </Modal>
          <Modal 
            title="Personal Information"
            visible={userDetailModal}
            onCancel={() => this.props.toggleEditModal(false)}
            footer={[
              <Button 
                key="back" 
                onClick={() => this.props.toggleEditModal(false)}
                style={{ color: '#444', fontWeight: 700 }}
              >
                Back
              </Button>,
            ]}
            width={415}
          >
            <UserDetails/>
          </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ getUserList, selectUser, addUser }, dispatch), 
    toggleEditModal: visible => {
      dispatch({
        type: 'TOGGLE_USER_DETAILS',
        userDetailModal: visible
      });
    },
    toggleAddModal: visible => {
      dispatch({
        type: 'TOGGLE_ADD_MODAL',
        userAddModal: visible
      });
    },
  }
}

function mapStateToProps(state) {
  return {
    userList: state.users.userList,
    listLoading: state.users.listLoading,
    userDetailModal: state.users.userDetailModal,
    userAddModal: state.users.userAddModal,
    addUserLoading: state.users.addUserLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
