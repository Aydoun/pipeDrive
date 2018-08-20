import React from 'react';
import { message } from 'antd';

export default class extends React.Component {
  componentDidMount() {
    const { type, text } = this.props.notificationData;
    if(text && type) {
      message[type](text)
    }
  }

  render() {
    return null;
  }
}
