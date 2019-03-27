import React, { Component } from 'react';
import UserListItem from '../../models/UserListItem';
import Network from '../../network/Network';
import SidebarUserItem from './SidebarUserItem';

export default class Sidebar extends Component<Props, State> {
  componentWillMount() {
    Network.getAllUsers().then(response => {
      this.setState({ usersList: response.data });
    });
  }
  render() {
    const { usersList } = this.state;
    const usersComponents = usersList.map(u => <SidebarUserItem key={u.id} user={u} />);
    return (
      <div>
        <aside>
          <div className="search-box">
            <input className="search-input" type="text" placeholder="جستجو نام کاربر" />
          </div>
          <div id="user-list-wrapper">
            <ul className="user-list">{usersComponents}</ul>
          </div>
        </aside>
      </div>
    );
  }
}

interface Props {}
interface State {
  usersList: UserListItem[];
}
