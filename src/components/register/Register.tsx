import {Link} from 'react-router-dom';
import logo from '../../html-css/assets/images/logo.png';
import LoginSlider from '../login/LoginSlider';
import React, {Component, Props} from 'react';

export default class RegisterComponent extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      repeatPassword: '',
      jobTitle: '',
      imageUrl: '',
      bio: ''
    }
  }

  onChange(event: React.FormEvent<HTMLInputElement>) {
    console.log("event" ,event)

  }
  onSubmit (event: React.FormEvent<HTMLFormElement>){

  }



  render() {
    return (
      <div>
        <div className="login-page">
          <div className="form">
            <Link id="logo" className="col-auto d-flex align-items-center" to="/">
              <img src={logo} alt="logo"/>
            </Link>
            <form className="register-form" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-6">
                  <input name='firstName' type="text" className="rtl rtl-placeholder" placeholder="نام" onChange={this.onChange} />
                </div>
                <div className="col-6">
                  <input name='lastName' type="text" className="rtl rtl-placeholder" placeholder="نام خانوادگی" onChange={this.onChange}/>
                </div>
                <div className="col-12">
                  <input name='username' type="text" className="ltr rtl-placeholder" placeholder="نام کاربری" onChange={this.onChange}/>
                </div>
                <div className="col-6">
                  <input name='password' type="password" className="ltr rtl-placeholder" placeholder="کلمه عبور" onChange={this.onChange}/>
                </div>
                <div className="col-6">
                  <input name='repeatPassword' type="password" className="ltr rtl-placeholder"
                         placeholder="تکرار کلمه عبور" onChange={this.onChange}/>
                </div>
                <div className="col-12">
                  <input name='jobTitle' type="text" className="rtl rtl-placeholder" placeholder="عنوان شغلی" onChange={this.onChange}/>
                </div>
                <div className="col-12">
                  <input name='imageUrl' type="url" className="ltr rtl-placeholder" placeholder="لینک عکس پروفایل" onChange={this.onChange}/>
                </div>
                <div className="col-12">
                  <textarea name='bio' className="rtl-placeholder" cols={30} rows={5}
                            placeholder="بیو"></textarea>
                </div>
              </div>

              <button type="submit" className="signup-button">
                ورود
              </button>
              <p className="message">
                <span>قبلا ثبت‌نام کرده‌اید؟ </span>
                <Link to="/login">وارد شوید</Link>
              </p>
            </form>
          </div>
        </div>
        <LoginSlider/>
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
  userName: string;
  password: string;
  repeatPassword: string;
  jobTitle: string;
  imageUrl: string;
  bio: string;
}

