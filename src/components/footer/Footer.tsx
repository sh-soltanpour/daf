import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import './footer.scss';

export default class Footer extends Component<Props, {}> {
  render() {
    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/register') return null;
    return (
      <footer>
        <span>&#169; تمامی حقوق این سایت متعلق به جاب‌اونجا می‌باشد</span>
      </footer>
    );
  }
}

interface Props extends RouteComponentProps {}
