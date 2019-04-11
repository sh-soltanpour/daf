import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import ProjectComponent from './components/project/ProjectComponent';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import UserComponent from './components/user/UserComponent';
import HomeComponent from './components/home/Home';
import LoginComponent from './components/login/Login';

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const isLoggedIn = localStorage.getItem('token') === 'true';
  }

  render() {
    // const isLoggedIn = localStorage.getItem('token') === 'true';
    return (
      <div>
        <Router>
          <div>
            {/* <Route path="/login" render={props => (!isLoggedIn ? <LoginComponent {...props} /> : <Redirect to={{ pathname: '/' }} />)} /> */}
            <Route path="/login" component={LoginComponent} />
            {/* {isLoggedIn ? ( */}
            <div>
              <Header />
              <main>
                <Route path="/projects/:projectId" component={ProjectComponent} />
                <Route path="/users/:userId" render={props => <UserComponent currentUserId="1" {...props} />} />
                <Route path="/profile" render={props => <UserComponent currentUserId="1" {...props} />} />
                <Route exact path="/" component={HomeComponent} />
              </main>
              <Footer />
            </div>
            {/* ) : ( */}
            {/* <Redirect to={{ pathname: '/login' }} /> */}
            {/* )} */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

interface Props {}
interface State {}

const PrivateRoute = ({ component: Component, authed, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (authed ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
    />
  );
};
