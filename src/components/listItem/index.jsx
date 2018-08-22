import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'antd';
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
        onUserClick: PropTypes.func,
    }

    static defaultProps = {
        userName: 'Michael Barton',
        userLocation: 'Perkin Elmer Inc',
        userInitials: 'MB',
        onUserClick: () => { },
    }

    render() {
        const {
            userName,
            userLocation,
            userInitials,
            onUserClick,
        } = this.props;

        return (
            <div className="user-list__wrapper">
                <div>
                    <div className="user-item__name">
                        <a onClick={onUserClick} >{userName}</a>
                    </div>
                    <div>
                        <Icon type="environment" />
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
