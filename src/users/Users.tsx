import React, { Component } from 'react';

export default class Users extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { users: [{ id: '12435', name: 'vahid' }, { id: 'ewfewj', name: 'mamad' }] };
  }

  componentDidMount() {
    fetch(new Request('http://api', { method: 'GET' }))
      .then(response => {
        if (response.ok) return response.json();
        return console.error();
      })
      .then(response => {});
  }

  render() {
    const { users } = this.state;

    const usersJsx = users.map(u => {
      return <div key={u.id}>{u.name}</div>;
    });

    return (
      <div>
        {usersJsx}
        <button onClick={this.props.yourName}>click button</button>
      </div>
    );
  }
}

interface Props {
  yourName(): void;
}

interface State {
  users: User[];
}
interface User {
  id: string;
  name: string;
}
