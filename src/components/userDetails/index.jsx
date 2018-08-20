import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Row, Col, Button, Popconfirm } from 'antd';
import { apiMapping } from '../../utils/config';
import './index.css';

class UserDetails extends Component {
  render() {
    const { selectedUser } = this.props;
    
    return (
      <div className="user-details__wrapper">
        <Row className="user-contact__info">
              <Avatar 
                src="https://www.bing.com/th?id=OIP.1g4ItbHS0yvA0WHilyOY1QHaFj&w=236&h=177&c=7&o=5&pid=1.7"
                  size={64} />
              <div className="user-contact__name">{selectedUser.name}</div>
              <div className="user-contact__phone">{selectedUser.phone.length > 0 ? selectedUser.phone[0].value : '--'}</div>
        </Row>
        <Row className="user-info__wrapper" >
          <Col span={8} className="user-info__label">Email</Col>
          <Col span={16} className="user-info__value">
            {selectedUser.email.length > 0 ? selectedUser.email[0].value : '--'}
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
            <Popconfirm title="Confirm Your Choice" okText="Confirm" cancelText="Cancel">
              <Button type="danger" icon="user-delete">Delete</Button>
            </Popconfirm>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {
    selectedUser: state.users.selectedUser,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

