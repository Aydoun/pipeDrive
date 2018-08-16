import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Icon } from 'antd';
import './index.css';

const pictureStyle = {
    backgroundColor: '#d3edff', 
    color: '#0883f5', 
    verticalAlign: 'middle',
    fontSize: '13px',
    fontWeight: '700'
};

export default class ListItem extends Component {
    static propTypes = {
        userName: PropTypes.string,
        userLocation: PropTypes.string,
        userInitials: PropTypes.string,
        hasPic: PropTypes.boolean,
        userPic: PropTypes.string,
    }

    static defaultProps = {
        userName: 'Michael Barton',
        userLocation: 'Perkin Elmer Inc',
        userInitials: 'MB',
        hasPic: false,
        userPic: '',
    }

    render() {
        const {
            userName,
            userLocation,
            userInitials,
        } = this.props;
        
        return (
        <div className="user-list__wrapper">
            <div>
                <div className="user-item__name">{userName}</div>
                <div>
                    <Icon type="pushpin" />
                    <span className="user-item__location">{userLocation}</span>
                </div>
            </div>
            <div className="user-item__pic">
                <Avatar size={38} style={pictureStyle} >{userInitials}</Avatar>
            </div>
        </div>
        );
    }
}
