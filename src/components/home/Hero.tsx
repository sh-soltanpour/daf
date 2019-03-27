import React, { Component } from 'react';

export default class Hero extends Component {
  render() {
    return (
      <div>
        <section id="slider">
          <div className="slider-container container">
            <h1>جاب‌اونجا خوب است!</h1>
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
              مجله در
            </p>
            <div className="main-search-box">
              <input type="text" placeholder="جستجو در جاب‌اونجا" />
              <button type="submit">جستجو</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
