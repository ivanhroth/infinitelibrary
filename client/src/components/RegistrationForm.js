import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { actions, thunks } from '../store/auth';
import { Container, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const RegistrationForm = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = useSelector(state => state.auth.token);
    //const token = false;

    const dispatch = useDispatch();

    const updateUsername = e => {
        setUsername(e.target.value);
    }

    const updateEmail = e => {
        setEmail(e.target.value);
        dispatch(actions.updateEmailValue(e.target.value));
    }

    const updatePassword = e => {
        setPassword(e.target.value);
        dispatch(actions.updatePasswordValue(e.target.value));
    }

    const registerUser = async e => {
        e.preventDefault();
        console.log(password);
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password, email})
            });

            if (!res.ok) {
                throw res;
            }

            dispatch(thunks.tryLogin());

            const { token, user: { id } } = await res.json();
            //props.updateContext(token, id);
        } catch (err) {
            console.log(err);
        }
    }
    if (token) return <Redirect to="/"/>
    return (
        <Container>
            <Form onSubmit={registerUser}>
                <h2>Register</h2>
                <div><input type="text" name="username" placeholder="Enter Username" value={username} onChange={updateUsername} /></div>
                <div><input type="email" name="email" placeholder="Enter Email" value={email} onChange={updateEmail} /></div>
                <div><input type="password" name="password" placeholder="Enter Password" value={password} onChange={updatePassword} /></div>
                <div><Button type='submit'>Submit</Button></div>
            </Form>
        </Container>
        );
}

export default RegistrationForm;
