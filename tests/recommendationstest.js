const axios = require('axios');
const baseUrl = 'http://localhost:5000/api';
let userToken, doctorToken;
let userProfile, doctorProfile;
let profileId;
// let more variables if needed

async function runTests() {
    try {
        await testSignup();
        await testLogin();
        await testUserProfile();
        await testMedicalProfile();
        // more tests
    } catch (error) {
        console.error("Error during testing:", error.response ? error.response.data : error.message);
    }
}

// Test Authentication
async function testSignup() {
    console.log("\nTesting Authentication:");
    try {
        await axios.post(`${baseUrl}/auth/signup`, { email: 'sariitani101@gmail.com', password: 'password123', username: 'sariitani', role: 'user' });
        console.log("User signup successful.");
        
        await axios.post(`${baseUrl}/auth/login`, { email: 'sirsri101@gmail.com', password: 'password123' , username: 'sirsri', role: 'doctor'});
        console.log("Doctor signup successful.");
    } catch (error) {
        console.error("Authentication test failed:", error.response ? error.response.data : error.message);
    }
}

async function testLogin() {
    console.log("\nTesting Authentication:");
    try {
        const userResponse = await axios.post(`${baseUrl}/auth/login`, { email: 'sariitani101@gmail.com', password: 'password123' });
        userToken = userResponse.data.token;
        console.log("User login successful.");

        const doctorResponse = await axios.post(`${baseUrl}/auth/login`, { email: 'sirsri101@gmail.com', password: 'password123' });
        doctorToken = doctorResponse.data.token;
        console.log("Doctor login successful.");
    } catch (error) {
        console.error("Authentication test failed:", error.response ? error.response.data : error.message);
    }
}

// Test User Profile
async function testUserProfile() {
    console.log("\nTesting User Profile:");

    try {
        userProfile = await axios.get(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User profile accessed:", userProfile.data);
    } catch (error) {
        console.error("User profile access failed:", error.response ? error.response.data : error.message);
    }

    try {
        doctorProfile = await axios.get(`${baseUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed user profile:", doctorProfile.data);
    } catch (error) {
        console.error("Doctor profile access failed:", error.response ? error.response.data : error.message);
    }
}

// Test Medical Profile
async function testMedicalProfile() {
    console.log("\nTesting Medical Profile:");

    try {
        await axios.post(
            `${baseUrl}/medicalprofile`, 
            {
                dob: ,
                sex: '',
                conditions: '',
                allergies: '',
                medications: '',
                emergencyContactName: '',
                emergencyContactPhone: '',
                bloodType: '',
                smokingStatus: ''
            },
            {headers: { Authorization: `Bearer ${userToken}` } }
        );
        console.log("User medical profile Created:");
    } catch (error) {
        console.error("User medical profile retrieval failed:", error.response ? error.response.data : error.message);
    }
    
    try {
        const medicalProfile = await axios.get(`${baseUrl}/medicalprofile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User medical profile retrieved:", medicalProfile.data);
        profileId = medicalProfile.data._id;
    } catch (error) {
        console.error("User medical profile retrieval failed:", error.response ? error.response.data : error.message);
    }

    //
}

// More tests

runTests();
