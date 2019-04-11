import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../html-css/assets/images/logo.png';
import '../../html-css/scss/login.scss';
import ToastUtil from '../../utils/ToastUtil';
import LoginSlider from './LoginSlider';

export default class LoginComponent extends Component<Props, State> {
  private isFormValid(): boolean {
    const { password, username } = this.state;
    if (!password || !username) {
      ToastUtil.error('لطفا همه‌ی فیلدها را کامل کنید');
      return false;
    }
    return true;
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      redirectHome: false
    };
  }
  onSubmitLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (this.isFormValid()) {
      // localStorage.setItem('token', 'true');
      this.setState({ redirectHome: true });
    }
  };
  onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ username: event.target.value });
  };
  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value });
  };
  render() {
    if (this.state.redirectHome) return <Redirect to="/" />;
    return (
      <div>
        <div className="login-page">
          <div className="form">
            <Link id="logo" className="col-auto d-flex align-items-center" to="/">
              <img src={logo} alt="logo" />
            </Link>
            <form className="register-form" onSubmit={this.onSubmitLogin}>
              <div className="row">
                <div className="col-12">
                  <input
                    name="username"
                    type="text"
                    className="ltr rtl-placeholder"
                    placeholder="نام کاربری"
                    onChange={this.onUsernameChange}
                  />
                </div>
                <div className="col-12">
                  <input
                    name="password"
                    type="password"
                    className="ltr rtl-placeholder"
                    placeholder="کلمه عبور"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </div>

              <button type="submit" className="signup-button">
                ورود
              </button>
              <p className="message">
                <span>ثبت‌نام نکرده‌اید؟ </span>
                <Link to="/register">ثبت‌نام کنید</Link>
              </p>
            </form>
          </div>
        </div>
        <LoginSlider />
        <footer className="bg-transparent">
          <span className="footer-text">&#169; تمامی حقوق این سایت متعلق به جاب‌اونجا است</span>
        </footer>
      </div>
    );
  }
}

interface Props {}
interface State {
  username: string;
  password: string;
  redirectHome: boolean;
}
