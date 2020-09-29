import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';

import UserList from './components/UsersList';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Homepage from './components/Homepage';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      rest.needLogin === true
        ? <Redirect to='/login' />
        : <Component {...props} />
    )} />
  )

class App extends React.Component {
    render() {
        return (
        <BrowserRouter>
        <div className="logotext">InfiniteLibrary</div>
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

            <PrivateRoute path="/"
                          exact={true}
                          needLogin={this.props.needLogin}
                          component={Homepage} />
        </Switch>
        </BrowserRouter>
  );
        }
}

export default App;
