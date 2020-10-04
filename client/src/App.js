import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';

import { Nav, Button, Navbar } from 'react-bootstrap';

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
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">InfiniteLibrary</Navbar.Brand>
        <Navbar.Collapse>
        <Nav className="navbar">
        {needLogin ? <></> : <Nav.Item as="li"><NavLink to="/">Home</NavLink></Nav.Item>}
        {needLogin ? <></> : <Nav.Item as="li"><NavLink to="/books/add">Add a book</NavLink></Nav.Item>}
        {needLogin ? <Nav.Item as="li"><NavLink to="/login">Log in</NavLink></Nav.Item> : <Nav.Item as="li"><form><Button type="submit" onClick={logOut}>Log out</Button></form></Nav.Item>}
        {needLogin ? <Nav.Item as="li"><NavLink to="/register">Register an account</NavLink></Nav.Item> : <></>}
        </Nav>
        </Navbar.Collapse>
    </Navbar>
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
                      component={ViewBook} />

        <PrivateRoute path="/"
                        exact={true}
                        needLogin={needLogin}
                        component={Homepage} />
    </Switch>
    </BrowserRouter>
    );
}

export default App;
