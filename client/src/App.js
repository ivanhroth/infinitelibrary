import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {

  return (
    <BrowserRouter>
        <div class="logotext">InfiniteLibrary</div>
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/login">Log in</NavLink></li>
                <li><NavLink to="/register">Register an account</NavLink></li>
            </ul>
        </nav>
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>

            <Route path="/login">
                <LoginForm />
            </Route>

            <Route path="/register">
                <RegistrationForm />
            </Route>

            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
