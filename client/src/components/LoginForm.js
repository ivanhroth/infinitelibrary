import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, thunks } from '../store/auth';

const LoginForm = props => {
    const dispatch = useDispatch();

    const email = useSelector(state => state.auth.email);
    const password = useSelector(state => state.auth.password);

    const updateEmailValue = event => dispatch(actions.updateEmailValue(event.target.value));
    const updatePasswordValue = event => dispatch(actions.updatePasswordValue(event.target.value));
    const tryLogin = event => {
        event.preventDefault();
        dispatch(thunks.tryLogin());
    }

    return (<form>
    <div>
      <input onChange={updateEmailValue} type="email" placeholder="Email" required />
    </div>
    <div>
      <input onChange={updatePasswordValue} type="password" placeholder="Password" required />
    </div>
    <div>
      <button onClick={tryLogin}>Log in</button>
    </div>
  </form>);
}

export default LoginForm;
