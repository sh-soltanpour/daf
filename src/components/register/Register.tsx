import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import ToastUtil from '../../utils/ToastUtil';
import '../login/login.scss';
import LoginSlider from '../loginSlider/LoginSlider';
import Api from '../../api/Api';

export default class RegisterComponent extends Component<{}, State> {
  onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (this.isFormValid()) {
      const { firstName, lastName, bio, imageUrl, jobTitle, password, username } = this.state;
      Api.register(firstName, lastName, bio, imageUrl, jobTitle, password, username)
        .then(response=>{
          if (response.status === 200) {
            ToastUtil.success('ثبت نام انجام شد')
            this.setState({redirect: true})
          }
      }).catch(
        response => {
          ToastUtil.error('این نام کاربری در سیستم ثبت شده')
        }
      )
    }
  };
  private isFormValid(): boolean {
    const { firstName, lastName, bio, imageUrl, jobTitle, password, repeatPassword, username } = this.state;
    let hasError = false;
    if (!firstName || !lastName || !bio || !imageUrl || !jobTitle || !password || !repeatPassword || !username) {
      ToastUtil.error('لطفا همه‌ی فیلدها را کامل کنید');
      hasError = true;
    }
    if (!imageUrl.match(/^https?:\/\/[^ ]*\.[^ ]*$/)) {
      ToastUtil.error('لینک عکس پروفایل نامعتبر است');
      hasError = true;
    }
    if (password !== repeatPassword) {
      ToastUtil.error('رمزعبور با تکرار آن برابر نیست');
      hasError = true;
    }
    return !hasError;
  }
  onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const name = event.target.name as
      | 'firstName'
      | 'lastName'
      | 'userName'
      | 'password'
      | 'repeatPassword'
      | 'jobTitle'
      | 'imageUrl'
      | 'bio';

    this.setState({ [name]: event.target.value } as any);
  };
  constructor(props: {}) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      repeatPassword: '',
      jobTitle: '',
      imageUrl: '',
      bio: '',
      redirect: false
    };
  }
  private isLoggedIn(): boolean {
    return localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== undefined
  }

  render() {
    if (this.isLoggedIn())
      return <Redirect to={"/"}/>;
    if (this.state.redirect)
      return <Redirect to={'/'}/>;
    return (
      <div>
        <div className="login-page">
          <div className="form">
            <Link id="logo" className="col-auto d-flex align-items-center" to="/">
              <img src={logo} alt="logo" />
            </Link>
            <form className="register-form" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-6">
                  <input name="firstName" type="text" className="rtl rtl-placeholder" placeholder="نام" onChange={this.onChange} required />
                </div>
                <div className="col-6">
                  <input
                    name="lastName"
                    type="text"
                    className="rtl rtl-placeholder"
                    placeholder="نام خانوادگی"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    name="username"
                    type="text"
                    className="ltr rtl-placeholder"
                    placeholder="نام کاربری"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <input
                    name="password"
                    type="password"
                    className="ltr rtl-placeholder"
                    placeholder="کلمه عبور"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <input
                    name="repeatPassword"
                    type="password"
                    className="ltr rtl-placeholder"
                    placeholder="تکرار کلمه عبور"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    name="jobTitle"
                    type="text"
                    className="rtl rtl-placeholder"
                    placeholder="عنوان شغلی"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    name="imageUrl"
                    type="url"
                    className="ltr rtl-placeholder"
                    placeholder="لینک عکس پروفایل"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea name="bio" className="rtl-placeholder" cols={30} rows={5} placeholder="بیو" onChange={this.onChange} required />
                </div>
              </div>

              <button type="submit" className="signup-button">
                ثبت‌نام
              </button>
              <p className="message">
                <span>قبلا ثبت‌نام کرده‌اید؟ </span>
                <Link to="/login">وارد شوید</Link>
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

interface State {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  repeatPassword: string;
  jobTitle: string;
  imageUrl: string;
  bio: string;
  redirect: boolean;
}
