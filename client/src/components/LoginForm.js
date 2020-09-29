import React from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { actions, thunks } from '../store/auth';

const LoginForm = props => {
    const dispatch = useDispatch();

    const email = useSelector(state => state.auth.email);
    const password = useSelector(state => state.auth.password);
    const token = useSelector(state => state.auth.token);

    const updateEmailValue = event => dispatch(actions.updateEmailValue(event.target.value));
    const updatePasswordValue = event => dispatch(actions.updatePasswordValue(event.target.value));
    const tryLogin = event => {
        event.preventDefault();
        dispatch(thunks.tryLogin());
    }

    if (token) return <Redirect to="/"/>

    return (
    <div>
        <h2>Log in</h2>
        <form>
            <div>
            <input onChange={updateEmailValue} type="email" placeholder="Email" required />
            </div>
            <div>
            <input onChange={updatePasswordValue} type="password" placeholder="Password" required />
            </div>
            <div>
            <button onClick={tryLogin}>Log in</button>
            </div>
    </form>
    <a href='/register/'>Don't have an account? Click here to register</a>
  </div>
    )
}

export default LoginForm;
