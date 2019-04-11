import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import ProjectComponent from './components/project/ProjectComponent';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import UserComponent from './components/user/UserComponent';
import HomeComponent from './components/home/Home';
import LoginComponent from './components/login/Login';
import Register from './components/register/Register';
import RegisterComponent from './components/register/Register';

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <div>
              <Route path="/" component={Header}/>
              <main>
                <Route exact path="/login" component={LoginComponent}/>
                <Route exact path="/register" component={RegisterComponent}/>
                <Route path="/projects/:projectId" component={ProjectComponent}/>
                <Route path="/users/:userId" render={props => <UserComponent currentUserId="1" {...props} />}/>
                <Route path="/profile" render={props => <UserComponent currentUserId="1" {...props} />}/>
                <Route exact path="/" component={HomeComponent}/>
              </main>
              <Route path="/" component={Footer}/>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

interface Props {
}

interface State {
}