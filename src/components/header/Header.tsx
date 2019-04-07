import React, { Component } from 'react';
import logo from '../../html-css/assets/images/logo.png';
import { Link } from 'react-router-dom';

export default class Header extends Component<Props, State> {
  logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    localStorage.clear();
  };
  render() {
    return (
      <header>
        <div className="container h-100">
          <div id="header" className="row align-items-center justify-content-between">
            <Link id="logo" className="col-auto d-flex align-items-center" to={`/`}>
              <img src={logo} alt="logo" />
            </Link>
            <nav className="col-auto row align-items-center">
              <div id="profile" className="col-auto clickable">
                <Link to={`users/1`}>حساب کاربری</Link>
              </div>
              <div id="logout" className="col-auto clickable">
                <Link to={`/`} onClick={this.logout}>
                  خروج
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
interface Props {}
interface State {}
