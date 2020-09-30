import React, { useState, useSelector } from 'react';
import { Redirect } from 'react-router';

const RegistrationForm = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const token = useSelector(state => state.auth.token);
    const token = false;

    const updateUsername = e => {
        setUsername(e.target.value);
    }

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updatePassword = e => {
        setPassword(e.target.value);
    }

    const registerUser = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password, email})
            });

            if (!res.ok) {
                throw res;
            }

            const { token, user: { id } } = await res.json();
            props.updateContext(token, id);
        } catch (err) {
            console.log(err);
        }
    }
    if (token) return <Redirect to="/"/>
    return (
        <div className="frame">
            <form onSubmit={registerUser}>
                <h2>Register</h2>
                <div><input type="text" name="username" placeholder="Enter Username" value={username} onChange={updateUsername} /></div>
                <div><input type="email" name="email" placeholder="Enter Email" value={email} onChange={updateEmail} /></div>
                <div><input type="password" name="password" placeholder="Enter Password" value={password} onChange={updatePassword} /></div>
                <div><button type='submit'>Submit</button></div>
            </form>
        </div>
        );
}

export default RegistrationForm;
