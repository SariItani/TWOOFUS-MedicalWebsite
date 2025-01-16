// Home Component
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Medical App</h1>
            <p>Choose an option below to get started:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <Link to="/login">
                    <button style={{ padding: '10px 20px', fontSize: '16px' }}>Login</button>
                </Link>
                <Link to="/signup">
                    <button style={{ padding: '10px 20px', fontSize: '16px' }}>Signup</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
