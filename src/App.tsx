import dotenv from 'dotenv'
import React, { Component } from 'react';
import { startsWith } from 'ramda';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/scss/bootstrap.scss';

import {ApiClient} from './api'
import LoginPage from './components/login-page'
import UserList from './components/user-list'
import { UserService } from './services/user'
import './App.scss';

dotenv.config();

class App extends Component {
  componentWillMount() {
    const token = sessionStorage.getItem(`jwtToken`);
    const isLoginPage = () => startsWith(`/login`, document.location.pathname)
    if (!isLoginPage() && (!token || token === ``)) {
      document.location.pathname = `/login`
    }
  }

  render() {
    const api = new ApiClient(process.env.REACT_APP_SERVER_BASE_URL as string, sessionStorage.getItem(`jwtToken`) as string);

    const userService = new UserService(api);
    return (
      <Router>
        <div>
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="/users" render={() =><UserList service={userService} />} />
        </div>
      </Router>
    );
  }
}

export default App;
