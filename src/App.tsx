import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ProjectComponent from './components/project/ProjectComponent';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import UserComponent from './components/user/UserComponent';
import HomeComponent from './components/home/Home';

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <div>
              <Route path="/projects/:projectId" component={ProjectComponent} />
              <Route path="/users/:userId" render={props => <UserComponent currentUserId={'1'} {...props} />} />
              <Route path="/" component={HomeComponent} />
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

interface Props {}

interface State {}
