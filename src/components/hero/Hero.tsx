import React, { Component } from 'react';
import './hero.scss';

export default class Hero extends Component<Props, State> {
  submitSearchProjects = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onSearch(this.state.inputText);
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }
  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputText: event.target.value });
  };
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
            <form className="main-search-box" onSubmit={this.submitSearchProjects}>
              <input type="text" placeholder="جستجو در جاب‌اونجا" onChange={this.onChangeInput} />
              <button type="submit">جستجو</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

interface Props {
  onSearch: (searchInput: string) => void;
}
interface State {
  inputText: string;
}
