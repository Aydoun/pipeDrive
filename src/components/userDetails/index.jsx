import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Divider, Row, Col } from 'antd';
import './index.css';

class UserDetails extends Component {
  render() {
    const { selectedUser } = this.props;
    
    return (
      <div className="user-details__wrapper">
        <Row type="flex" className="user-contact__info">
          <Col span={8}></Col>
          <Col span={16}>
              <Avatar 
                src="https://www.bing.com/th?id=OIP.1g4ItbHS0yvA0WHilyOY1QHaFj&w=236&h=177&c=7&o=5&pid=1.7"
                  size={64} />
              <div className="user-contact__name">Anna Rita Sousa</div>
              <div className="user-contact__phone">+87 1222128732</div>
          </Col>
        </Row>
        {
          [1,2,3,4,5].map(el => {
            return (
              <Row className="user-info__wrapper">
                <Col span={8} className="user-info__label">Name</Col>
                <Col span={16} className="user-info__value">
                  Gabrielle
                </Col>
              </Row>
            );
          })
        }
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

