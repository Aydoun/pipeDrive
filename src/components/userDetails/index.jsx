import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar, Row, Col, Button, Popconfirm } from 'antd';
import { deleteUser } from '../../actions/users';
import { apiMapping } from '../../utils/config';
import './index.css';
import { initials } from '../../utils/';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser() {
    const { id } = this.props.selectedUser;
    this.props.deleteUser(id);
  }

  render() {
    const { selectedUser, deleteUserLoading } = this.props;
    const { phone, first_name, last_name, email, name } = this.props.selectedUser;
    return (
      <div className="user-details__wrapper">
        <Row className="user-contact__info">
          <Avatar
            size={64} >
            {initials(first_name, last_name)}
          </Avatar>
          <div className="user-contact__name">{name}</div>
          <div className="user-contact__phone">{phone.length > 0 ? phone[0].value : '--'}</div>
        </Row>
        <Row className="user-info__wrapper" >
          <Col span={8} className="user-info__label">Email</Col>
          <Col span={16} className="user-info__value">
            {email.length > 0 ? email[0].value : '--'}
          </Col>
        </Row>
        {
          Object.keys(apiMapping).map(key => {
            return (
              <Row className="user-info__wrapper" key={key}>
                <Col span={8} className="user-info__label">{key}</Col>
                <Col span={16} className="user-info__value">
                  {selectedUser[apiMapping[key]] || '--'}
                </Col>
              </Row>
            );
          })
        }
        <Row >
          <Col span={8}></Col>
          <Col span={16}>
            <Popconfirm title="Confirm Your Choice" onConfirm={this.deleteUser} okText="Confirm" cancelText="Cancel">
              <Button type="danger" loading={deleteUserLoading} icon="user-delete">Delete</Button>
            </Popconfirm>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedUser: state.users.selectedUser,
    deleteUserLoading: state.users.deleteUserLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

