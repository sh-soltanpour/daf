import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ProjectComponent from './components/project/ProjectComponent';

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Route path="/projects/:projectId" component={ProjectComponent} />
      </Router>
    );
  }
}

export default App;

interface Props {}

interface State {}
