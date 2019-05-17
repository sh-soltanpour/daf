import React, { Component } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.scss';

export default class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    localStorage.clear();
    this.props.history.push("/login");
  };
  render() {
    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/register') return null;

    return (
      <header>
        <div className="container h-100">
          <div id="header" className="row align-items-center justify-content-between">
            <Link id="logo" className="col-auto d-flex align-items-center" to={`/`}>
              <img src={logo} alt="logo" />
            </Link>
            <nav className="col-auto row align-items-center">
              <div id="profile" className="col-auto clickable">
                <Link to="/profile">حساب کاربری</Link>
              </div>
              <div id="logout" className="col-auto clickable">
                <span onClick={this.logout}>خروج</span>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
interface Props extends RouteComponentProps {}
interface State {
}
