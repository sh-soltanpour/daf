import React, { Component } from 'react';
import Api from '../../api/Api';
import UserListItem from '../../models/UserListItem';
import './sidebar.scss';
import SidebarUserItem from './sidebarUserItem/SidebarUserItem';

export default class Sidebar extends Component<Props, State> {
  searchSubmit(searchTerm: string): void {
    if (searchTerm === '') {
      this.getAllUsers();
    } else {
      Api.searchUsers(searchTerm).then(response => {
        if (!response) this.setState({ usersList: [] });
        else this.setState({ usersList: response.data });
      });
    }
  }
  onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchInput = event.target.value;
    this.setState({ searchInput });
    this.searchSubmit(searchInput);
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      usersList: [],
      searchInput: ''
    };
  }
  componentWillMount() {
    this.getAllUsers();
  }
  private getAllUsers() {
    Api.getAllUsers().then(response => {
      if (response) this.setState({ usersList: response.data });
    });
  }

  render() {
    const { usersList } = this.state;
    const usersComponents = usersList.map(u => <SidebarUserItem key={u.id} user={u} />);
    return (
      <aside>
        <div className="search-box">
          <input className="search-input" type="text" placeholder="جستجو نام کاربر" onChange={this.onChangeSearchInput} />
        </div>
        <div id="user-list-wrapper">
          <ul className="user-list">{usersComponents}</ul>
        </div>
      </aside>
    );
  }
}

interface Props {}
interface State {
  usersList: UserListItem[];
  searchInput: string;
}
