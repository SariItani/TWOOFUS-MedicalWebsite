// Updated Signup Component with username and role
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signup`, {
                username,
                email,
                password,
                role,
            });
            window.location.href = '/login'; // Redirect to login after signup
        } catch (err) {
            setError('Signup failed. Try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Role:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="user"
                            checked={role === 'user'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        User
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="doctor"
                            checked={role === 'doctor'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Doctor
                    </label>
                </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
