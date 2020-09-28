import React, { useState } from 'react';

const RegistrationForm = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    return (
            <form onSubmit={registerUser}>
                <h2>Register</h2>
                <input type="text" name="username" placeholder="Enter Username" value={username} onChange={updateUsername} />
                <input type="email" name="email" placeholder="Enter Email" value={email} onChange={updateEmail} />
                <input type="password" name="password" placeholder="Enter Password" value={password} onChange={updatePassword} />
                <button type='submit'>Submit</button>
            </form>
        );
}

export default RegistrationForm;
