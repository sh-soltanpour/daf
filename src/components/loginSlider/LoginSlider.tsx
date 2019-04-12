import React, { Component } from 'react';
import './loginSlider.scss';

export default class LoginSlider extends Component {
  render() {
    return (
      <div>
        <div id="slideshow">
          <div className="slide-wrapper">
            <div className="slide" />
            <div className="slide" />
            <div className="slide" />
            <div className="slide" />
          </div>
        </div>
      </div>
    );
  }
}
