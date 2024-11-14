const axios = require('axios');
const baseUrl = 'http://localhost:5000/api';
let userToken = '';
let doctorToken = '';
let testProfileId = '';
let testDiagnosisId = '';

async function runTests() {
    try {
        await testAuth();
        await testMedicalProfile();
        await testDiagnosis();
        await testNotifications();
        await testDashboard();
    } catch (error) {
        console.error("Error during testing:", error.response ? error.response.data : error.message);
    }
}

// Test Authentication
async function testAuth() {
    console.log("\nTesting Authentication:");
    try {
        const userResponse = await axios.post(`${baseUrl}/auth/login`, { email: 'user@example.com', password: 'password123' });
        userToken = userResponse.data.token;
        console.log("User login successful.");

        const doctorResponse = await axios.post(`${baseUrl}/auth/login`, { email: 'doctor@example.com', password: 'password123' });
        doctorToken = doctorResponse.data.token;
        console.log("Doctor login successful.");
    } catch (error) {
        console.error("Authentication test failed:", error.response ? error.response.data : error.message);
    }
}

// Test Medical Profile
async function testMedicalProfile() {
    console.log("\nTesting Medical Profile:");

    // User creating and accessing their medical profile
    try {
        const createResponse = await axios.post(
            `${baseUrl}/medical-profile`,
            {
                dob: '2000-01-01',
                sex: 'Male',
                allergies: 'Peanuts',
                medications: 'Ibuprofen',
                emergencyContactName: 'John Doe',
                emergencyContactPhone: '123456789',
                bloodType: 'A+',
                smokingStatus: false
            },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        testProfileId = createResponse.data._id;
        console.log("User medical profile created:", createResponse.data);
    } catch (error) {
        console.error("Failed to create user medical profile:", error.response ? error.response.data : error.message);
    }

    // Doctor accessing user's medical profile
    try {
        const doctorAccessResponse = await axios.get(`${baseUrl}/medical-profile/${testProfileId}`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed user medical profile:", doctorAccessResponse.data);
    } catch (error) {
        console.error("Doctor access test failed:", error.response ? error.response.data : error.message);
    }

    // Invalid access attempt (unauthorized user)
    try {
        await axios.get(`${baseUrl}/medical-profile/${testProfileId}`);
    } catch (error) {
        console.log("Unauthorized access prevented as expected:", error.response.data);
    }
}

// Test Diagnosis
async function testDiagnosis() {
    console.log("\nTesting Diagnosis:");

    // User submitting symptoms for diagnosis
    try {
        const diagnosisResponse = await axios.post(
            `${baseUrl}/diagnosis`,
            { symptoms: ["headache", "fever"] },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        testDiagnosisId = diagnosisResponse.data._id;
        console.log("Diagnosis created:", diagnosisResponse.data);
    } catch (error) {
        console.error("Diagnosis submission failed:", error.response ? error.response.data : error.message);
    }

    // Doctor accessing diagnosis details
    try {
        const diagnosisDetails = await axios.get(`${baseUrl}/diagnosis/${testDiagnosisId}`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor accessed diagnosis details:", diagnosisDetails.data);
    } catch (error) {
        console.error("Doctor access to diagnosis failed:", error.response ? error.response.data : error.message);
    }
}

// Test Notifications
async function testNotifications() {
    console.log("\nTesting Notifications:");

    // User accessing their notifications
    try {
        const userNotifications = await axios.get(`${baseUrl}/notifications`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User notifications accessed:", userNotifications.data);
    } catch (error) {
        console.error("User notification access failed:", error.response ? error.response.data : error.message);
    }

    // Doctor accessing notifications
    try {
        const doctorNotifications = await axios.get(`${baseUrl}/notifications`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor notifications accessed:", doctorNotifications.data);
    } catch (error) {
        console.error("Doctor notification access failed:", error.response ? error.response.data : error.message);
    }
}

// Test Dashboard Access
async function testDashboard() {
    console.log("\nTesting Dashboard Access:");

    // User dashboard
    try {
        const userDashboard = await axios.get(`${baseUrl}/dashboard`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log("User dashboard accessed:", userDashboard.data);
    } catch (error) {
        console.error("User dashboard access failed:", error.response ? error.response.data : error.message);
    }

    // Doctor dashboard
    try {
        const doctorDashboard = await axios.get(`${baseUrl}/doctor-dashboard`, {
            headers: { Authorization: `Bearer ${doctorToken}` }
        });
        console.log("Doctor dashboard accessed:", doctorDashboard.data);
    } catch (error) {
        console.error("Doctor dashboard access failed:", error.response ? error.response.data : error.message);
    }

    // Additional tests as needed
}

runTests();
