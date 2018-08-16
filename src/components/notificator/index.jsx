import React from 'react';
import { notification } from 'antd';

export default class extends React.Component {
  componentDidMount() {
    const { type, message } = this.props.notificationData;
    if(message && type) {
        notification[type]({
            message,
        });
    }
  }

  render() {
    return null;
  }
}
