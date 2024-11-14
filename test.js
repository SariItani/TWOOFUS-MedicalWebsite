const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';
const users = {};

// Helper function for logging in and storing tokens
async function loginAndStoreToken(role, email, password) {
    try {
        const response = await axios.post(`${API_BASE}/auth/login`, {
            email,
            password
        });
        users[role] = { token: response.data.token };
        console.log(`${role} logged in successfully.`);
    } catch (error) {
        console.error(`Login failed for ${role}:`, error.response?.data || error.message);
    }
}

// Helper function for making requests with authorization
async function makeRequest(method, endpoint, role, data = null) {
    const config = {
        method,
        url: `${API_BASE}${endpoint}`,
        headers: { Authorization: `Bearer ${users[role].token}` },
        data
    };
    try {
        const response = await axios(config);
        console.log(`Success [${method} ${endpoint}]`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error [${method} ${endpoint}]`, error.response?.data || error.message);
    }
}

// Define all tests in an array
const tests = [
    {
        name: 'User Profile',
        endpoint: '/dashboard/profile',
        method: 'get',
        role: 'user'
    },
    {
        name: 'Doctor Profile',
        endpoint: '/doctor-dashboard/profile',
        method: 'get',
        role: 'doctor'
    },
    {
        name: 'Fetch Patients List (Doctor)',
        endpoint: '/doctor-dashboard/patients',
        method: 'get',
        role: 'doctor'
    },
    {
        name: 'Diagnosis History (User)',
        endpoint: '/dashboard/diagnosis-history',
        method: 'get',
        role: 'user'
    },
    {
        name: 'New Diagnosis Request',
        endpoint: '/diagnosis/diagnose',
        method: 'post',
        role: 'user',
        data: {
            symptoms: ['knee_pain', 'vomiting', 'fever']
        }
    },
    // Add more tests as needed...
];

// Main function to run all tests
async function runTests() {
    // Log in both user and doctor roles to store their tokens
    await loginAndStoreToken('user', 'user@example.com', 'password123');
    await loginAndStoreToken('doctor', 'doctor@example.com', 'password123');

    // Wait briefly for tokens to be stored
    setTimeout(async () => {
        for (const test of tests) {
            console.log(`Running test: ${test.name}`);
            await makeRequest(test.method, test.endpoint, test.role, test.data);
        }
    }, 1000);
}

// Execute tests
runTests();
