import React,{Component} from 'react';
import logo from '../../html-css/assets/images/logo.png'


export default class Header extends Component<{}, {}> {
  render(): JSX.Element {
    return (
      <header>
        <div className="container h-100">
          <div id="header" className="row align-items-center justify-content-between">
            <a id="logo" className="col-auto d-flex align-items-center" href="/">
              <img src={logo} alt="logo"/>
            </a>
            <nav className="col-auto row align-items-center">
              <div id="profile" className="col-auto clickable">
                <a href="profile.html">حساب کاربری</a>
              </div>
              <div id="logout" className="col-auto clickable">
                <a href="login.html">خروج</a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    )
  }
}