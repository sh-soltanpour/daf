import React, { Component } from 'react';
import './App.css';
import Users from './users/Users';

class App extends Component<Props, State> {
  changeTitle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = event => {
    this.setState({ title: 'new title' });
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      title: 'welkfj'
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.title}</p>
        <button onClick={this.changeTitle}>click</button>

        <section>
          <Users yourName={this.testFunc} />
        </section>
      </div>
    );
  }

  testFunc = () => {
    this.setState({});
  };
}

export default App;

interface Props {}
interface State {
  title: string;
}
