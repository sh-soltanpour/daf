import React, { Component } from 'react';
import UserListItem from '../../../models/UserListItem';
import { Link } from 'react-router-dom';
import './sidebarUserItem.scss';

export default class SidebarUserItem extends Component<Props, State> {
  render() {
    const { firstName, jobTitle, lastName, profilePictureUrl, id } = this.props.user;
    return (
      <li className="user-item-container">
        <Link to={`users/${id}`}>
          <div className="user-item">
            <img className="user-item-avatar" src={profilePictureUrl} alt="avatar" />
            <div className="user-item-content">
              <h4 className="user-item-title">
                {firstName} {lastName}
              </h4>
              <span className="user-item-desc">{jobTitle}</span>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

interface Props {
  user: UserListItem;
}
interface State {}
