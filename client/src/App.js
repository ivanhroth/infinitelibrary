import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';

import UserList from './components/UsersList';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Homepage from './components/Homepage';
import AddBookForm from './components/AddBookForm';
import ViewBook from './components/ViewBook';

import { thunks } from './store/auth';
import { useSelector, useDispatch } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      rest.needLogin === true
        ? <Redirect to='/login' />
        : <Component {...props} />
    )} />
  )

const App = () => {

    const dispatch = useDispatch();

    const needLogin = useSelector(state => !state.auth.token);
    const logOut = () => dispatch(thunks.logOut());

    return (
    <BrowserRouter>
    <div className="logotext">InfiniteLibrary</div>
    <nav>
        <ul>
            {needLogin ? <li></li> : <li><NavLink to="/">Home</NavLink></li>}
            {needLogin ? <li></li> : <li><NavLink to="/books/add">Add a book</NavLink></li>}
            {needLogin ? <li><NavLink to="/login">Log in</NavLink></li> : <li><button type="submit" onClick={logOut}>Log out</button></li>}
            {needLogin ? <li><NavLink to="/register">Register an account</NavLink></li> : <li></li>}
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

        <PrivateRoute path="/books/add"
                      exact={true}
                      needLogin={needLogin}
                      component={AddBookForm} />

        <PrivateRoute path="/books/:id"
                      exact={true}
                      needLogin={needLogin}
                      component={ViewBook}/>

        <PrivateRoute path="/"
                        exact={true}
                        needLogin={needLogin}
                        component={Homepage} />
    </Switch>
    </BrowserRouter>
    );
}

export default App;
