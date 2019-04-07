import React, { Component } from 'react';
import UserListItem from '../../models/UserListItem';
import Network from '../../network/Network';
import SidebarUserItem from './SidebarUserItem';
import { StringUtil } from '../../utils/StringUtil';

export default class Sidebar extends Component<Props, State> {
  searchSubmit(searchInput: string): void {
    const { usersListCache } = this.state;
    this.setState({ usersList: StringUtil.searchStringInArray(usersListCache, searchInput, x => `${x.firstName} ${x.lastName}`) });
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
      usersListCache: [],
      searchInput: ''
    };
  }
  componentWillMount() {
    Network.getAllUsers().then(response => {
      this.setState({ usersListCache: response.data });
      this.searchSubmit('');
    });
  }
  render() {
    const { usersList } = this.state;
    const usersComponents = usersList.map(u => <SidebarUserItem key={u.id} user={u} />);
    return (
      <div>
        <aside>
          <div className="search-box">
            <input className="search-input" type="text" placeholder="جستجو نام کاربر" onChange={this.onChangeSearchInput} />
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
  usersListCache: UserListItem[];
  searchInput: string;
}
