import React, { Component } from 'react';

import './App.scss';
import UserList from './components/user-list'
import {usersService} from './services/users'
import 'bootstrap/scss/bootstrap.scss';

class App extends Component {
  render() {
    return (
      <UserList service={usersService}/>
    );
  }
}

export default App;
