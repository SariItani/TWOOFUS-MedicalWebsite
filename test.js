const axios = require('axios');

const testLogin = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
    });
    return response.data.token;
};

const testGet = async (url, token) => {
    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`Success: ${url}`, response.data);
    } catch (error) {
        console.error(`Error: ${url}`, error.response?.data || error.message);
    }
};

const runTests = async () => {
    const userToken = await testLogin('sariitani101@gmail.com', 'password123');
    const doctorToken = await testLogin('sirsri101@gmail.com', 'password123');

    console.log("Testing user routes:");
    await testGet('http://localhost:5000/api/medical-profile', userToken);

    console.log("Testing doctor routes:");
    await testGet('http://localhost:5000/api/medical-profile/PROFILE_ID', doctorToken);

    // Additional tests as needed
};

runTests();
