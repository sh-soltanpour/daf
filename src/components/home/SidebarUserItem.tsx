import React, { Component } from 'react';
import UserListItem from '../../models/UserListItem';

export default class SidebarUserItem extends Component<Props, State> {
  render() {
    const { firstName, jobTitle, lastName, profilePictureUrl } = this.props.user;
    return (
      <li className="user-item-container">
        <div className="user-item">
          <img className="user-item-avatar" src={profilePictureUrl} alt="avatar" />
          <div className="user-item-content">
            <h4 className="user-item-title">
              {firstName} {lastName}
            </h4>
            <span className="user-item-desc">{jobTitle}</span>
          </div>
        </div>
      </li>
    );
  }
}

interface Props {
  user: UserListItem;
}
interface State {}
