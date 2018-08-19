import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Pagination, Modal, Divider, Spin } from 'antd';
import SortedList from '../dnd/';
import AddForm from '../userAdd/';
import UserDetails from '../userDetails/';
import { getUserList, selectUser } from '../../actions/users';
import './index.css';

const Search = Input.Search;

class Container extends Component {
  constructor(props) {
    super(props);
    
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

  componentDidMount() {
    this.props.getUserList();
  }

  render() {
    const { currentPage, pageSize } = this.state;
    const { listLoading, userDetailModal, userAddModal } = this.props;
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
            onClick={() => this.props.toggleAddModal(true)}
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
            {
              userListLength > 0 ? <SortedList list={finalList}/> : (
                <li className="empty-results">No Results Found...</li>
              )
            }
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
            title="Add New Person"
            visible={userAddModal}
            onCancel={() => this.props.toggleAddModal(false)}
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
            <AddForm />
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
            width={400}
          >
            <UserDetails />
          </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ getUserList, selectUser }, dispatch), 
    toggleEditModal: visible => {
      dispatch({
        type: 'TOGGLE_USER_DETAILS',
        userDetailModal: visible
      });
    },
    toggleAddModal: visible => {
      dispatch({
        type: 'TOGGLE_USER_ADD',
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
